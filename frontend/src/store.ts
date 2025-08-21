import { atom } from "jotai";
import Cookies from "js-cookie";

const defaultBackendUrl = "http://localhost:3000";

export const backendUrlAtom = atom(defaultBackendUrl);

backendUrlAtom.onMount = (setState) => {
  const backendUrl = Cookies.get("backend_url");
  setState(backendUrl || defaultBackendUrl);
};
