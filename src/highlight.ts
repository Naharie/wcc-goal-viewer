export interface HashMap<V>
{
    [key: string]: V;
}

export interface HGoal
{
    id: string;
    selected: boolean;
    scores?: number[];
}
export interface HYear
{
	yearNumber: 100 | 200 | 300 | 400;
	semester1: HashMap<HGoal>;
	semester2: HashMap<HGoal>;
}

export interface HPrimaryGoal extends HGoal
{
    id: string;
    selected: boolean;
    children: HashMap<HGoal>;
}
export interface HTrack
{
	track: CourseId;
	goals: HashMap<HGoal>;
}
export interface HCourse
{
	course: CourseId;
	years: [ HYear, HYear, HYear, HYear ]
}

export interface Highlight
{
    primaryGoals: HashMap<HPrimaryGoal>;
    tracks: HashMap<HTrack>;
    courses: HashMap<HCourse>;
}

const mapObject = function <T, U>(object: HashMap<T>, mapping: (value: T) => U): HashMap<U>
{
    const result: HashMap<U> = {};

    for (const key in object)
    {
        result[key] = mapping(object[key]);
    }

    return (result);
};
const buildMapping = function <T>(values: T[], key: keyof T)
{
    const result: HashMap<T> = {};

    for (const value of values)
    {
        result[value[key] + ""] = value;
    }

    return (result);
};

export const cloneHGoal = (goal: HGoal): HGoal => ({
    id: goal.id,
    selected: goal.selected,
    scores: goal.scores?.map(value => value)
});
export const cloneHSemester = (semester: HashMap<HGoal>) => mapObject(semester, cloneHGoal);
export const cloneHYear = (year: HYear): HYear => ({
    yearNumber: year.yearNumber,
    semester1: cloneHSemester(year.semester1),
    semester2: cloneHSemester(year.semester2)
});

export const cloneHPrimaryGoal = (goal: HPrimaryGoal): HPrimaryGoal => ({
    id: goal.id,
    selected: goal.selected,
    children: mapObject(goal.children, cloneHGoal),
    scores: goal.scores?.map (v => v)
});
export const cloneHTrack = (track: HTrack): HTrack => ({
    track: track.track,
    goals: mapObject (track.goals, cloneHGoal)
});
export const cloneHCourse = (course: HCourse): HCourse => ({
    course: course.course,
    years: [ cloneHYear(course.years[0]), cloneHYear(course.years[1]), cloneHYear(course.years[2]), cloneHYear(course.years[3]) ]
});

export const createHighlight = function (data: JsonData): Highlight
{
    const primaryGoals =
        data.primaryGoals.map(primaryGoal => ({
            id: primaryGoal.id,
            selected: false,
            children: buildMapping (primaryGoal.children.map(child => ({ id: child.id, selected: false })), "id")
        }));
    
    const tracks =
        data.tracks.map (track => ({
            track: track.track,
            goals: buildMapping (track.goals.map (goal => ({ id: goal.id, selected: false })), "id")
        }));

    const mapYear = (year: Year) => ({
        yearNumber: year.yearNumber,
        semester1: buildMapping (year.semester1.map(goal => ({ id: goal.id, selected: false })), "id"),
        semester2: buildMapping (year.semester2.map(goal => ({ id: goal.id, selected: false })), "id")
    });

    const courses: HCourse[] =
        data.courses.map (course => ({
            course: course.course,
            years: [
                mapYear(course.years[0]),
                mapYear(course.years[1]),
                mapYear(course.years[2]),
                mapYear(course.years[3])
            ]
        }));

    return ({
        primaryGoals: buildMapping(primaryGoals, "id"),
        tracks: buildMapping(tracks, "track"),
        courses: buildMapping(courses, "course")
    });
};

export const computeTrackHighlight = function (data: JsonData, highlight: Highlight)
{
    const result: Highlight = {
        primaryGoals: highlight.primaryGoals,
        tracks: mapObject(highlight.tracks, cloneHTrack),
        courses: highlight.courses
    };

    for (const track of data.tracks)
    {
        const highlightTrack = result.tracks[track.track];

        for (const goal of track.goals)
        {
            const selected =
                goal.references.some (reference =>
                {
                    const primaryGoal = result.primaryGoals[reference.goal];

                    return (
                        reference.subGoals.length === 0 ?
                            primaryGoal.selected :
                            reference.subGoals.some(goal => primaryGoal.children[goal].selected)
                    );
                });

            highlightTrack.goals[goal.id].selected = selected;
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