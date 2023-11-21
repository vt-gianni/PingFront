import { Image } from "expo-image";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";

interface AvatarProps {
    image: string;
    size?: 'small' | 'medium' | 'large';
}

export default function Avatar({ image, size = "medium" }: AvatarProps) {
    const tailwind = useTailwind();
    return (
        <View>
            <Image
                style={tailwind(`${size == "small" ? "w-10 h-10" : ""} ${size == "medium" ? "w-20 h-20" : ""} ${size == "large" ? "w-32 h-32" : ""} rounded-full`)}
                source={{
                    uri: image ?? 'https://reactnative.dev/img/tiny_logo.png',
                }}
            />
        </View>
    )
}
