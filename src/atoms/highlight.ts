import { atom } from "jotai";
import { Highlight } from "../highlight/models";
import { derive } from ".";

export const highlight = atom<Highlight>({
    primaryGoals: {},
    tracks: {},
    courses: {}
});

export const primaryGoals = derive(highlight, "primaryGoals");
export const tracks = derive(highlight, "tracks");
export const courses = derive(highlight, "courses");