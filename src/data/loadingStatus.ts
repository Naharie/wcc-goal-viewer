import create from "zustand";

export interface LoadingStatusSlice
{
    isLoaded: boolean;
    errorMessage?: string;

    setLoaded(): void;
    setError(errorMessage: string): void;
}

export const useLoadingStatus = create<LoadingStatusSlice>(set => ({
    isLoaded: false,
    errorMessage: undefined,

    setLoaded: () => set({ isLoaded: true, errorMessage: undefined }),
    setError: (errorMessage?: string) => set({ isLoaded: true, errorMessage })
}));

const state = useLoadingStatus.getState();

export const setLoaded = state.setLoaded;
export const setError = state.setError;