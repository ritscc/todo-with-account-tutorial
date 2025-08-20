import { atom } from "jotai";
import type { User } from "./types";

export const backendUrlAtom = atom("http://localhost:3000");
export const userAtom = atom<User | undefined>(undefined);
