import { router } from 'expo-router';
import React, { useContext } from 'react'
import { ScrollView, TextInput, View, Text } from 'react-native'
import { useTailwind } from 'tailwind-rn';
import LoginHeader from '../../components/LoginHeader';
import PCButton from '../../components/PCButton';
import RegisterProContext from '../../contexts/RegisterProContext';

export default function RegisterProThirdScreen() {
    const tailwind = useTailwind();
    const { } = useContext(RegisterProContext);

    return (
        <View style={tailwind('flex-1')}>
            <LoginHeader />

            <Text
                style={tailwind('text-gray py-2 px-5')}
                onPress={() => { router.back() }}
            >
                {"<"} Étape précédente
            </Text>
            <ScrollView contentContainerStyle={{ ...tailwind('w-full flex-col items-center justify-center p-5'), gap: 10 }}>
                <Text style={tailwind('text-2xl font-bold')}>Informations de paiement</Text>
                <TextInput
                    placeholder="Titulaire du compte"
                    value={""}
                    onChangeText={(value) => { }}
                    style={tailwind('w-full p-5 bg-gray_light')}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="IBAN"
                    value={""}
                    onChangeText={(value) => { }}
                    style={tailwind('w-full p-5 bg-gray_light')}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="BIC"
                    value={""}
                    onChangeText={(value) => { }}
                    style={tailwind('w-full p-5 bg-gray_light')}
                    autoCapitalize="none"
                />
                <PCButton
                    label="Inscription club / professionnel"
                    onPress={() => {

                    }}
                    disabled={false}
                    bgColor='orange'
                />
            </ScrollView>
        </View>
    )
}
