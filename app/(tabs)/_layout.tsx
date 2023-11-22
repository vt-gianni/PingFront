import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs, router } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function TabLayout() {

    const tailwind = useTailwind();

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
            screenOptions={{
                headerShown: false,
                tabBarBackground: () => <View style={tailwind('h-full bg-bg_black')}></View>,
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen name="index" options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="home" /> }} />
            <Tabs.Screen name="my-tournaments" listeners={{ focus: checkConnection }} options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="my-tournaments" /> }} />
            <Tabs.Screen name="profile" listeners={{ focus: checkConnection }} options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="profile" /> }} />
            <Tabs.Screen name="tournament-details" options={{ href: null }} />
        </Tabs>
    )
}

const TabIcon = ({ name, focused }: { name: string, focused: boolean }) => {

    const iconName = name === 'home' ? 'list' : name === 'my-tournaments' ? 'table-tennis' : 'user';

    return (
        <FontAwesome5 name={iconName} color={focused ? "white" : "darkgrey"} size={25} solid />
    )
}