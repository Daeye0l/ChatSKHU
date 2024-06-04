import create from 'zustand';
interface ResponseData {
    id: number;
    email: string;
    nickname: string;
    userRole: string;
    socialType: string;
    imageUrl: string;
}

interface StoreState {
    responseData: ResponseData | null;
    setResponseData: (data: ResponseData) => void;
}

export const userprofile = create<StoreState>((set) => ({
    responseData: null,
    setResponseData: (data: ResponseData) => set({ responseData: data }),
}));
