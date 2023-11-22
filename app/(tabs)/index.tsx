import { FontAwesome } from "@expo/vector-icons";
import { AxiosStatic } from "axios";
import { useEffect, useState } from "react";
import { FlatList, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { useTailwind } from "tailwind-rn";
import Avatar from "../../components/Avatar";
import TournamentCard from "../../components/TournamentCard";
import useApi from "../../contexts/useApi";
import { Tournament, TournamentResponse, fetchTournaments } from "../../types/tournament";
import { User, fetchUser } from "../../types/user";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {

    const { axios } = useApi();
    const tailwind = useTailwind();

    const [upcomingTournaments, setUpcomingTournaments] = useState<Tournament[]>([]);
    const [pastTournaments, setPastTournaments] = useState<Tournament[]>([]);
    const [tabSelected, setTabSelected] = useState<'upcoming' | 'past'>('upcoming');

    const { data: user, isLoading: isLoadingUser } = useQuery<User>({
        queryKey: "user",
        queryFn: () => fetchUser(axios)
    });

    const { data: tournaments, isLoading: isLoadingTournaments } = useQuery<TournamentResponse>({
        queryKey: "tournaments",
        queryFn: () => fetchTournaments(axios)
    });

    useEffect(() => {
        if (!tournaments) return;
        setUpcomingTournaments(tournaments.upcoming["hydra:member"])
        setPastTournaments(tournaments.past["hydra:member"])
    }, [tournaments])

    return (
        <View style={tailwind('flex-1')}>
            {
                (isLoadingUser || !user) ?
                    (
                        null
                    )
                    :
                    (
                        <View style={{ ...tailwind('p-5 py-10 bg-bg_black flex-row justify-between items-center'), paddingTop: StatusBar.currentHeight + 10 }}>
                            <View>
                                <Text style={tailwind('text-white mb-5 text-2xl')}>{user.firstName ? `${user.firstName} ${user.lastName}` : user.email}</Text>
                                <Text style={tailwind('text-white text-lg')}>Licence: {user.licenceNumber ?? "<Non renseignée>"}</Text>
                                <Text style={tailwind('text-white text-lg')}>LMTT - {user.officialPoints ?? "<Non renseignés>"} pts</Text>
                            </View>
                            <Avatar image={user.avatar} />
                        </View>
                    )
            }
            <View style={tailwind('flex-row justify-between p-5')}>
                <Text
                    style={tailwind(`rounded-full ${tabSelected === "upcoming" ? "bg-blue" : "bg-bg_black"} px-4 py-2 text-white text-lg text-center`)}
                    onPress={() => setTabSelected("upcoming")}
                >
                    Tournois à venir
                </Text>
                <Text
                    style={tailwind(`rounded-full ${tabSelected === "past" ? "bg-blue" : "bg-bg_black"} px-4 py-2 text-white text-lg text-center`)}
                    onPress={() => setTabSelected("past")}
                >
                    Historique
                </Text>
                <TouchableOpacity
                    style={tailwind('px-5 flex items-center justify-center')}
                    onPress={() => router.push('user-edit')}
                >
                    <FontAwesome name="sliders" size={28} />
                </TouchableOpacity>
            </View>
            <FlatList
                style={tailwind('px-5')}
                data={tabSelected === "upcoming" ? upcomingTournaments : pastTournaments}
                renderItem={({ item }) => <TournamentCard item={item} />}
            />
        </View>
    )
}