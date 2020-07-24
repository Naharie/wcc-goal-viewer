export interface HGoal
{
    id: string;
    selected: boolean;
}
interface HYear
{
	yearNumber: 100 | 200 | 300 | 400;
	semester1: HGoal[];
	semester2: HGoal[];
}

export interface HPrimaryGoal
{
    id: string;
    selected: boolean;
    children: HGoal[];
}
export interface HTrack
{
	track: CourseId;
	goals: HGoal[];
}
export interface HCourse
{
	course: CourseId;
	years: [ HYear, HYear, HYear, HYear ]
}

export interface Highlight
{
    primaryGoals: HPrimaryGoal[];
    tracks: HTrack[];
    courses: HCourse[];
}

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
    children: goal.children.map(cloneHGoal)
});
export const cloneHTrack = (track: HTrack): HTrack => ({
    track: track.track,
    goals: track.goals.map(cloneHGoal)
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
            children: primaryGoal.children.map(child => ({ id: child.id, selected: false }))
        }));
    
    const tracks =
        data.tracks.map (track => ({
            track: track.track,
            goals: track.goals.map (goal => ({ id: goal.id, selected: false }))
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
        primaryGoals, tracks, courses
    });
};