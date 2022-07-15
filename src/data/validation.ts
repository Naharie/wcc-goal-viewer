import { Schema, z } from "zod";

const goalValidator =
    z.object({
        text: z.string().describe("The text or description of the goal."),
        ref: z.string().describe("The unique identifier by which this specific goal will be referred to by other goals."),
        id: z.number().int().describe("The unique identifier by which this goal will be referred to in links."),
    });

export const dataValidator = z
    .object({
        curriculumGoals: z
            .array(
                goalValidator.extend({
                    children:
                        z.array(
                            goalValidator.describe("A sub-goal that must be met for the parent curriculum goal to be achieved.")
                        )
                        .describe("The parts or sub-goals in order for this curriculum goal to be met."),
                })
            )
            .describe("The top level set of goals that are to be met by the curriculum as a whole through the completion of the track and course goals."),
        tracks: z
            .array(
                z.object({
                    name: z.string().describe("The abbreviated track name (HMN for Humanities, PHL for Philosophy and so on)."),
                    goals: z.array(
                        goalValidator.extend({
                            references: z.array(
                                z.object({
                                    goal: z.string().describe("The reference id of a curriculum goal."),
                                    subGoals: z.array(
                                        z.string().describe("A particular sub-goal that this track goal fulfills.")
                                    )
                                    .describe("The specific sub-goals that this track goal fulfills.")
                                    .optional(),
                                })
                                .describe("A curriculum goal and its sub-goals that this track goal refers to and is a prerequisite for.")
                            )
                            .describe("The curriculum goals and their sub-goals that this track goal refers to and is a prerequisite for."),
                        })
                        .describe("A goal that applies specifically to its parent track and no other.")
                    )
                    .describe("The list of goals that apply specifically to this track."),
                })
                .describe("A single curriculum track (examples are Humanities (HMN), Theology (THL), Philosophy (PHL), and such.)")
            )
            .describe("The set of curriculum tracks and their goals."),
        courses: z
            .array(
                z.object({
                    name: z.string().describe("The abbreviated course name (HMN for Humanities, PHL for Philosophy and so on)."),
                    years: z.array(
                        z.object({
                            number: z.number().int().describe("The academic year number (100, 200, 300, 400)."),
                            semesters: z.array(
                                z.array(
                                    goalValidator.extend({
                                        references: z.array(
                                            z.string().describe("A track goal (of the same course) referenced by this goal.")
                                        )
                                        .describe("The track goals (of the same course) referenced by this goal."),
                                    })
                                    .describe("A goal specific to the parent academic semester of the specified year of the specified course.")
                                )
                                .describe("One of the two academic semesters that comprise this year of the course.")
                            )
                            .min(2)
                            .max(2)
                            .describe("The two academic semesters that comprise this year of the course."),
                        })
                        .describe("All the goals applicable to the specified year of the course.")
                    )
                    .min(4)
                    .max(4)
                    .describe("The goals that are specific to this course divided by year and semester."),
                })
                .describe("A single course and its goals divided by year.")
            )
            .describe("A listing of specific courses and their goals."),
    });

type ArrayElement<Array> = Array extends readonly (infer Element)[] ? Element : never;

// Types

export interface JsonData extends z.infer<typeof dataValidator> {}

export interface Goal extends z.infer<typeof goalValidator> {}

export interface CurriculumGoal extends ArrayElement<JsonData["curriculumGoals"]> {}
export interface CurriculumSubGoal extends ArrayElement<CurriculumGoal["children"]> {}

export interface Track extends ArrayElement<JsonData["tracks"]> {}
export interface TrackGoal extends ArrayElement<Track["goals"]> {}
export interface TrackGoalReference extends ArrayElement<TrackGoal["references"]> {}

export interface Course extends ArrayElement<JsonData["courses"]> {}
export interface Year extends ArrayElement<Course["years"]> {}
export interface Semester extends ArrayElement<Year["semesters"]> {}
export interface CourseGoal extends ArrayElement<Semester> {}