import { Highlight, Course } from "./models";
import { JsonData, Year, Semester } from "../models";
import * as _ from "lodash";

/**
 * Creates a highlight object with entries matching the specified data object.
 * @param data The data to build a highlight map for.
 */
export const createHighlight = function (data: JsonData): Highlight
{
    const primaryGoals =
        data.primaryGoals.map(({ id, children }) => ({
            id,
            selected: false,
            children: _.keyBy (
                children.map(({ id }) =>
                    ({ id, selected: false, scores: [] })
                ),
                "id"
            ),
            scores: []
        }));
    
    const tracks =
        data.tracks.map (track => ({
            track: track.track,
            goals: _.keyBy (
                track.goals.map (({ id }) =>
                    ({ id, selected: false, scores: [] })
                ),
                "id"
            ),
            scores: []
        }));

    const mapSemester = (semester: Semester) =>
        semester.map(({ id }) => ({ id, selected: false, scores: [] }));

    const mapYear = ({ yearNumber, semester1, semester2 }: Year) =>
        ({
           yearNumber,
            semester1: _.keyBy (mapSemester(semester1), "id"),
            semester2: _.keyBy (mapSemester(semester2), "id")
        });

    const courses: Course[] =
        data.courses.map (({ course, years }) => ({
            course: course,
            years: [
                mapYear(years[0]),
                mapYear(years[1]),
                mapYear(years[2]),
                mapYear(years[3])
            ]
        }));

    return ({
        primaryGoals: _.keyBy(primaryGoals, "id"),
        tracks: _.keyBy(tracks, "track"),
        courses: _.keyBy(courses, "course")
    });
};

export const computeTrackHighlight = function ({ tracks }: JsonData, highlight: Highlight)
{
    const result: Highlight = {
        primaryGoals: highlight.primaryGoals,
        tracks: _.cloneDeep(highlight.tracks),
        courses: highlight.courses
    };

    for (const track of tracks)
    {
        // The highlight data for the track.
        const hTrack = result.tracks[track.track];

        for (const goal of track.goals)
        {
            // A goal is select if any of the goals it references are selected.
            hTrack.goals[goal.id].selected = goal.references.some (reference =>
            {
                const { selected, children } = result.primaryGoals[reference.goal];

                return (
                    reference.subGoals.length === 0 ?
                        selected :
                        reference.subGoals.some(goal => children[goal].selected)
                );
            })
        }
    }

    return (result);
};
export const computeCourseHighlight = function (data: JsonData, highlight: Highlight)
{
    const result: Highlight = {
        primaryGoals: highlight.primaryGoals,
        tracks: highlight.tracks,
        courses: mapObject(highlight.courses, cloneHCourse)
    };

    const handleSemester = function (course: Course, semester: Semester, highlight: HashMap<HGoal>)
    {
        for (const goal of semester)
        {
            const selected = goal.references.some(reference => result.tracks[course.course].goals[reference].selected);
            highlight[goal.id].selected = selected;
        }
    };

    for (const course of data.courses)
    {
        const highlightCourse = result.courses[course.course];

        for (const year of course.years)
        {
            const highlightYear = highlightCourse.years[year.yearNumber / 100 - 1];

            handleSemester(course, year.semester1, highlightYear.semester1);
            handleSemester(course, year.semester2, highlightYear.semester2);
        }
    }

    return (result);
};

export const computeScores = function (data: JsonData, highlight: Highlight)
{
    const result: Highlight = {
        primaryGoals: mapObject(highlight.primaryGoals, cloneHPrimaryGoal),
        tracks: mapObject(highlight.tracks, cloneHTrack),
        courses: highlight.courses
    };

    // Reset all the score data

    for (const id in result.primaryGoals)
    {
        const primaryGoal = result.primaryGoals[id];
        primaryGoal.scores = [];

        for (const id in primaryGoal.children)
        {
            primaryGoal.children[id].scores = [];
        }
    }

    for (const id in result.tracks)
    {
        const track = result.tracks[id];

        for (const id in track.goals)
        {
            track.goals[id].scores = [];
        }
    }

    // Update the tracks with scores from the courses.

    const handleSemester = function (course: Course, semester: Semester, highlight: HashMap<HGoal>)
    {
        const track = result.tracks[course.course];

        for (const goal of semester)
        {
            const scores = highlight[goal.id].scores ?? [];

            for (const reference of goal.references)
            {
                const trackGoal = track.goals[reference];

                trackGoal.scores = trackGoal.scores ?? [];
                trackGoal.scores.push (...scores);
            }
        }
    };

    for (const course of data.courses)
    {
        const hCourse = result.courses[course.course];

        for (const year of course.years)
        {
            const hYear = hCourse.years[year.yearNumber / 100 - 1];

            handleSemester(course, year.semester1, hYear.semester1);
            handleSemester(course, year.semester2, hYear.semester2);
        }
    }

    // Update the primary goals with scores from the tracks.

    for (const track of data.tracks)
    {
        const hTrack = result.tracks[track.track];

        for (const goal of track.goals)
        {
            const hGoal = hTrack.goals[goal.id];
            const scores = hGoal.scores ?? [];

            if (scores.length === 0)
            {
                continue;
            }

            const score = scores.reduce((a, b) => a + b) / scores.length;
            hGoal.scores = [ score ];

            for (const reference of goal.references)
            {
                const primaryGoal = result.primaryGoals[reference.goal];

                for (const subItem of reference.subGoals)
                {
                    const subGoal = primaryGoal.children[subItem];
                    subGoal.scores = subGoal.scores ?? [];
                    subGoal.scores.push (score);
                }

                primaryGoal.scores = primaryGoal.scores ?? [];
                primaryGoal.scores.push(score);
            }
        }
    }

    // Average the scores on the primary goals.

    for (const id in result.primaryGoals)
    {
        const primaryGoal = result.primaryGoals[id];

        for (const id in primaryGoal.children)
        {
            const child = primaryGoal.children[id];
            const scores = child.scores ?? [];

            if (scores.length === 0)
            {
                continue;
            }

            const score = scores.reduce((a, b) => a + b) / scores.length;
            child.scores = [ score ];
        }

        const scores = primaryGoal.scores ?? [];

        if (scores.length === 0)
        {
            continue;
        }

        const score = scores.reduce((a, b) => a + b) / scores.length;
        primaryGoal.scores = [ score ];
    }

    return (result);
};