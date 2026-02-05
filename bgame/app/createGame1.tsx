// app/(app)/createGame1.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type BoardSize = '3x3' | '4x4' | '5x5' | '6x6' | '7x7';

export default function CreateGame1() {
    const [gameName, setGameName] = useState('');
    const [selectedSize, setSelectedSize] = useState<BoardSize>('5x5'); // Default 5x5

    const boardSizes: BoardSize[] = ['3x3', '4x4', '5x5', '6x6', '7x7'];

    const handleNext = () => {
        if (!gameName.trim()) {
            alert('Bitte gib einen Namen für das Spiel ein.');
            return;
        }

        // Board-Größe mitnehmen zu createGame2
        router.push({
            pathname: '/createGame2',
            params: {
                gameName,
                boardSize: selectedSize
            }
        });
    };

    const selectBoardSize = (size: BoardSize) => {
        setSelectedSize(size);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 20 }}
                keyboardShouldPersistTaps="handled"
            >

                {/* Titel + Horizontaler Strich */}
                <View className="mb-6">
                    <Text className="text-center text-3xl font-bold mb-2">Create Game</Text>
                    {/* Horizontaler Strich - gleicher Abstand wie andere Boxen */}
                    <View className="h-px bg-black mx-0" />
                </View>

                {/* Tab-Buttons */}
                <View className="flex-row mb-8">
                    <TouchableOpacity className="px-6 py-3 bg-blue-500 rounded-t-xl mr-1">
                        <Text className="text-white font-semibold">General Setup</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-6 py-3 border border-gray-300 rounded-t-xl mr-1 opacity-50">
                        <Text className="text-gray-500">Setup Fields</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-6 py-3 border border-gray-300 rounded-t-xl opacity-50">
                        <Text className="text-gray-500">Invite Members</Text>
                    </TouchableOpacity>
                </View>

                {/* Game Name Input */}
                <View className="mb-8">
                    <TextInput
                        className="w-full p-4 border border-black rounded-xl text-lg"
                        placeholder="Enter Name"
                        placeholderTextColor="#9CA3AF"
                        value={gameName}
                        onChangeText={setGameName}
                    />
                </View>

                {/* Board Size Selection: Ich hab keinen Bock mehr mache ich morgen */}
                <View className="mb-8">
                    <Text className="text-lg font-semibold mb-3">Select Board Size</Text>
                    <View className="w-full p-6 border border-black rounded-xl bg-white">
                        <View className="flex-row flex-wrap justify-center gap-2">
                            {boardSizes.map((size) => (
                                <TouchableOpacity
                                    key={size}
                                    className={`w-16 h-16 border-2 rounded-lg items-center justify-center ${
                                        selectedSize === size
                                            ? 'bg-blue-500 border-blue-500'
                                            : 'bg-white border-gray-300'
                                    }`}
                                    onPress={() => selectBoardSize(size)}
                                >
                                    <Text className={`font-bold ${
                                        selectedSize === size ? 'text-white text-lg' : 'text-gray-800'
                                    }`}>
                                        {size}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Next Button */}
                <TouchableOpacity
                    className="w-full bg-green-400 p-5 rounded-2xl border items-center mt-8"
                    onPress={handleNext}
                >
                    <Text className="text-black text-xl">Next</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

