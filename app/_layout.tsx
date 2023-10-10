import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";
import { Slot } from "expo-router";
import { View } from "react-native";
import Constants from "expo-constants";

export default function Layout() {
    return (
        // @ts-ignore
        <TailwindProvider utilities={utilities}>
            <View style={{flex: 1, paddingTop: Constants.statusBarHeight}}>
                <Slot />
            </View>
        </TailwindProvider>
    )
}