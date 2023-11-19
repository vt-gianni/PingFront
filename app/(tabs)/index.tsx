import { AxiosStatic } from "axios";
import { StatusBar, Text, View } from "react-native";
import { useQuery } from "react-query";
import { useTailwind } from "tailwind-rn";
import Avatar from "../../components/Avatar";
import useApi from "../../contexts/useApi";
import { User } from "../../types/user";

const fetchUser = async (axios: AxiosStatic) => {
    const response = await axios.get('/users/1', { withCredentials: true });
    return response.data;
}

export default function HomeScreen() {

    const { axios } = useApi();
    const tailwind = useTailwind();


    const { data: user, isLoading } = useQuery<User>({
        queryKey: "user",
        queryFn: () => fetchUser(axios)
    })

    return (
        <View style={tailwind('flex-1')}>
            {
                isLoading && !user ?
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
        </View>
    )
}