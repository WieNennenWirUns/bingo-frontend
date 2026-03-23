import {SplashScreen, Stack} from 'expo-router';
import './global.css';
import { useFonts, Caveat_400Regular, Caveat_700Bold } from '@expo-google-fonts/caveat';
import { useEffect} from "react";

export default function RootLayout() {

    const [fontsLoaded, error] = useFonts({
        "Caveat-normal": Caveat_400Regular,
        "Caveat-bold": Caveat_700Bold,
    });

    useEffect(() => {
        if(error) throw error;
        if(fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack screenOptions={{headerShown: false}} />
    );
}

export function getIP() {
    return "192.168.94.45"; //hier muss die IP Adresse abgeändert werden -->IPv4 Adresse siehe: ipconfig(in Terminal schreiben)
}