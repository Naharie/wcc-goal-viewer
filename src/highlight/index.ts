import { Highlight, HashMap, Course as HCourse, Goal } from "./modelds";
import { JsonData, Year, Course, Semester } from "../models";
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

    const courses: HCourse[] =
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
export const computeCourseHighlight = function ({ courses }: JsonData, highlight: Highlight)
{
    const result: Highlight = {
        primaryGoals: highlight.primaryGoals,
        tracks: highlight.tracks,
        courses: _.cloneDeep(highlight.courses)
    };

    const handleSemester = function (course: Course, semester: Semester, highlight: HashMap<Goal>)
    {
        for (const goal of semester)
        {
            // The track matching the same topic as this course.
            // In other words, if this is a humanities course,
            // Then this track will be the humanities track.
            const { goals } = result.tracks[course.course];

            // A course goal is selected if any of the track goals it references are selected.
            const selected = goal.references.some(reference => goals[reference].selected);

            highlight[goal.id].selected = selected;
        }
    };

    for (const course of courses)
    {
        /** The highlight data for the course. */
        const hCourse = result.courses[course.course];

        for (const year of course.years)
        {
            /** The highlight data for the year. */
            const hYear = hCourse.years[year.yearNumber / 100 - 1];

            handleSemester(course, year.semester1, hYear.semester1);
            handleSemester(course, year.semester2, hYear.semester2);
        }
    }

    return (result);
};

export const computeScores = function ({ courses, tracks }: JsonData, highlight: Highlight)
{
    const result: Highlight = {
        primaryGoals: _.cloneDeep(highlight.primaryGoals),
        tracks: _.cloneDeep(highlight.tracks),
        courses: highlight.courses
    };

    // Reset all the score data

    _.forEach(result.primaryGoals, goal =>
    {
        goal.scores = [];
        _.forEach(goal.children, goal => goal.scores = []);
    });

    _.forEach (result.tracks, ({ goals }) =>
        _.forEach(goals, goal => goal.scores = [])
    );

    // Update the tracks with scores from the courses.

    const handleSemester = function (course: Course, semester: Semester, highlight: HashMap<Goal>)
    {
        // Get the track matching this course.
        const track = result.tracks[course.course];

        for (const goal of semester)
        {
            const { scores } = highlight[goal.id];

            // For each goal we reference, add our scores to its list.
            for (const reference of goal.references)
            {
                track.goals[reference].scores.push (...scores);
            }
        }
    };

    for (const course of courses)
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

    for (const track of tracks)
    {
        const hTrack = result.tracks[track.track];

        for (const goal of track.goals)
        {
            const { scores } = hTrack.goals[goal.id];

            for (const reference of goal.references)
            {
                const { scores: pScores, children } = result.primaryGoals[reference.goal];
                reference.subGoals.forEach(subItem => children[subItem].scores.push (...scores));
                pScores.push(...scores);
            }
        }
    }
    
    return (result);
};