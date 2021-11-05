import { Goal } from "../models";

interface Editor
{ 
    goal?: string;
    cancel: () => void;
}

export const editor: Editor =
{
    cancel: () => {}
};