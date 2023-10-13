import { TouchableOpacity, Text } from "react-native";
import { useTailwind } from "tailwind-rn";

type PCButtonProps = {
    label: string,
    onPress?: () => void
}

export default function PCButton(props: PCButtonProps) {
    const tailwind = useTailwind();

    return (
        <TouchableOpacity
            style={tailwind('w-1/2 h-12 bg-blue rounded-md items-center justify-center')}
            activeOpacity={0.6}
            onPress={props.onPress}
        >
            <Text style={tailwind('text-white font-medium')}>{props.label}</Text>
        </TouchableOpacity>
    )
}