//내 인생 처음 주스탠드 파일 ~
import create from "zustand";
interface ContentState {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

export const useStore = create<ContentState>((set) => ({
  isOpen: false,
  setIsOpen: (state) => set({ isOpen: state }),
}));
