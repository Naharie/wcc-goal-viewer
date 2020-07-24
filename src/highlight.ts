export interface HashMap<V>
{
    [key: string]: V;
}

export interface HGoal
{
    id: string;
    selected: boolean;
}
export interface HYear
{
	yearNumber: 100 | 200 | 300 | 400;
	semester1: HGoal[];
	semester2: HGoal[];
}

export interface HPrimaryGoal
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
    selected: goal.selected
});
export const cloneHYear = (year: HYear): HYear => ({
    yearNumber: year.yearNumber,
    semester1: year.semester1.map(cloneHGoal),
    semester2: year.semester2.map(cloneHGoal)
});

export const cloneHPrimaryGoal = (goal: HPrimaryGoal): HPrimaryGoal => ({
    id: goal.id,
    selected: goal.selected,
    children: mapObject(goal.children, cloneHGoal)
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
        semester1: year.semester1.map(goal => ({ id: goal.id, selected: false })),
        semester2: year.semester2.map(goal => ({ id: goal.id, selected: false }))
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