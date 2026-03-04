// app/(app)/bingoBoard.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BingoBoard() {
    const { gameName, boardSize, fields } = useLocalSearchParams();
    const parsedFields: string[] = JSON.parse(fields as string);

    const size = parseInt(boardSize as string);
    const GRID_SIZE = 320;
    const CELL_SIZE = GRID_SIZE / size;

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [completed, setCompleted] = useState<boolean[]>(
        new Array(parsedFields.length).fill(false)
    );

    const toggleDone = () => {
        if (selectedIndex === null) return;

        const copy = [...completed];
        copy[selectedIndex] = !copy[selectedIndex];
        setCompleted(copy);
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-5">

            {/* Header */}
            <View className="flex-row items-center mb-4exp">
                <TouchableOpacity onPress={() => router.replace('/home')}>
                    <Text className="text-6xl mr-4">←</Text>
                </TouchableOpacity>
                <View className="w-8" />
            </View>

            <View className="flex-row items-center mb-4">
            <Text className="flex-1 text-center text-4xl font-bold">
            {gameName}
        </Text>
        </View>
            <View className="h-px bg-gray-300" />
            <View className="py-4" />
            {/* Member Dropdown (placeholder) */}
            <TouchableOpacity className="border border-gray-300 rounded-xl p-3 mb-4">
                <Text className="text-xl font-semibold">My Bingo ▼</Text>
            </TouchableOpacity>

            <View className="py-1.5" />

            {/*should be changed to match the dropdown menu*/}
            <Text className="text-xl font-semibold mb-3">My Bingo</Text>

            {/* Bingo Grid */}
            <View
                className="border-2 border-black self-center"
                style={{ width: GRID_SIZE, height: GRID_SIZE }}
            >
                <View className="flex-row flex-wrap">
                    {parsedFields.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedIndex(index)}
                            className={`border border-gray-400 items-center justify-center ${
                                completed[index] ? 'bg-green-300' : 'bg-white'
                            }`}
                            style={{
                                width: `${100 / size}%`,
                                aspectRatio: 1,
                                height: CELL_SIZE,
                            }}
                        >
                            <Text className="font-bold">{index + 1}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Selected Field Info */}
            {selectedIndex !== null && (
                <View className="mt-6 p-4 border border-gray-300 rounded-xl bg-gray-50">
                    <Text className="font-bold text-lg mb-1">
                        #{selectedIndex + 1}
                    </Text>
                    <Text className="mb-3 text-gray-700">
                        {parsedFields[selectedIndex]}
                    </Text>

                    <TouchableOpacity
                        onPress={toggleDone}
                        className={`p-3 rounded-xl items-center ${
                            completed[selectedIndex]
                                ? 'bg-gray-300'
                                : 'bg-green-500'
                        }`}
                    >
                        <Text className="font-bold text-white">
                            {completed[selectedIndex] ? 'Undo' : 'Mark as Done ✓'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

