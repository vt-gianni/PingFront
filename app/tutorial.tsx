import { View, Text, Button } from "react-native";
import PagerView from "react-native-pager-view";
import { useTailwind } from "tailwind-rn";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import PCButton from "../components/PCButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Constants from "expo-constants";


const tutorialTabs = [
    {
        title: "Inscris-toi à des tournois",
        content: "Sur Ping Contest, tu peux enregistrer ton profil FFTT et t’inscrire à des tournois dans toute la France. Tu as également accès aux informations des tournois passés et à l’historique de tes rencontres.",
        image: require("../assets/tuto_1.png")
    },
    {
        title: "Paye en ligne",
        content: "Sur Ping Contest, tu peux payer  en ligne. En enregistrant ta carte bancaire, tu peux régler en avance via le  paiement sécurisé. Terminé les retraits en monnaie et les files d’attente, tu vas pouvoir te concentrer sur tes matchs.",
        image: require("../assets/tuto_2.png")
    },
    {
        title: "Organise des tournois",
        content: "Sur Ping Contest, les organisateur trouvent aussi leur bonheur. L’application te permet en effet de créer un tournoi pour ton club et ses séries. Les poules sont générées automatiquement et tu n’as plus qu’à enregistrer les résultats.",
        image: require("../assets/tuto_3.png"),
        button: true
    }
]

export default function TutorialScreen() {
    const tailwind = useTailwind();
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <View style={{ ...tailwind('flex-1 bg-bg_white'), paddingTop: Constants.statusBarHeight }}>
            <PagerView style={tailwind('flex-1')} initialPage={0} onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}>
                {
                    tutorialTabs.map((tab, index) => {
                        return (
                            <TutorialTab key={`page-${index}`} pageIndex={String(index)} tab={tab} />
                        )
                    })
                }
            </PagerView>
            <View style={tailwind('w-full h-16 items-center')}>
                <View style={tailwind('w-1/2 flex-row justify-between')}>
                    {
                        tutorialTabs.map((_, index) => {
                            return (
                                <View key={`dot-${index}`} style={tailwind(`w-5 h-5 rounded-full ${index === currentPage ? 'bg-blue' : 'bg-gray'}`)}></View>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

function TutorialTab({ pageIndex, tab }: { pageIndex: string, tab: { title: string, content: string, image: string, button?: boolean } }) {
    const tailwind = useTailwind();
    return (
        <View key={pageIndex} style={tailwind('flex-1 items-center')}>
            <Image
                source={tab.image}
                style={tailwind('w-full h-1/2')}
                contentFit="contain"
                onError={(event) => console.log(event)}
                placeholder={"'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';"}
                transition={1000}
            />
            <Text style={tailwind('font-bold text-2xl')}>{tab.title}</Text>
            <Text style={tailwind('text-gray p-5 text-center text-lg')}>{tab.content}</Text>
            {
                tab.button &&
                <PCButton label="C'est compris !" onPress={() => AsyncStorage.setItem('tutorialDone', "true", () => router.replace('(tabs)'))} size="medium" />
            }
        </View>
    )
}