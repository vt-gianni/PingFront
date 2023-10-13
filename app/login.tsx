import { Image } from "expo-image";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import PCButton from "../components/PCButton";
import useApi from "../contexts/useApi";

export default function LoginScreen() {

    const { query, login } = useApi();

    const tailwind = useTailwind();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        login.mutate({ username, password });
    };

    return (
        <View style={tailwind('flex-1')}>
            <View style={tailwind('p-5 h-1/5 flex-row bg-bg_black')}>
                <View style={tailwind('w-1/2 h-full items-end')}>
                    <Image
                        source={require('../assets/ping-pong.png')}
                        contentFit="contain"
                        style={tailwind('w-1/2 h-full')}
                    />
                </View>
                <View style={tailwind('w-1/2 h-full items-start justify-center')}>
                    <Text style={tailwind('text-white text-2xl font-bold text-center')}>Ping</Text>
                    <Text style={tailwind('text-white text-2xl font-bold text-center')}>Contest</Text>
                </View>
            </View>
            <View style={tailwind('h-4/5 w-full flex-col items-center justify-center p-5')}>
                <View style={tailwind('h-1/2 w-full flex-col items-center justify-between')}>
                    <TextInput
                        placeholder="Adresse email"
                        value={username}
                        onChangeText={setUsername}
                        style={tailwind('w-full p-5 bg-gray_light')}
                        autoCapitalize="none"
                    />

                    <TextInput
                        placeholder="Mot de passe"
                        value={password}
                        onChangeText={setPassword}
                        style={tailwind('w-full p-5 bg-gray_light')}
                        autoCapitalize="none"
                        secureTextEntry
                    />

                    <PCButton
                        label="Connexion"
                        onPress={handleLogin}
                    />
                </View>
            </View>
        </View>
    )
}