import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { useTailwind } from "tailwind-rn";
import useApi from "../contexts/useApi";
import { Serie, fetchSerie, registerUserToSerie, serieTitle } from "../types/serie";
import { User } from "../types/user";
import { dateParser } from "../utils/dateParser";

const canRegisterToSerie = (serie: Serie, user: User) => {
    let caseRegistered = true;
    if (serie.usersRegistered) {
        if (serie.usersRegistered.filter((userRegistered) => userRegistered.id === user.id).length > 0) caseRegistered = false;
    }

    let caseSex = false;
    if (user.sexe) {
        if (user.sexe === "female") {
            if (!serie.onlyMen && !serie.onlyWomen) caseSex = true;
            if (!serie.onlyMen && serie.onlyWomen) caseSex = true;
        }

        if (user.sexe === "male") {
            if (!serie.onlyWomen && !serie.onlyMen) caseSex = true;
            if (!serie.onlyWomen && serie.onlyMen) caseSex = true;
        }
    }
    if (!user.sexe && !serie.onlyWomen && !serie.onlyMen) caseSex = true;

    let casePoints = false;
    if (user.officialPoints) {
        if (serie.minPoints) {
            if (user.officialPoints >= serie.minPoints) casePoints = true;
        }
        if (serie.maxPoints) {
            if (user.officialPoints <= serie.maxPoints) casePoints = true;
        }
    }
    if (!user.officialPoints && !serie.minPoints && !serie.maxPoints) casePoints = true;

    return caseRegistered && caseSex && casePoints;
}

const haveToPaySerie = (serie: Serie, user: User) => {
    if (serie.usersRegistered) {
        if (serie.usersRegistered.filter((userRegistered) => userRegistered.id === user.id).length > 0) return true;
    }
    return false;
}

export default function SerieCard({ item: serie, user, selectSerie }: { item: Serie, user: User, selectSerie: (serie: Serie) => void }) {
    const tailwind = useTailwind();
    const { axios } = useApi();
    const [canRegister, setCanRegister] = useState(false);
    const [haveToPay, setHaveToPay] = useState(false);

    const { data: serieData, refetch } = useQuery<Serie>({
        queryKey: ['serie', serie.id],
        queryFn: () => fetchSerie(axios, serie.id),
        initialData: serie
    })

    useEffect(() => {
        setCanRegister(canRegisterToSerie(serieData, user));
        setHaveToPay(haveToPaySerie(serieData, user));
    }, [user, serieData])

    const registerToSerie = useCallback(async () => {
        try {
            await registerUserToSerie(axios, serieData, user);
            refetch({ queryKey: ['serie', serie.id] });
            selectSerie(serieData);
        } catch (error) {
            console.error(error);
        }

    }, [axios, serieData, user])

    return (
        <View style={{ ...tailwind('bg-bg_black w-full rounded-md flex-col justify-between items-center p-5'), gap: 10 }}>
            <View style={tailwind('w-full flex flex-row justify-between')}>
                <Text style={tailwind('text-white text-xl font-bold py-1')}>
                    {serieTitle(serieData)}
                </Text>
                {
                    canRegister &&
                    <Text style={tailwind('text-blue text-xl font-bold py-1')}>{serieData.price} €</Text>
                }
                {
                    haveToPay &&
                    <Text style={tailwind('text-orange text-xl font-bold py-1')}>Inscrit - {serieData.price} €</Text>
                }
            </View>
            <View style={tailwind('w-full flex flex-row justify-between')}>
                <Text style={tailwind('text-white text-base font-bold self-center')}>Le {dateParser(serieData.beginDateTime, "datetime")}</Text>
                {
                    canRegister &&
                    <TouchableOpacity
                        style={tailwind('bg-blue py-2 px-8 rounded-md flex items-center justify-center')}
                        onPress={registerToSerie}
                    >
                        <Text style={tailwind('text-white text-lg')}>S'inscrire</Text>
                    </TouchableOpacity>
                }
                {
                    haveToPay &&
                    <TouchableOpacity
                        style={tailwind('bg-orange py-2 px-8 rounded-md flex items-center justify-center')}
                        onPress={() => { }}
                    >
                        <Text style={tailwind('text-white text-lg')}>Payer</Text>
                    </TouchableOpacity>
                }
            </View>
        </View >
    )
}