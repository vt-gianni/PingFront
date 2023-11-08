import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";

const queryClient = new QueryClient();

export default function Layout() {

    useEffect(() => {
        AsyncStorage.getItem('tutorialDone')
            .then((tutorialDone) => {
                if (tutorialDone === 'true') {
                    router.push('(tabs)')

                    AsyncStorage.getItem('token')
                        .then((token) => {
                            if (!token) {
                                router.push('login')
                            }
                        })
                } else {
                    router.push('tutorial')
                }
            });
    }, [])

    return (
        // @ts-ignore
        <TailwindProvider utilities={utilities}>
            <QueryClientProvider client={queryClient}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="login" options={{ headerShown: false }} />
                    <Stack.Screen name="register" options={{ headerShown: false }} />
                    <Stack.Screen name="registerpro" options={{ headerShown: false }} />
                    <Stack.Screen name="tutorial" options={{ headerShown: false }} />
                </Stack>
            </QueryClientProvider>
        </TailwindProvider>
    )
}