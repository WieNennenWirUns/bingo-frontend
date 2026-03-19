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
                <View className="flex-row items-center justify-between w-full px-6 my-4">
                    <View className="w-10 h-10 rounded-full bg-black border border-black" />
                    <View className="w-28 h-px bg-gray-300 mx-0" />

                    <View className="w-8 h-8 rounded-full bg-gray-300 border border-black" />
                    <View className="w-28 h-px bg-gray-300 mx-2" />

                    <View className="w-8 h-8 rounded-full bg-gray-300 border border-black" />
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

                    <View className="w-full p-6 border border-black rounded-xl bg-white">
                        <Text className="text-lg font-semibold mb-4 ">
                            Select Board Size:
                        </Text>
                        {/* Row 1 — 3 equal boxes */}
                        <View className="flex-row mb-3 gap-2">
                            {(['3x3', '4x4', '5x5'] as const).map((size) => (
                                <TouchableOpacity
                                    key={size}
                                    className={`flex-1 h-16 border-2 rounded-lg items-center justify-center ${
                                        selectedSize === size
                                            ? 'bg-blue-100 border-blue-100'
                                            : 'bg-white border-gray-300'
                                    }`}
                                    onPress={() => selectBoardSize(size)}
                                >
                                    <Text
                                        className={`font-bold ${
                                            selectedSize === size
                                                ? 'text-white text-lg'
                                                : 'text-gray-800'
                                        }`}
                                    >
                                        {size}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Row 2 — 2 wider boxes */}
                        <View className="flex-row gap-2">
                            {(['6x6', '7x7'] as const).map((size) => (
                                <TouchableOpacity
                                    key={size}
                                    className={`flex-1 h-16 border-2 rounded-lg items-center justify-center ${
                                        selectedSize === size
                                            ? 'bg-blue-100 border-blue-100'
                                            : 'bg-white border-gray-300'
                                    }`}
                                    onPress={() => selectBoardSize(size)}
                                >
                                    <Text
                                        className={`font-bold ${
                                            selectedSize === size
                                                ? 'text-white text-lg'
                                                : 'text-gray-800'
                                        }`}
                                    >
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