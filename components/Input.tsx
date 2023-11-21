import { TextInput } from "react-native";
import { useTailwind } from "tailwind-rn";

interface InputProps {
    value: string;
    onChangeText: (value: string) => void;
    placeholder?: string;
}

export default function Input({ value, onChangeText, placeholder }: InputProps) {
    const tailwind = useTailwind();
    return (
        <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={tailwind('w-full p-5 bg-gray_light')}
            autoCapitalize="none"
        />
    )
}
