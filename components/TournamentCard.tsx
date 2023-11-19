import { View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Tournament } from "../types/tournament";

export default function TournamentCard({ item }: { item: Tournament }) {
    const tailwind = useTailwind();
    return (
        <View style={tailwind('bg-bg_black w-full rounded-md flex-row justify-between items-center p-5')}>
            <View>
                <Text style={tailwind('text-white text-lg font-bold py-1')}>{item.city}</Text>
                <Text style={tailwind('text-white text-sm font-bold py-1')}>{item.beginDate}</Text>
            </View>
            <TouchableOpacity style={tailwind('bg-blue w-1/4 h-2/3 rounded-md flex items-center justify-center')}>
                <Text style={tailwind('text-white text-lg')}>Voir</Text>
            </TouchableOpacity>
        </View>
    )
}