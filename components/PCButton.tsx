import { TouchableOpacity, Text } from "react-native";
import { useTailwind } from "tailwind-rn";

type PCButtonProps = {
    label: string,
    onPress?: () => void,
    disabled?: boolean,
    size?: "large" | "medium" | "small",
    withBackground?: boolean,
    textColor?: "blue" | "orange" | "red" | "white",
    bgColor?: "blue" | "orange" | "red" | "green",
}

export default function PCButton({ label, onPress, disabled, size = "large", withBackground = true, textColor = "white", bgColor = "blue" }: PCButtonProps) {
    const tailwind = useTailwind();

    return (
        <TouchableOpacity
            style={
                tailwind(`
                    ${size === "large" ? "w-full" : size === "medium" ? "w-1/2" : "w-1/4"}
                    h-12
                    ${withBackground ?
                        disabled ?
                            ("bg-gray_light")
                            :
                            (
                                bgColor === "blue" ? "bg-blue" :
                                    bgColor === "orange" ? "bg-orange" :
                                        bgColor === "red" ? "bg-red" :
                                            bgColor === "green" ? "bg-green" : ""
                            )
                        : ""
                    } 
                    rounded-md
                    items-center 
                    justify-center
                `)
            }
            activeOpacity={0.6}
            onPress={onPress}
            disabled={disabled ?? false}
        >
            <Text style={tailwind(`${textColor === "blue" ? "text-blue" : ""} ${textColor === "orange" ? "text-orange" : ""} ${textColor === "red" ? "text-red" : ""} ${textColor === "white" ? "text-white" : ""} font-medium ${withBackground ? "" : "underline"}`)}>{label}</Text>
        </TouchableOpacity>
    )
}