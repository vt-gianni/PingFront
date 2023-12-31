import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import LoginHeader from "../components/LoginHeader";
import PCButton from "../components/PCButton";
import useApi from "../contexts/useApi";

export default function LoginScreen() {

    const { login } = useApi();

    const tailwind = useTailwind();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        login.mutate({ username, password });
    };

    return (
        <View style={tailwind('flex-1')}>
            <LoginHeader />
            <View style={tailwind('h-4/5 w-full flex-col items-center justify-center p-5')}>
                <View style={{ ...tailwind('w-full flex-col items-center justify-between'), gap: 40 }}>
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
                        disabled={username.length === 0 || password.length === 0}
                    />

                    <PCButton
                        label="Créer un compte"
                        onPress={() => {
                            router.push('register')
                        }}
                        withBackground={false}
                        textColor="blue"
                    />
                </View>
            </View>
        </View>
    )
}