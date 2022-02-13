import AuthDefault from "../auth/default/auth";
import {firebaseconfig} from "../firebaseconfig";

const authSingleton = new AuthDefault(firebaseconfig);
export const auth = () => authSingleton;