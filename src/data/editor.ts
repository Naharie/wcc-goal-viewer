import create from "zustand";

export interface DeletionProxy
{
    yes: () => void;
    no: () => void;
}

export interface EditorStore
{
    enabled: boolean;
    id?: number;

    confirmDeletion?: {
        yes: () => void;
        no: () => void;
    }

    startDeletion(proxy: DeletionProxy): void;
    stopDeletion(): void;

    enableEditor(): void;
    disableEditor(): void;

    openEditor(goalId: number): void;
    closeEditor(): void;
}

export const useEditor = create<EditorStore>(set => ({
    enabled: false,
    id: undefined,

    confirmDeletion: undefined,

    enableEditor: () => set({ enabled: true }),
    disableEditor: () => set({ enabled: false }),

    openEditor: (goalId: number) => set({ enabled: true, id: goalId }),
    closeEditor: () => set({ id: undefined }),

    startDeletion: proxy => set({ confirmDeletion: proxy }),
    stopDeletion: () => set({ confirmDeletion: undefined })
}));

const state = useEditor.getState();

export const enableEditor = state.enableEditor;
export const disableEditor = state.disableEditor;

export const openEditor = state.openEditor;
export const closeEditor = state.closeEditor;

export const startDeletion = state.startDeletion;
export const stopDeletion = state.stopDeletion;