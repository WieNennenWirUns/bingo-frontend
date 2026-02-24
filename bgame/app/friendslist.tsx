// app/(app)/friendsList.tsx

import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Friend = {
    id: string;
    name: string;
};

export default function FriendsList() {
    const [friends, setFriends] = useState<Friend[]>([
        { id: '1', name: 'Bert' },
        { id: '2', name: 'Erni' },
    ]);

    const [friendcodeOpen, setFriendcodeOpen] = useState(false);
    const [friendcode, setFriendcode] = useState('');

    const toggleFriendcode = () => {
        setFriendcodeOpen(prev => !prev);
    };

    const handleAddFriend = () => {
        if (!friendcode.trim()) return;

        const newFriend = {
            id: Date.now().toString(),
            name: friendcode,
        };

        setFriends(prev => [...prev, newFriend]);
        setFriendcode('');
        setFriendcodeOpen(false);
    };

    const handleDeleteFriend = (id: string) => {
        Alert.alert(
            'Delete Friend',
            'Are you sure?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: () => {
                        setFriends(prev => prev.filter(f => f.id !== id));
                    },
                },
            ]
        );
    };

    const renderFriend = ({ item }: { item: Friend }) => (
        <View>
            <View className="flex-row items-center py-4">

                {/* Placeholder Circle */}
                <View className="w-10 h-10 rounded-full bg-black mr-4" />

                {/* Name */}
                <Text className="flex-1 text-xl">
                    {item.name}
                </Text>

                {/* Delete */}
                <TouchableOpacity onPress={() => handleDeleteFriend(item.id)}>
                    <Text className="text-red-600 font-bold text-lg mr-2">✕</Text>
                </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="h-px bg-black" />
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white px-5">

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >

                {/* Header */}
                <View className="pt-8 mb-6">
                    <Text className="text-3xl font-bold text-center mb-3">
                        Your Friends
                    </Text>
                    <View className="h-0.5 bg-black" />
                </View>

                {/* Friends List */}
                {friends.length === 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-gray-500 text-2xl text-center">
                            You have no friends you loser :)
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={friends}
                        keyExtractor={(item) => item.id}
                        renderItem={renderFriend}
                        className="flex-1"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )}

                {/* Bottom Add Friends Bar */}
                <View className="py-4">

                    <View className="bg-white border rounded-2xl py-2 px-4 items-center">

                        <TouchableOpacity onPress={toggleFriendcode}>
                            <Text className="font-semibold">
                                Add Friends
                            </Text>
                        </TouchableOpacity>

                        {friendcodeOpen && (
                            <View className="absolute bottom-14 left-0 right-0 bg-white rounded-2xl px-4 py-3 shadow-lg border">

                                <Text className="text-sm mb-1">
                                    only XXXX-XXXX
                                </Text>

                                <TextInput
                                    className="w-full mt-1 mb-3 p-3 bg-white border border-gray-400 rounded-xl"
                                    placeholder="Enter Code"
                                    value={friendcode}
                                    onChangeText={setFriendcode}
                                />

                                <TouchableOpacity
                                    className="w-full bg-black rounded-xl py-3"
                                    onPress={handleAddFriend}
                                >
                                    <Text className="text-center font-semibold text-white">
                                        Add
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        )}

                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}