import { router } from "expo-router";
import { useEffect, useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function IndexScreen() {
    const tailwind = useTailwind();

    useEffect(() => {
        setTimeout(() => {
            router.replace('login');
        }, 1)
    }, [])

    return (
        <View style={tailwind('flex-1')}>
            <Text style={tailwind('font-bold')}>OUI</Text>
        </View>
    )
}