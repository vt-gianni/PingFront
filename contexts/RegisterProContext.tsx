import { createContext } from "react";
import { User } from "../types/user";
import { Club } from "../types/club";

export default createContext({
    user: {} as User,
    updateUser: (field: keyof User, value: any) => { },
    updateClub: (field: keyof Club, value: any) => { },
    handleRegister: () => { }
})