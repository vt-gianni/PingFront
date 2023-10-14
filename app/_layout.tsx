import Constants from "expo-constants";
import { Slot } from "expo-router";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";

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