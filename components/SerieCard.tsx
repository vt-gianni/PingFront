import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Serie } from "../types/serie";
import { User } from "../types/user";
import { useEffect, useState } from "react";
import { dateParser } from "../utils/dateParser";

const canRegisterToSerie = (serie: Serie, user: User) => {
    if (user.sexe === "femme") {
        if (!serie.onlyMen && serie.onlyWomen) return true;
        if (serie.onlyWomen) return true;
        return false;
    }
    if (user.sexe === "homme") {
        if (!serie.onlyMen && serie.onlyWomen) return true;
        if (serie.onlyMen) return true;
        return false;
    }
    return false;
}

export default function SerieCard({ item: serie, user }: { item: Serie, user: User }) {
    const tailwind = useTailwind();
    const [canRegister, setCanRegister] = useState(false);

    useEffect(() => {
        setCanRegister(canRegisterToSerie(serie, user));
    }, [user, serie])

    return (
        <View style={{ ...tailwind('bg-bg_black w-full rounded-md flex-col justify-between items-center p-5'), gap: 10 }}>
            <View style={tailwind('w-full flex flex-row justify-between')}>
                <Text style={tailwind('text-white text-xl font-bold py-1')}>Série - {serie.onlyWomen ? "Femmes" : serie.onlyMen ? "Hommes" : serie.minPoints}</Text>
                {
                    canRegisterToSerie &&
                    <Text style={tailwind('text-blue text-3xl font-bold py-1')}>{serie.price} €</Text>
                }
            </View>
            <View style={tailwind('w-full flex flex-row justify-between')}>
                <Text style={tailwind('text-white text-base font-bold self-center')}>Le {dateParser(serie.beginDateTime, "datetime")}</Text>
                <TouchableOpacity
                    style={tailwind('bg-blue py-2 px-8 rounded-md flex items-center justify-center')}
                    onPress={() => { }}
                >
                    <Text style={tailwind('text-white text-lg')}>S'inscrire</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}