import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView, Alert,
} from 'react-native';
import { router } from 'expo-router';
import {getIP} from "@/app/_layout";

export default function CreateAccountScreen() {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleStart = async () => {

        if (email !== confirmEmail) {
            alert("Emails do not match");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {
            const response = await fetch('http://'+getIP()+':3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            router.replace('/');
            Alert.alert('Successfully registered', 'Please login now',
                [{ text: 'OK' }]
            );

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleGoToLogin = () => {
        router.replace('/');
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View className="flex-1 justify-center items-center px-8 py-16">
                {/* App-Name */}
                <Text className="text-4xl font-bold text-center mb-10">
                    Bingo Bear
                </Text>

                {/* Überschrift */}
                <Text className="text-2xl font-semibold text-center mb-6">
                    Create An Account
                </Text>

                {/* Enter Email */}
                <View className="w-full mb-3">
                    <Text className="text-base mb-1">Enter Email</Text>
                    <TextInput
                        className="w-full p-3 border border-gray-300 rounded-xl bg-white"
                        placeholder="email@domain.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Confirm Email */}
                <View className="w-full mb-3">
                    <Text className="text-base mb-1">Confirm Email</Text>
                    <TextInput
                        className="w-full p-3 border border-gray-300 rounded-xl bg-white"
                        placeholder="email@domain.com"
                        value={confirmEmail}
                        onChangeText={setConfirmEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Add Password */}
                <View className="w-full mb-3">
                    <Text className="text-base mb-1">Add Password</Text>
                    <TextInput
                        className="w-full p-3 border border-gray-300 rounded-xl bg-white"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                {/* Confirm Password */}
                <View className="w-full mb-6">
                    <Text className="text-base mb-1">Confirm Password</Text>
                    <TextInput
                        className="w-full p-3 border border-gray-300 rounded-xl bg-white"
                        placeholder="Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>

                {/* Grüner Start-Button */}
                <TouchableOpacity
                    className="w-full bg-green-400 p-4 rounded-xl mb-10"
                    onPress={handleStart}
                >
                    <Text className="text-center text-lg font-semibold text-black">
                        Start
                    </Text>
                </TouchableOpacity>

                {/* Text + Pfeil zum Log In */}
                <View className="items-center mb-3">
                    <Text className="text-base mb-1">You have an account?</Text>
                    {/* Optional: kleiner Pfeil nach unten als Text */}
                    <Text className="text-2xl">↓</Text>
                </View>

                {/* Grüner Log-In-Button unten */}
                <TouchableOpacity
                    className="w-full bg-gray-400 p-4 rounded-xl"
                    onPress={handleGoToLogin}
                >
                    <Text className="text-center text-lg font-semibold text-black">
                        Log In
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
