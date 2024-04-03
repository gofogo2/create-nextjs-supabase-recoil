import { atom } from "recoil";

export const NotesState = atom<any[] | null>({
  key: "Notes",
  default: null,
});