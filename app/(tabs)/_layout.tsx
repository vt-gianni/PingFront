import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs, router } from "expo-router";
import { useCallback } from "react";

export default function TabLayout() {

    const checkConnection = useCallback(async () => {
        if (!await AsyncStorage.getItem('token')) {
            router.replace('login');
            return;
        }
        return;
    }, [])


    return (
        <Tabs
            detachInactiveScreens={true}
            screenOptions={{ headerShown: false }}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="my-tournaments" listeners={{ focus: checkConnection }} />
            <Tabs.Screen name="profile" listeners={{ focus: checkConnection }} />
        </Tabs>
    )
}