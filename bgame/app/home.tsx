import { View, Text, TouchableOpacity, TextInput, FlatList, } from 'react-native';
import { router } from 'expo-router';
import {SafeAreaView} from "react-native-safe-area-context";
import HomeHeaderFilter from "@/app/dropDown/HomeBingoFilter";
import {getAccessToken} from "@/app/storage";
import {getIP} from "@/app/_layout";
import React, { useState, useEffect } from 'react';

type Board = {
    id: string;
    name: string;
};

    export default function HomeScreen() {

    const [friendcodeOpen, setFriendcodeOpen] = useState(false);
    const [friendcode, setFriendcode] = useState('');

    const toggleFriendcode = () => {
        setFriendcodeOpen(prev => !prev);
    };

    const [boards, setBoards] = useState<Board[]>([]);

        useEffect(() => {
            const fetchBoards = async () => {
                try {
                    const token = await getAccessToken();
                    if (!token) return;
                    const response = await fetch(`http://${getIP()}:3000/board`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        console.log('Error fetching boards:', response.status, await response.text());
                        return;
                    }
                    const data = await response.json();
                    setBoards(data);
                } catch (err) {
                    console.error('Fetch boards failed:', err);
                }
            };
            fetchBoards();
        }, []);

    const handleAddFriend = async () => {
        const upperFriendcode = friendcode.trim().toUpperCase();
        try {
            const token = await getAccessToken();
            if (!token) return;

            const res = await fetch(`http://${getIP()}:3000/friends/request`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friendcode:upperFriendcode }),
            });

            console.log(res);
            const data = await res.json();
            console.log(data);


            if (!res.ok) {
                const error = await res.json();
                console.log(error.message);
            }

            console.log('Friend request response:', res.status);
        } catch (err) {
            console.error('Add friend failed:', err);
        }
    };

    const handleGoToCreateGame = () => router.push('/createGame1');
    const handleGoToProfile = () => router.push('/profile');

    const renderBoard = ({ item }: { item: Board }) => (
            <TouchableOpacity
                className="w-full bg-white border border-gray-300 rounded-xl p-4 mb-3"
                onPress={() =>
                    router.push({
                        pathname: '/bingoBoard',
                        params: {
                            gameId: item.id,
                            gameName: item.name,
                            fields: JSON.stringify([]),
                        },
                    })
                }
            >
                <Text className="text-lg font-semibold mb-2">{item.name}</Text>
                <Text className="text-sm text-gray-500">Tap to view</Text>
            </TouchableOpacity>
        );

    return (
        <SafeAreaView className="flex-1 bg-white px-4 pb-4">
            {/* Header: Filter + Name + Avatar */}
            <View className="flex-row items-center justify-between mt-2">
                <HomeHeaderFilter />
                <Text className="text-2xl font-semibold">Bingo Bear</Text>
                <TouchableOpacity
                    className="w-10 h-10 rounded-full bg-gray-300 z-50"
                    onPress={handleGoToProfile}
                />
            </View>

            {/* Boards-Bereich darum kümmere ich mich noch */}
            <View className="flex-1 bg-white rounded-3xl p-4">
                {boards.length === 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-center text-gray-500">
                            Du hast noch keine Bingo Boards.
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={boards}
                        keyExtractor={(item) => item.id}
                        renderItem={renderBoard}
                        contentContainerStyle={{ paddingBottom: 16 }}
                    />
                )}
            </View>

            {/* Untere Leiste: links Profil, mitte „Add Friends“, rechts CreateGame */}
            <View className="mt-4 flex-row items-center justify-between">
                <TouchableOpacity
                    className="w-10 h-10 rounded-full bg-black"
                    onPress={handleGoToProfile}
                />

                <View className="flex-1 mx-3 bg-white border rounded-2xl py-2 px-4 items-center h-10 z-50">
                    <TouchableOpacity
                        onPress={toggleFriendcode}
                    >
                        <Text className="font-semibold text-center">Add Friends</Text>
                    </TouchableOpacity>

                    {friendcodeOpen && (
                        <View className="absolute bottom-12 left-0 right-0 bg-white rounded-2xl px-4 py-3 shadow-lg z-50 border">
                            <Text className="text-sm mb-1">nur XXX-XXX (Beispiel)</Text>
                            <TextInput
                                className="w-full mt-1 mb-3 p-3 bg-white border border-gray-400 rounded-xl"
                                placeholder="Enter Code"
                                value={friendcode}
                                onChangeText={setFriendcode}
                            />
                            <TouchableOpacity
                                className="w-full bg-white border rounded-xl py-3"
                                onPress={handleAddFriend}
                            >
                                <Text className="text-center font-semibold">Add</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    className="w-10 h-10 rounded-full border bg-white items-center justify-center"
                    onPress={handleGoToCreateGame}
                >
                    <Text className="text-2xl font-semibold">+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}