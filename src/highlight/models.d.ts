export type HashMap<V> = Record<string, V>;

export interface Goal
{
    id: string;
    selected: boolean;
    scores: number[];
}
export interface Year
{
	yearNumber: 100 | 200 | 300 | 400;
	semester1: HashMap<Goal>;
	semester2: HashMap<Goal>;
}

export interface PrimaryGoal extends Goal
{
    id: string;
    selected: boolean;
    children: HashMap<Goal>;
}
export interface Track
{
	track: CourseId;
	goals: HashMap<Goal>;
}
export interface Course
{
	course: CourseId;
	years: [ Year, Year, Year, Year ]
}

export interface Highlight
{
    primaryGoals: HashMap<PrimaryGoal>;
    tracks: HashMap<Track>;
    courses: HashMap<Course>;
}