import create from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

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

type MyPersist = (
    config: (set: any, get: any, api: any) => StoreState,
    options: PersistOptions<StoreState>
) => (set: any, get: any, api: any) => StoreState;

export const useList = create<StoreState>(
    (persist as MyPersist)(
        (set) => ({
            responseData: null,
            setResponseData: (data: ResponseData) => set({ responseData: data }),
        }),
        {
            name: 'response-data-storage', // 로컬 스토리지에 저장될 이름
            getStorage: () => localStorage, // 기본적으로 로컬 스토리지를 사용하도록 설정
        }
    )
);
