import { atom, WritableAtom } from "jotai";
import React from "react";
import { Course, CourseGoal, CurriculumGoal, CurriculumSubGoal, Semester, Track, Year } from "./types";

export type Writable<T> = WritableAtom<T, T>;
export type Selector<T> = [ () => Writable<T>, ...React.DependencyList ];

export const isLoadedAtom = atom(false);
export const errorMessageAtom = atom<string | null>(null);

export const curriculumGoalsAtom = atom<CurriculumGoal[]>([]);
export const tracksAtom = atom<Track[]>([]);
export const coursesAtom = atom<Course[]>([]);

const arrayWith = <T>(items: T[], index: number, value: T) =>
{
    const updated = items.slice();
    updated[index] = value;
    return updated;
};

export const selectCurriculumGoal = (goal: number) => () =>
    atom<CurriculumGoal, CurriculumGoal>(
        get => get(curriculumGoalsAtom)[goal],
        (get, set, value) => set(curriculumGoalsAtom, arrayWith(get(curriculumGoalsAtom), goal, value))
    );
export const selectCurriculumSubGoal = (goal: Writable<CurriculumGoal>, subGoal: number) => () =>
    atom<CurriculumSubGoal, CurriculumSubGoal>(
        get => get(goal).children[subGoal],
        (get, set, value) =>
        {
            const _goal = get(goal);
            return set(goal, { ..._goal, children: arrayWith(_goal.children, subGoal, value) });
        }
    );

export const selectTrack = (track: number) => () =>
    atom<Track, Track>(
        get => get(tracksAtom)[track],
        (get, set, value) => set(tracksAtom, arrayWith(get(tracksAtom), track, value))
    );

export const selectCourse = (course: number) => () =>
    atom<Course, Course>(
        get => get(coursesAtom)[course],
        (get, set, value) => set(coursesAtom, arrayWith(get(coursesAtom), course, value))
    );
export const selectYear = (course: Writable<Course>, year: number) => () =>
    atom<Year, Year>(
        get => get(course).years[year],
        (get, set, value) =>
        {
            const _course = get(course);

            return set(course, {
                ..._course,
                years: arrayWith(_course.years, year, value) as [Year, Year, Year, Year]
            })
        }
    );
export const selectSemester = (year: Writable<Year>, semester: number) => () =>
    atom<Semester, Semester>(
        get => get(year).semesters[semester],
        (get, set, value) =>
        {
            const _year = get(year);

            return set(year, {
                ..._year,
                semesters: arrayWith(_year.semesters, semester, value) as [Semester, Semester]
            })
        }
    );
export const selectCourseGoal = (semester: Writable<Semester>, goal: number) => () =>
    atom<CourseGoal, CourseGoal>(
        get => get(semester)[goal],
        (get, set, value) => set(semester, arrayWith(get(semester), goal, value))
    );