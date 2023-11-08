import React, { useContext } from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native'
import { useTailwind } from 'tailwind-rn';
import PCButton from '../../components/PCButton';
import RegisterProContext from '../../contexts/RegisterProContext';
import LoginHeader from '../../components/LoginHeader';
import { router } from 'expo-router';

export default function RegisterProSecondScreen() {
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
                <Text style={tailwind('text-2xl font-bold')}>Informations du club</Text>
                <TextInput
                    placeholder="Nom"
                    value={""}
                    onChangeText={(value) => { }}
                    style={tailwind('w-full p-5 bg-gray_light')}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Ville"
                    value={""}
                    onChangeText={(value) => { }}
                    style={tailwind('w-full p-5 bg-gray_light')}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Code postal"
                    value={""}
                    onChangeText={(value) => { }}
                    style={tailwind('w-full p-5 bg-gray_light')}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Adresse"
                    value={""}
                    onChangeText={(value) => { }}
                    style={tailwind('w-full p-5 bg-gray_light')}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Complément d'adresse"
                    value={""}
                    onChangeText={(value) => { }}
                    style={tailwind('w-full p-5 bg-gray_light')}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Numéro d'identifiant"
                    value={""}
                    onChangeText={(value) => { }}
                    style={tailwind('w-full p-5 bg-gray_light')}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Nom du complexe"
                    value={""}
                    onChangeText={(value) => { }}
                    style={tailwind('w-full p-5 bg-gray_light')}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Adresse mail de contact"
                    value={""}
                    onChangeText={(value) => { }}
                    style={tailwind('w-full p-5 bg-gray_light')}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Téléphone de contact"
                    value={""}
                    onChangeText={(value) => { }}
                    style={tailwind('w-full p-5 bg-gray_light')}
                    autoCapitalize="none"
                />
                <PCButton
                    label="Etape suivante"
                    onPress={() => {
                        router.push('registerpro/thirdpage')
                    }}
                    disabled={false}
                    bgColor='orange'
                />
            </ScrollView>
        </View>
    )
}
