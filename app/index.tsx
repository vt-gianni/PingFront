import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function HomeScreen() {

    useEffect(() => {
        AsyncStorage.getItem('tutorialDone')
            .then((value) => {
                if (value === null) {
                    return router.push('tutorial')
                }

                AsyncStorage.getItem('token')
                    .then((value) => {
                        if (value === null) {
                            return router.push('login')
                        }

                        return router.push('index')
                    })
            })
    }, [])

    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}