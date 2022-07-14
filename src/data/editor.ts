import produce from "immer";
import create from "zustand";

export interface EditorSlice
{
    enabled: boolean;
    id?: number;

    confirmDeletion?: {
        yes: () => void;
        no: () => void;
    }

    update(setter: (slice: EditorSlice) => void): void;

    enableEditor(): void;
    openEditor(goalId: number): void;
    closeEditor(): void;
}

const useEditor = create<EditorSlice>((set, get) => ({
    enabled: false,
    id: undefined,

    confirmDeletion: undefined,

    update: (setter) => set(produce(setter)),

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