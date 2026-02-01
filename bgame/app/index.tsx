import "./global.css"
import {View, Text, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView,} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useState} from "react";
import {router} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getIP} from "@/app/_layout";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Fehler', 'Bitte Email und Passwort eingeben.');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch('http://'+getIP()+':3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.log('Login error:', errorText);
                Alert.alert('Login fehlgeschlagen', 'Email oder Passwort falsch?');
                return;
            }

            const data = await response.json();
            // data: { access_token, refresh_token }

            await AsyncStorage.setItem('access_token', data.access_token);
            await AsyncStorage.setItem('refresh_token', data.refresh_token);

            // Jetzt als eingeloggt behandeln → z.B. zu /(app) navigieren
            router.replace('/home');
        } catch (err) {
            console.error(err);
            Alert.alert('Fehler', 'Konnte keine Verbindung zum Server herstellen.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoToCreateAccount = () => {
        router.push('/createAccount');
    };

    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView className="flex-1">
                <View className="flex-1 justify-center items-center p-8">
                    {/* App-Name, log in, Inputs etc. wie bei dir, nur onPress geändert */}
                    <Text className="text-5xl font-bold uppercase text-center mb-6 text-gray-800">
                        Bingo Bear
                    </Text>

                    <Text className="text-2xl font-semibold text-center mb-12 text-gray-600">
                        log in
                    </Text>

                    <TextInput
                        className="w-full p-4 border border-gray-300 rounded-xl mb-4 bg-white"
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        className="w-full p-4 border border-gray-300 rounded-xl mb-8 bg-white"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        className={`w-full p-5 rounded-2xl mb-8 ${
                            loading ? 'bg-green-300' : 'bg-green-500'
                        }`}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text className="text-white text-xl font-bold text-center">
                            {loading ? 'Lädt...' : 'Start'}
                        </Text>
                    </TouchableOpacity>

                    {/* Pfeil + Text */}
                    <View className="flex-row items-center mb-4">
                        <Text className="text-sm text-gray-600 mr-2">
                            You Don't Have An Account?
                        </Text>
                        <Text className="text-lg">↓</Text>
                    </View>

                    {/* Create Account Button */}
                    <TouchableOpacity
                        className="w-full bg-gray-400 p-4 rounded-xl"
                        onPress={handleGoToCreateAccount}
                    >
                        <Text className="text-white text-lg font-semibold text-center">
                            Create An Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}



/**
 * mt = Abstand zum oberen Rand
 * mx = Abstand zu den Seiten
 * mb = Abstand zwischen den Buttons
 * p = Größe des Kastens
 * bg =
 * rounded =
 */