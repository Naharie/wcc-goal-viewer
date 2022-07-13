import create from "zustand";

export interface EditorSlice
{
    enabled: boolean;
    id?: number;

    enableEditor(): void;

    openEditor(goalId: number): void;
    closeEditor(): void;
}

const useEditor = create<EditorSlice>((set, get) => ({
    enabled: false,
    id: undefined,

    enableEditor()
    {
        set({ enabled: true });
    },

    openEditor(goalId: number)
    {
        set({ enabled: true, id: goalId });
    },
    closeEditor()
    {
        set({ id: undefined });
    }
}));

export default useEditor;