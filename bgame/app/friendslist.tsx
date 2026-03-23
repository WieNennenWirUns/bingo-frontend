// app/(app)/friendsList.tsx

import React, {useEffect, useState} from 'react';
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getIP} from "@/app/_layout";

type Friend = {
    id: string;
    username: string;
};

export default function FriendsList() {
    const [friends, setFriends] = useState<Friend[]>([ ]);

    const [friendcodeOpen, setFriendcodeOpen] = useState(false);
    const [friendcode, setFriendcode] = useState('');

    const toggleFriendcode = () => {
        setFriendcodeOpen(prev => !prev);
    };

    const handleAddFriend = async () => {
        if (!friendcode.trim()) return;
        const upperFriendcode = friendcode.trim().toUpperCase();
        console.log(upperFriendcode);
        try {

            const token = await AsyncStorage.getItem('access_token');
            if (!token) {
                console.log('No token found');
                return;
            }

            const response = await fetch('http://'+getIP()+':3000/friends/request', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friendcode: upperFriendcode }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Friend request sent:', data);

            setFriends(prev => [...prev, { id: Date.now().toString(), username: friendcode }]);
            setFriendcode('');
            setFriendcodeOpen(false);

        } catch (error) {
            console.error('Add friend error:', error);
            alert('Fehler beim Senden der Anfrage');
        }
    };

    const handleDeleteFriend = async (id: string) => {
        Alert.alert('Delete Friend', 'Are you sure?', [
            { text: 'No', style: 'cancel' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: async () => {
                    try {

                        const token = await AsyncStorage.getItem('access_token');
                        if (!token) {
                            Alert.alert('Error', 'No Token found');
                            return;
                        }

                        const response = await fetch(`http://` + getIP() + `:3000/friends/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP ${response.status}`);
                        }

                        setFriends(prev => prev.filter(f => f.id !== id));

                    } catch (error) {
                        console.error('Delete friend error:', error);
                        console.error('Response status:', response.status);
                        console.error('Response text:', await response.text());
                        Alert.alert('Fehler', 'Konnte Freund nicht löschen');
                    }
                },
            },
        ]);
    };
    const loadFriends = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) return;

            const response = await fetch(`http://${getIP()}:3000/friends`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const friendsData = await response.json();
            setFriends(friendsData || []);
            console.log('Friends loaded:', friendsData);

        } catch (error) {
            console.error('Load friends error:', error);
        }
    };

    const renderFriend = ({ item }: { item: Friend }) => (
        <View>
            <View className="flex-row items-center py-4">
                {/* Placeholder Circle */}
                <View className="w-10 h-10 rounded-full bg-black mr-4" />

                {/* Name */}
                <Text className="flex-1 text-xl">{item.username}</Text>

                {/* Delete */}
                <TouchableOpacity onPress={() => handleDeleteFriend(item.id)}>
                    <Text className="text-red-600 font-bold text-lg mr-2">✕</Text>
                </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="h-px bg-black" />
        </View>
    );

    type PendingRequest = {
        id: string;
        friendcode: string;
    };

    const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);

    const loadPendingRequests = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) return;

            const response = await fetch(`http://${getIP()}:3000/friends/requests/incoming`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            setPendingRequests(data || []);
        } catch (error) {
            console.error('Load pending requests error:', error);
        }
    };

    const handleAcceptRequest = async (requestId: string) => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) {
                Alert.alert('Fehler', 'Kein Token gefunden');
                return;
            }

            const response = await fetch(`http://${getIP()}:3000/friends/requests/respond`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestId: requestId,
                    accept: true
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            loadPendingRequests();

        } catch (error) {
            console.error('Accept error:', error);
            Alert.alert('Fehler', 'Konnte Anfrage nicht bestätigen');
        }
    };

    const handleRejectRequest = async (requestId: string) => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) {
                Alert.alert('Fehler', 'Kein Token gefunden');
                return;
            }

            const response = await fetch(`http://${getIP()}:3000/friends/requests/respond`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestId: requestId,
                    accept: false
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            loadPendingRequests();

        } catch (error) {
            console.error('Reject error:', error);
            Alert.alert('Fehler', 'Konnte Anfrage nicht ablehnen');
        }
    };

    const renderPendingRequest = ({ item }: { item: PendingRequest }) => (
        <View className="bg-yellow-50 p-4 rounded-xl mb-2 border border-yellow-200">
            <View className="flex-row items-center justify-between">
                {/* Request Info */}
                <View className="flex-1">
                    <View className="w-12 h-12 rounded-full bg-yellow-400 mr-4 items-center justify-center">
                        <Text className="text-white font-bold text-lg">?</Text>
                    </View>
                    <Text className="text-lg font-semibold ml-2">{item.friendcode}</Text>
                    <Text className="text-sm text-gray-500 ml-2">wants to be your friend</Text>
                </View>

                {/* Buttons */}
                <View className="flex-row space-x-2">
                    <TouchableOpacity
                        className="bg-green-500 px-6 py-3 rounded-xl items-center"
                        onPress={() => handleAcceptRequest(item.id)}
                    >
                        <Text className="text-white font-semibold">✓ Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-red-500 px-6 py-3 rounded-xl items-center"
                        onPress={() => handleRejectRequest(item.id)}
                    >
                        <Text className="text-white font-semibold">✗ Reject</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    useEffect(() => {
        loadPendingRequests();
    }, []);

    useEffect(() => {
        loadFriends();
    }, []);

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

                {/* Friends requests */}
                {pendingRequests.length === 0 ? (
                    <View className="flex-1 justify-center items-center">
                    </View>
                ) : (
                    <FlatList
                        data={pendingRequests}
                        keyExtractor={(item) => item.id}
                        renderItem={renderPendingRequest}
                        className="flex-1"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )}


                {/* Friends List */}
                {friends.length === 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-gray-500 text-2xl text-center">
                            You have no friends :(
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
                            <Text className="font-semibold">Add Friends</Text>
                        </TouchableOpacity>

                        {friendcodeOpen && (
                            <View className="absolute bottom-14 left-0 right-0 bg-white rounded-2xl px-4 py-3 shadow-lg border">
                                <Text className="text-sm mb-1">Enter Friendcode</Text>

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