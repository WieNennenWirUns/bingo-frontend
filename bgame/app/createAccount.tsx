import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import {getIP} from "@/app/_layout";


export default function CreateAccountScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = async () => {
        setErrorMessage('');

        // --- Validation ---
        if (!username || !email || !confirmEmail || !password || !confirmPassword) {
            setErrorMessage('Please fill in all fields');
            return;
        }

        if (email !== confirmEmail) {
            setErrorMessage('Emails do not match');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try {
            // <-- Replace this with your ngrok URL or backend IP
            const response = await fetch('http://'+getIP()+':3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            });

            const text = await response.text(); // safer than .json in case backend crashes
            console.log("SERVER RESPONSE:", text);

            if (!response.ok) {
                setErrorMessage(text || 'Registration failed');
                return;
            }

            // Success → navigate
            router.replace('/home');

        } catch (error) {
            console.error("NETWORK ERROR:", error);
            setErrorMessage('Network error. Please try again.');
        } finally {
            setIsLoading(false);
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

                <Text className="text-4xl font-bold text-center mb-10">
                    Bingo Bear
                </Text>

                <Text className="text-2xl font-semibold text-center mb-6">
                    Create An Account
                </Text>

                {/* Username */}
                <View className="w-full mb-3">
                    <Text className="mb-1">Username</Text>
                    <TextInput
                        className="w-full p-3 border border-gray-300 rounded-xl"
                        placeholder="Enter username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                </View>

                {/* Email */}
                <View className="w-full mb-3">
                    <Text className="mb-1">Enter Email</Text>
                    <TextInput
                        className="w-full p-3 border border-gray-300 rounded-xl"
                        placeholder="email@domain.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Confirm Email */}
                <View className="w-full mb-3">
                    <Text className="mb-1">Confirm Email</Text>
                    <TextInput
                        className="w-full p-3 border border-gray-300 rounded-xl"
                        placeholder="email@domain.com"
                        value={confirmEmail}
                        onChangeText={setConfirmEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Password */}
                <View className="w-full mb-3">
                    <Text className="mb-1">Password</Text>
                    <TextInput
                        className="w-full p-3 border border-gray-300 rounded-xl"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                {/* Confirm Password */}
                <View className="w-full mb-4">
                    <Text className="mb-1">Confirm Password</Text>
                    <TextInput
                        className="w-full p-3 border border-gray-300 rounded-xl"
                        placeholder="Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>

                {/* Error Message */}
                {errorMessage ? (
                    <Text className="text-red-500 mb-4 text-center">
                        {errorMessage}
                    </Text>
                ) : null}

                {/* Register Button */}
                <TouchableOpacity
                    className={`w-full p-4 rounded-xl mb-6 ${isLoading ? 'bg-gray-300' : 'bg-green-400'}`}
                    onPress={handleStart}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <Text className="text-center text-lg font-semibold">
                            Start
                        </Text>
                    )}
                </TouchableOpacity>

                {/* Login Redirect */}
                <Text className="mb-2">You already have an account?</Text>

                <TouchableOpacity
                    className="w-full bg-gray-400 p-4 rounded-xl"
                    onPress={handleGoToLogin}
                >
                    <Text className="text-center text-lg font-semibold">
                        Log In
                    </Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}