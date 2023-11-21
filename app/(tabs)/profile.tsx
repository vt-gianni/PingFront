import { Picker } from "@react-native-picker/picker";
import { useState, useCallback, useEffect } from "react";
import { View, Text, StatusBar, ScrollView, Touchable, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import { useTailwind } from "tailwind-rn";
import Avatar from "../../components/Avatar";
import Input from "../../components/Input";
import PCButton from "../../components/PCButton";
import useApi from "../../contexts/useApi";
import { ClubResponse, fetchClubs } from "../../types/club";
import { User, fetchUser } from "../../types/user";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
    const { axios } = useApi();
    const tailwind = useTailwind();

    const [editedUser, setEditedUser] = useState<User | {}>({});

    const { data: user, isLoading: isLoadingUser, refetch } = useQuery<User>({
        queryKey: "user",
        queryFn: () => fetchUser(axios)
    });

    const { data: clubs, isLoading: isLoadingClubs } = useQuery<ClubResponse>({
        queryKey: "clubs",
        queryFn: () => fetchClubs(axios)
    })

    const updateEditedUser = useCallback((key: keyof User, value: string) => {
        if (value.length === 0) {
            setEditedUser((prev) => {
                const { [key]: _, ...rest } = prev as User;
                return rest;
            });
            return;
        }
        if (value === user[key]) {
            setEditedUser((prev) => {
                const { [key]: _, ...rest } = prev as User;
                return rest;
            });
            return;
        }
        setEditedUser((prev) => ({ ...prev, [key]: value }));
    }, [setEditedUser])

    const editUser = useCallback(async () => {
        if (!!!Object.keys(editedUser)) return;
        try {
            const response = await axios.put(`/users/${user.id}`, editedUser);
            if (response.status === 200) {
                refetch({ queryKey: "user" });
            }
        } catch (error) {
            console.log("ERROR", error);
        }
    }, [editedUser])

    if (isLoadingUser || !user) return null;

    return (
        <View style={tailwind('flex-1')}>
            <View style={{ ...tailwind('p-5 py-10 bg-bg_black justify-center items-center'), paddingTop: StatusBar.currentHeight + 20 }}>
                <Avatar image={user.avatar} size='large' />
                <Text style={tailwind('text-white text-2xl')}>
                    {user.firstName ? `${user.firstName} ${user.lastName}` : user.email}
                </Text>
            </View>
            <ScrollView
                contentContainerStyle={{ ...tailwind('w-full flex-col items-center justify-center p-5'), gap: 20 }}
            >
                <View style={{ ...tailwind('w-full flex-row items-center justify-end'), gap: 10 }}>
                    <TouchableOpacity
                        style={tailwind('flex items-center justify-center border border-blue border-opacity-50 rounded-md overflow-hidden')}
                        onPress={() => updateEditedUser("sexe", "homme")}
                    >
                        <MaterialCommunityIcons
                            name="human-male"
                            size={20}
                            style={tailwind(`p-1 ${(user.sexe === "homme" || (editedUser as User).sexe === "homme") ? "text-white bg-blue" : "text-blue text-opacity-50 bg-transparent"}`)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tailwind('flex items-center justify-center border border-red border-opacity-50 rounded-md overflow-hidden')}
                        onPress={() => updateEditedUser("sexe", "femme")}
                    >
                        <MaterialCommunityIcons
                            name="human-female"
                            size={20}
                            style={tailwind(`p-1 ${(user.sexe === "femme" || (editedUser as User).sexe === "femme") ? "text-white bg-red" : "text-red text-opacity-50 bg-transparent"}`)}
                        />
                    </TouchableOpacity>
                </View>
                <Input
                    value={(editedUser as User).firstName ?? user.firstName}
                    onChangeText={(value) => { updateEditedUser("firstName", value) }}
                    placeholder='Prénom'
                />
                <Input
                    value={(editedUser as User).lastName ?? user.lastName}
                    onChangeText={(value) => { updateEditedUser("lastName", value) }}
                    placeholder='Nom'
                />
                <Input
                    value={(editedUser as User).birthdate ?? user.birthdate}
                    onChangeText={(value) => { updateEditedUser("birthdate", value) }}
                    placeholder='Date de naissance'
                />
                <Input
                    value={(editedUser as User).licenceNumber ?? user.licenceNumber}
                    onChangeText={(value) => { updateEditedUser("licenceNumber", value) }}
                    placeholder='Numéro de licence'
                />
                <Picker
                    style={tailwind('w-full p-5 bg-gray_light')}
                >
                    {
                        isLoadingClubs ?
                            (
                                <Picker.Item label='Chargement...' value='' enabled={false} />
                            )
                            :
                            (
                                clubs["hydra:member"].map((club, index) => (
                                    <Picker.Item key={index} label={club.name} value={club} />
                                ))
                            )
                    }
                </Picker>
                <Input
                    value={String((editedUser as User).officialPoints ?? user.officialPoints ?? "")}
                    onChangeText={(value) => { updateEditedUser("officialPoints", value) }}
                    placeholder='Points officiels'
                />
                <PCButton
                    label='Modifier mes informations'
                    bgColor='blue'
                    onPress={editUser}
                />
            </ScrollView>
        </View>
    )
}