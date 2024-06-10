import create from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

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

type MyPersist = (
    config: (set: any, get: any, api: any) => StoreState,
    options: PersistOptions<StoreState>
) => (set: any, get: any, api: any) => StoreState;

export const userprofile = create<StoreState>(
    (persist as MyPersist)(
        (set) => ({
            responseData: null,
            setResponseData: (data: ResponseData) => set({ responseData: data }),
        }),
        { name: 'user-store' }
    )
);
