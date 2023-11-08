import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import { useTailwind } from 'tailwind-rn';
import LoginHeader from '../components/LoginHeader';
import PCButton from '../components/PCButton';
import { router } from 'expo-router';
import useApi from '../contexts/useApi';

export default function RegisterScreen() {
    const { register } = useApi();
    const tailwind = useTailwind();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        register.mutate({ email, password });
    };

    return (
        <View style={tailwind('flex-1')}>
            <LoginHeader />
            <View style={tailwind('h-4/5 w-full flex-col items-center justify-center p-5')}>
                <View style={{ ...tailwind('w-full flex-col items-center justify-between'), gap: 40 }}>
                    <TextInput
                        placeholder="Adresse email"
                        value={email}
                        onChangeText={setEmail}
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
                        label="Inscription compétiteur"
                        onPress={handleRegister}
                        disabled={email.length === 0 || password.length === 0}
                        bgColor='red'
                    />

                    <PCButton
                        label="Je suis un club / professionnel"
                        onPress={() => {
                            router.push('registerpro')
                        }}
                        withBackground={false}
                        textColor="orange"
                    />
                </View>
            </View>
        </View>
    )
}
