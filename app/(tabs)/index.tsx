import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import PCButton from "../../components/PCButton";

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