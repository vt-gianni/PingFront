import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Linking, Pressable, StatusBar, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { useTailwind } from 'tailwind-rn';
import SerieCard from '../../components/SerieCard';
import useApi from '../../contexts/useApi';
import { Tournament, fetchTournament } from '../../types/tournament';
import { dateParser } from '../../utils/dateParser';
import { User, fetchUser } from '../../types/user';

export default function TournamentDetailsScreen() {

    const { axios } = useApi();
    const tailwind = useTailwind();
    const { data } = useLocalSearchParams() as Partial<{ data: string }>;

    const { data: tournament, isLoading: isLoadingTournament } = useQuery<Tournament>({
        queryKey: ['tournament', JSON.parse(data).id],
        queryFn: () => fetchTournament(axios, JSON.parse(data).id),
        initialData: JSON.parse(data)
    })

    const { data: user, isLoading: isLoadingUser } = useQuery<User>({
        queryKey: "user",
        queryFn: () => fetchUser(axios)
    });

    return (
        <View style={tailwind('flex-1')}>

            <View style={{ ...tailwind('p-5 py-10 bg-bg_black justify-center items-center'), paddingTop: StatusBar.currentHeight + 20 }}>
                <Text style={tailwind('text-white text-2xl py-10')}>
                    Tournoi de {tournament.city}
                </Text>
                <View style={{ ...tailwind('w-full'), gap: 10 }}>
                    <View style={{ ...tailwind('flex-row items-center'), gap: 10 }}>
                        <FontAwesome5 name="map-pin" size={25} color={'white'} style={tailwind('w-[25px]')} />
                        <Pressable
                            style={{ gap: 2 }}
                            onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${tournament.address} ${tournament.zipCode} ${tournament.city}&travelmode=driving`)}
                        >
                            <Text style={tailwind('text-white text-lg')}>{tournament.address}</Text>
                            <Text style={tailwind('text-white text-lg')}>{tournament.gym}</Text>
                        </Pressable>
                    </View>
                    <View style={{ ...tailwind('flex-row items-center'), gap: 10 }}>
                        <FontAwesome5 name="calendar" solid size={25} color={'white'} style={tailwind('w-[25px]')} />
                        <Text style={tailwind('text-white text-lg')}>Débute le <Text style={tailwind('text-blue font-bold')}>{dateParser(tournament.beginDate, "date")}</Text></Text>
                    </View>
                </View>
            </View>
            <FlatList
                style={tailwind('p-5')}
                data={tournament.series}
                renderItem={({ item }) => <SerieCard item={item} user={user} />}
                ListEmptyComponent={() => {
                    if (isLoadingTournament) return <Text style={tailwind('text-black text-lg text-center')}>Chargement des données ...</Text>;
                    return <Text style={tailwind('text-black text-lg text-center')}>Aucune série disponible pour ce tournoi 😢 {isLoadingTournament ? "loading" : ""}</Text>
                }}
            />
        </View>
    )
}
