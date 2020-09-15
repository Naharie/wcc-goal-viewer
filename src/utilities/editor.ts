import { Goal } from "../models";

interface Editor
{ 
    goal?: Goal;
    cancel: () => void;
}

export const editor: Editor =
{
    cancel: () => {}
};