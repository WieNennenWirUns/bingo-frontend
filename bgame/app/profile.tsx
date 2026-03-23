// app/(app)/profile.tsx
import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getIP} from "@/app/_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingDisplayName, setIsEditingDisplayName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    const [displayName, setDisplayName] = useState('KenDerDummy');
    const [email, setEmail] = useState('kenderdummy@test.com');

    const getEmailFromWhoami = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) return;

            const response = await fetch(`http://${getIP()}:3000/auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            const userEmail = data.email;

            if (userEmail) {
                const username = userEmail.split('@')[0];
                setDisplayName(username);
                setEmail(userEmail);
            }
        } catch (error) {
            console.error('whoami error:', error);
        }
    };

    useEffect(() => {
        getEmailFromWhoami();
    }, []);

    const handleLogout = () => {
        router.replace('/');
    };

    const handleViewFriends = () => {
        router.push('/friendslist');
    };

    const handleEditProfile = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveProfile = () => {
        setIsEditing(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
                {/* Profil Header */}
                <View className="flex-row items-center justify-between pl-6 mt-6 mb-12 space-x-8">
                    <View className="w-24 h-24 bg-gray-300 rounded-full mb-4 items-center justify-center mr-4">
                        <Text className="text-4xl">👤</Text>
                    </View>
                    <View className="flex-1 pl-6">
                        <Text className="text-4xl font-bold mb-3">Profile</Text>
                        <Text className="text-xl font-semibold">{displayName}</Text>
                    </View>
                </View>

                <View className="h-px bg-gray-400 mx-0 mb-6" />

                {/* Display Name + Email */}
                <View className="mb-6 p-6 border border-gray-300 rounded-xl bg-gray-50">
                    {/* Display Name */}
                    <View className="mb-6">
                        <Text className="text-xl font-semibold mb-3">Display Name</Text>
                        {isEditingDisplayName ? (
                            <View className="flex-row items-center space-x-4">
                                <TextInput
                                    className="flex-1 p-4 border border-gray-300 rounded-xl bg-white"
                                    value={displayName}
                                    onChangeText={setDisplayName}
                                    autoCapitalize="words"
                                />
                                <TouchableOpacity
                                    className="px-6 py-4 bg-green-500 rounded-xl items-center"
                                    onPress={() => setIsEditingDisplayName(false)}
                                >
                                    <Text className="text-white font-semibold">Done</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View className="flex-row items-center justify-between">
                                <Text className="text-xl">{displayName}</Text>

                            </View>
                        )}
                    </View>

                    {/* Email - gleicher Container */}
                    <View className="mb-0">
                        <Text className="text-xl font-semibold mb-3">Email</Text>
                        {isEditingEmail ? (
                            <View className="flex-row items-center space-x-4">
                                <TextInput
                                    className="flex-1 p-4 border border-gray-300 rounded-xl bg-white"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    className="px-6 py-4 bg-green-500 rounded-xl items-center"
                                    onPress={() => setIsEditingEmail(false)}
                                >
                                    <Text className="text-white font-semibold">Done</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View className="flex-row items-center justify-between">
                                <Text className="text-xl">{email}</Text>

                            </View>
                        )}
                    </View>
                </View>


                <View className="h-px bg-gray-400 mx-0 mb-6" />

                {/* Der Rest */}
                <View className="mb-6 p-6 border border-gray-300 rounded-3xl bg-gray-50">
                    {/* Friends Section */}
                    <TouchableOpacity
                        className="mb-3 p-4 border border-gray-400 rounded-xl bg-gray-50 self-start min-w-[270px]"
                        onPress={handleViewFriends}
                    >
                        <Text className="text-xl text-center font-semibold">View Friends</Text>
                    </TouchableOpacity>

                    <View className="h-px bg-gray-400 mx-0 mb-3" />

                    {/* Change Appearance
                    <TouchableOpacity className="mb-3 p-4 border border-gray-400 rounded-xl bg-gray-50 self-start min-w-[270px]">
                        <Text className="text-xl text-center font-semibold">Change Appearance</Text>
                    </TouchableOpacity>

                    <View className="h-px bg-gray-400 mx-0 mb-3" /> */}

                    {/* Buttons
                    <TouchableOpacity
                        className="mb-3 p-4 border rounded-xl bg-red-100 self-start min-w-[270px]"
                        onPress={handleLogout}
                    >
                       <Text className="text-black text-center text-xl font-semibold">Change Password</Text>
                    </TouchableOpacity>

                    <View className="h-px bg-gray-400 mx-0 mb-3" />*/}

                    <TouchableOpacity
                        className="text-center p-4 border rounded-xl bg-red-100 self-start min-w-[270px]"
                        onPress={handleLogout}
                    >
                        <Text className="text-black text-center text-xl font-semibold">Log out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
