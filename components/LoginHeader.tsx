import React from 'react'
import { View, Text } from 'react-native'
import { useTailwind } from 'tailwind-rn';
import { Image } from "expo-image";

export default function LoginHeader() {
    const tailwind = useTailwind();

    return (
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
    )
}
