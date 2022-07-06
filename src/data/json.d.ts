export interface Goal
{
    /**
     * The text or description of the goal.
     */
    text: string;
    /**
     * The unique identifier by which this specific goal will be referred to by other goals.
     */
    ref: string;
    /**
     * The unique identifier by which this goal will be referred to in links.
     */
    id: number;
}

/**
 * A top level or primary goal of the WCC curriculum.
 */
export interface CurriculumGoal extends Goal
{
    /**
     * The parts or sub-goals that are necessary in order for this curriculum goal to be met.
     */
    children: CurriculumSubGoal[];
}

/**
 * A sub-goal of one of the primary goals of the WCC curriculum.
 */
export interface CurriculumSubGoal extends Goal
{
}


/**
 * A single track of the WCC curriculum.
 */
export interface Track
{
    /**
     * The abbreviated track name (HMN for Humanities, PHL for Philosophy and so on).
     */
    name: string;
    /**
     * The list of goals that apply specifically to this track.
     */
    goals: TrackGoal[];
}
/**
 * A goal particular to the parent track it resides in.
 */
export interface TrackGoal extends Goal
{
    /**
     * The curriculum goals and their sub-goals that this track goal refers to and is a prerequisite for.
     */
    references: TrackGoalReference[];
}
/**
 * A reference to a primary goal that the track goal supports.
 */
export interface TrackGoalReference
{
    /**
     * The reference id of a curriculum goal.
     */
    goal: string;
    /**
     * The specific sub-goals that this track goal fulfills.
     */
    subGoals: string[];
}


/**
 * A single course in the WCC curriculum.
 */
export interface Course
{
    /**
     * The abbreviated course name (HMN for Humanities, PHL for Philosophy and so on).
     */
    name: string;
    /**
     * The goals that are specific to this course divided by year and semester.
     */
    years: [ Year, Year, Year, Year ];
}
/**
 * An academic year that holds the goals for a course that apply only to this specific year.
 */
export interface Year
{
    /**
     * The academic year number (100, 200, 300, 400).
     */
    number: number;
    /**
     * The two academic semesters that comprise this year of the course.
     */
    semesters: [ Semester, Semester ];
}
/**
 * A list of all the goals of the course that are only relevant to this semester of the parent year.
 */
export type Semester = CourseGoal[];
/**
 * A course goal relevant only to the parent semester of the specified year.
 */
export interface CourseGoal extends Goal
{
    /**
     * The track goals (of the same course) referenced by this goal.
     */
    references: string[];
}

/**
 * A complete listing of the curriculum, track, and track goals of WCC.
 */
export interface JsonData
{
    /**
     * The top level set of goals that are to be met by the curriculum as a whole through the completion of the track and course goals.
     */
    curriculumGoals: CurriculumGoal[];
    /**
     * The set of curriculum tracks and their goals.
     */
    tracks: Track[];
    /**
     * A listing of specific courses and their goals.
     */
    courses: Course[];
}