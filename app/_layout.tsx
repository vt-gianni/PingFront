import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";
import { Slot } from "expo-router";
import { View } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Layout() {
    return (
        // @ts-ignore
        <TailwindProvider utilities={utilities}>
            <QueryClientProvider client={queryClient}>
                <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                    <Slot />
                </View>
            </QueryClientProvider>
        </TailwindProvider>
    )
}