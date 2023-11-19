import { Image } from "expo-image";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function Avatar({ image }: { image: string }) {
    const tailwind = useTailwind();
    return (
        <View>
            <Image
                style={tailwind('w-20 h-20 rounded-full')}
                source={{
                    uri: image ?? 'https://reactnative.dev/img/tiny_logo.png',
                }}
            />
        </View>
    )
}
