//내 인생 처음 주스탠드 파일 ~
import create from 'zustand';
interface ContentState {
    isSubmitting: boolean;
    setIsSubmitting: (state: boolean) => void;
}

export const useStateStore = create<ContentState>((set) => ({
    isSubmitting: false,
    setIsSubmitting: (state) => set({ isSubmitting: state }),
}));
