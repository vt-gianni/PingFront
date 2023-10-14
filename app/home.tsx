import { Text, View } from "react-native";
import PCButton from "../components/PCButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function HomeScreen() {

    return (
        <View>
            <Text>Home</Text>
            <PCButton 
                label="Déconnexion"
                onPress={() => {
                    AsyncStorage.removeItem('token')
                    AsyncStorage.removeItem('refreshToken')
                    router.push('login')
                }}
            />
        </View>
    )
}