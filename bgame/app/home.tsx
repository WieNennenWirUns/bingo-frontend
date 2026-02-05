import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';
import { router } from 'expo-router';
import {SafeAreaView} from "react-native-safe-area-context";
import HomeHeaderFilter from "@/app/dropDown/HomeBingoFilter";
type Board = {
    id: string;
    title: string;
};

export default function HomeScreen() {
    const [friendcodeOpen, setFriendcodeOpen] = useState(false);
    const [friendcode, setFriendcode] = useState('');

    // später aus der DB laden – jetzt nur Platzhalter / leeres Array
    const [boards] = useState<Board[]>([]);

    const toggleFriendcode = () => {
        setFriendcodeOpen((prev) => !prev);
    };

    const handleAddFriend = () => {
        // TODO: hier später Request mit friendcode abschicken
        console.log('Friendcode:', friendcode);
    };

    const handleGoToCreateGame = () => {
        router.push('/createGame1');
    };

    const handleGoToProfile = () => {
        router.push('/profile');
    };

    const renderBoard = ({ item }: { item: Board }) => (
        <View className="w-full bg-white border border-gray-300 rounded-xl p-4 mb-3">
            <Text className="text-lg font-semibold">{item.title}</Text>
            {/* hier später weitere Infos wie Progress, aktives Datum usw. */}
        </View>
    );

    return (
        <SafeAreaView   className="flex-1 bg-white px-4 pb-4">
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
                    <FlatList //hier fehlt noch die beschreibung der Boards
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
                    <TouchableOpacity //hier muss auch noch was passieren, damit der gesamte Button funktioniert und nicht nur die Schrift, habe darauf jetzt aber keinen Bock mehr
                        onPress={toggleFriendcode}
                    >
                        <Text className="font-semibold text-center">Add Friends</Text>
                    </TouchableOpacity>

                    {friendcodeOpen && (
                        //hier muss noch was g,acht werden, damit die box nicht von der Tastatur verdeckt wird><
                        <View className="absolute bottom-12 left-0 right-0 bg-white rounded-2xl px-4 py-3 shadow-lg z-50 border">
                            <Text className="text-sm mb-1">
                                nur XXXX-XXXX (Beispiel)
                            </Text>
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
