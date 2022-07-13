import create from "zustand";

export interface LoadingStatusSlice
{
    isLoaded: boolean;
    errorMessage?: string;

    setLoaded(errorMessage?: string): void;
}

const useLoadingStatus = create<LoadingStatusSlice>(set => ({
    isLoaded: false,
    errorMessage: undefined,

    setLoaded(errorMessage?: string)
    {
        set({ isLoaded: true, errorMessage });
    }
}));

export default useLoadingStatus;