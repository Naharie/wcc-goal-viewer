/* The shared properties of all goal types. */
interface Goal
{
	/* The description of the goal. */
	text: string;
	/* The internal id of the goal. */
	id: string;
}

interface PrimaryReference
{
	/**
	 * The id of the primary goal that is being referenced.
	 */
	goal: string;
	/**
	 * The ids of the sub goals that are being referenced.
	 */
	subGoals: string[];
}

interface TrackGoal extends Goal
{
	/**
	 * The primary goals this track goal references.
	 */
	references: PrimaryReference[];
}

interface CourseGoal extends Goal
{
	/**
	 * The track goals this course goal references.
	 */
	references: string[];
}

type CourseId = "HMN" | "THL" | "PHL" | "MTH/SCI" | "MUS/ART" | "TRV" | "LAT" | "OLP";


interface PrimaryGoal
{
	text: string;
	id: string;
	children: Goal[];
}

interface Track
{
	track: CourseId;
	goals: TrackGoal[];
}

type Semester = CourseGoal[];

interface Year
{
	// Which year this is.
	yearNumber: 100 | 200 | 300 | 400;
	// Goals for semester 1
	semester1: Semester;
	// Goals for semester 2
	semester2: Semester;
}

interface Course
{
	course: CourseId;
	// The four years during which the course could be assigned (100, 200, 300, 400).
	years: [ Year, Year, Year, Year ]
}

interface JsonData
{
	// Left column
	primaryGoals: PrimaryGoal[],
	// Center column
	tracks: Track[],
	// Right column
	courses: Course[]
};