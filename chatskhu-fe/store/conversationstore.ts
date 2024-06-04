import create from 'zustand';

interface Item {
    id: number;
    title: string;
    userId: number;
}

interface ResponseData {
    today: Item[];
    yesterday: Item[];
    week: Item[];
    month: Item[];
}

interface StoreState {
    responseData: ResponseData | null;
    setResponseData: (data: ResponseData) => void;
}

export const useList = create<StoreState>((set) => ({
    responseData: null,
    setResponseData: (data: ResponseData) => set({ responseData: data }),
}));
