import React, { PropsWithChildren, useEffect, useState } from 'react'
import { View } from 'react-native'
import RegisterProContext from '../../contexts/RegisterProContext'
import { User } from '../../types/user';
import { Stack } from 'expo-router';

export default function RegisterProLayout() {

    const [user, setUser] = useState<User>({
        email: "",
        password: ""
    });

    const updateUser = (field: keyof User, value: any) => {
        setUser({
            ...user,
            [field]: value
        })
    }

    return (
        <RegisterProContext.Provider value={{ user, updateUser }}>
            <Stack>
                <Stack.Screen name="firstpage" options={{ headerShown: false }} />
                <Stack.Screen name="secondpage" options={{ headerShown: false }} />
                <Stack.Screen name="thirdpage" options={{ headerShown: false }} />
            </Stack>
        </RegisterProContext.Provider>
    )
}
