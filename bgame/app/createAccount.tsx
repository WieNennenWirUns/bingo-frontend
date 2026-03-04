import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { router } from 'expo-router';
import { getIP } from '@/app/_layout';

export default function CreateAccountScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleStart = async () => {
        const response = await fetch('http://' + getIP() + ':3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });
        router.replace('/home');
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

                {/* Username */}
                <View className="w-full mb-3">
                    <Text className="text-base mb-1">Enter Username</Text>
                    <TextInput
                        className="w-full p-3 border border-gray-300 rounded-xl bg-white"
                        placeholder="username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                </View>

                {/* Email */}
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

                {/* Password */}
                <View className="w-full mb-3">
                    <Text className="text-base mb-1">Add Password</Text>
                    <TextInput
                        className="w-full p-3 border border-gray-300 rounded-xl bg-white"
                        placeholder="password"
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
                        placeholder="password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>

                {/* Start Button */}
                <TouchableOpacity
                    className="w-full bg-green-400 p-4 rounded-xl mb-10"
                    onPress={handleStart}
                >
                    <Text className="text-center text-lg font-semibold text-black">
                        Start
                    </Text>
                </TouchableOpacity>

                {/* Log-In Hinweis */}
                <View className="items-center mb-3">
                    <Text className="text-base mb-1">You have an account?</Text>
                    <Text className="text-2xl">↓</Text>
                </View>

                {/* Log-In Button */}
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
