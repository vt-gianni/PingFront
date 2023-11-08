import { createContext } from "react";
import { User } from "../types/user";

export default createContext({
    user: {} as User,
    updateUser: (field: keyof User, value: any) => { },
})