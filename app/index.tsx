import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Page() {
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
                        
                        return router.push('home')
                    })
            })
    }, [])

    return <></>
}