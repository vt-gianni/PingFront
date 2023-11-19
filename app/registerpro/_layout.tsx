import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import RegisterProContext from '../../contexts/RegisterProContext';
import { User } from '../../types/user';
import { Club } from '../../types/club';
import useApi from '../../contexts/useApi';

export default function RegisterProLayout() {

    const { register } = useApi();

    const [user, setUser] = useState<User>({
        email: "",
        password: "",
        club: {
            name: "",
            city: "",
            zipCode: "",
            address: "",
            number: "",
            gym: "",
            mailAddress: "",
            phone: ""
        }
    });

    const updateUser = (field: keyof User, value: any) => {
        setUser({
            ...user,
            [field]: value
        })
    }

    const updateClub = (field: keyof Club, value: any) => {
        setUser({
            ...user,
            club: {
                ...user.club,
                [field]: value
            }
        })
    }

    const handleRegister = async () => {
        register.mutate(user);
    };

    return (
        <RegisterProContext.Provider value={{ user, updateUser, updateClub, handleRegister }}>
            <Stack>
                <Stack.Screen name="firstpage" options={{ headerShown: false }} />
                <Stack.Screen name="secondpage" options={{ headerShown: false }} />
                <Stack.Screen name="thirdpage" options={{ headerShown: false }} />
            </Stack>
        </RegisterProContext.Provider>
    )
}
