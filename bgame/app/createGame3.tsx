// app/(app)/createGame3.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateGame3() {
    const { gameName, boardSize, fields } = useLocalSearchParams();
    const parsedFields = JSON.parse(fields as string);

    // Platzhalter-Freunde (später aus DB)
    const [friends] = useState([
        { id: '1', name: 'Bert', avatar: '🟠' },
        { id: '2', name: 'Erni', avatar: '⚫' },
    ]);

    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

    const toggleFriend = (friendId: string) => {
        setSelectedFriends(prev =>
            prev.includes(friendId)
                ? prev.filter(id => id !== friendId)
                : [...prev, friendId]
        );
    };

    const handleStartGame = () => {
        console.log('Game starten:', {
            gameName,
            boardSize,
            fields: parsedFields,
            selectedFriends
        });
        router.push('/bingoBoard');
    };

    const renderFriend = ({ item }: { item: { id: string; name: string; avatar: string } }) => {
        const isSelected = selectedFriends.includes(item.id);

        return (
            <TouchableOpacity
                className="flex-row items-center p-4 border border-gray-300 rounded-xl bg-white mb-3"
                onPress={() => toggleFriend(item.id)}
            >
                <Text className="text-2xl mr-4">{item.avatar}</Text>
                <View className="flex-1">
                    <Text className="font-semibold text-lg mb-1">{item.name}</Text>
                </View>

                {/* Eigene Checkbox */}
                <View className={`w-6 h-6 border-2 rounded-md items-center justify-center ${
                    isSelected
                        ? 'bg-green-500 border-green-500'
                        : 'bg-white border-gray-400'
                }`}>
                    {isSelected && (
                        <Text className="text-white text-xs font-bold">✓</Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Fixer Header */}
            <View className="px-5 pt-5 pb-4">
                <View className="mb-6">
                    <Text className="text-center text-3xl font-bold mb-2">Create Game</Text>
                    <View className="h-px bg-gray-300 mx-0" />
                </View>

                {/* Tab-Buttons - Invite Members aktiv */}
                <View className="flex-row mb-8">
                    <TouchableOpacity className="px-6 py-3 mr-1">
                        <Text className="text-blue-500 font-semibold">General Setup</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-6 py-3 mr-1">
                        <Text className="text-blue-500 font-semibold">Setup Fields</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-6 py-3 bg-blue-500 rounded-t-xl">
                        <Text className="text-white font-semibold">Invite Members</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                <View className="mb-6 p-6 border border-gray-300 rounded-xl bg-gray-50">
                    <Text className="text-lg font-semibold mb-6">Add Members</Text>

                    {/* Freunde oder "No Friends" Nachricht */}
                    {friends.length === 0 ? (
                        <View className="items-center py-12">
                            <Text className="text-lg text-gray-500 mb-2">You have no one to add 😢</Text>
                            <Text className="text-sm text-gray-400">You can still start without friends</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={friends}
                            renderItem={renderFriend}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    )}
                </View>
            </ScrollView>

            {/* Fixer Start Button */}
            <View className="px-5 pb-5">
                <TouchableOpacity
                    className="w-full bg-green-500 p-5 rounded-2xl items-center"
                    onPress={handleStartGame}
                >
                    <Text className="text-white text-xl font-bold">Start Game!</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
