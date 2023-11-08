import { router } from 'expo-router';
import React, { useContext } from 'react'
import { View, Text, TextInput } from 'react-native'
import { useTailwind } from 'tailwind-rn';
import LoginHeader from '../../components/LoginHeader';
import PCButton from '../../components/PCButton';
import RegisterProContext from '../../contexts/RegisterProContext';

export default function RegisterProFirstScreen() {
    const tailwind = useTailwind();

    const { user, updateUser } = useContext(RegisterProContext);

    return (
        <View style={tailwind('flex-1')}>
            <LoginHeader />
            <View style={tailwind('h-4/5 w-full flex-col items-center justify-center p-5')}>
                <View style={{ ...tailwind('w-full flex-col items-center justify-between'), gap: 40 }}>
                    <Text style={tailwind('text-2xl font-bold')}>Informations du compte</Text>
                    <TextInput
                        placeholder="Adresse email"
                        value={user.email}
                        onChangeText={(value) => updateUser('email', value)}
                        style={tailwind('w-full p-5 bg-gray_light')}
                        autoCapitalize="none"
                    />

                    <TextInput
                        placeholder="Mot de passe"
                        value={user.password}
                        onChangeText={(value) => updateUser('password', value)}
                        style={tailwind('w-full p-5 bg-gray_light')}
                        autoCapitalize="none"
                        secureTextEntry
                    />

                    <PCButton
                        label="Etape suivante"
                        onPress={() => { router.push('registerpro/secondpage') }}
                        disabled={user.email.length === 0 || user.password.length === 0}
                        bgColor='orange'
                    />

                    <PCButton
                        label="Je suis un compétiteur"
                        onPress={() => {
                            router.push('register')
                        }}
                        withBackground={false}
                        textColor="red"
                    />
                </View>
            </View>
        </View>
    )
}
