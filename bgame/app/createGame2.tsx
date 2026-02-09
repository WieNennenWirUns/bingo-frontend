// app/(app)/createGame2.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';


export default function CreateGame2() {
    const { gameName, boardSize } = useLocalSearchParams();

    const size = parseInt(boardSize as string);
    const totalFields = size * size;

    const [fields, setFields] = useState<string[]>([]);

    useEffect(() => {
        setFields(new Array(totalFields).fill(''));
    }, [totalFields]);

    const updateField = (index: number, value: string) => {
        const newFields = [...fields];
        newFields[index] = value;
        setFields(newFields);
    };

    const handleNext = () => {
        router.push({
            pathname: '/createGame3',
            params: {
                gameName: gameName as string,
                boardSize: boardSize as string,
                fields: JSON.stringify(fields)
            }
        });
    };

    const renderField = ({ item, index }: { item: string; index: number }) => (
        <View className="mb-3 last:mb-0">
            <TextInput
                className="w-full p-4 border border-gray-300 rounded-xl bg-white text-base"
                placeholder={`Field ${index + 1}`}
                placeholderTextColor="#9CA3AF"
                value={item}
                onChangeText={(text) => updateField(index, text)}
                maxLength={20}
            />
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Fixer Header */}
            <View className="px-5 pt-5 pb-4">
                <View className="mb-6">
                    <Text className="text-center text-3xl font-bold mb-2">Create Game</Text>
                    <View className="h-px bg-gray-300 mx-0" />
                </View>

                <View className="flex-row items-center justify-between w-full px-6 my-4">

                    <View className="w-8 h-8 rounded-full bg-green-300 border border-black" />
                    <View className="w-28 h-px bg-gray-300 mx-2" />

                    <View className="w-10 h-10 rounded-full bg-black" />
                    <View className="w-28 h-px bg-gray-300 mx-0" />

                    <View className="w-8 h-8 rounded-full bg-gray-300 border border-black" />
                </View>

                <View className="mb-4">
                    <Text className="text-lg font-semibold mb-2">Setup your {boardSize} board:</Text>
                    <Text className="text-sm text-gray-500">
                        ({totalFields} Felder ausfüllen)
                    </Text>
                </View>
            </View>

            {/* Scrollbare Felder mit FlatList */}
            <View className="flex-1 px-5">
                <View className="p-6 border border-gray-300 rounded-xl bg-white mb-6">
                    <FlatList
                        data={fields}
                        renderItem={({ item, index }) => renderField({ item, index })}
                        keyExtractor={(_, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        keyboardShouldPersistTaps="handled"
                    />
                </View>
            </View>

            {/* Fixer Next Button - IMMER SICHTBAR */}
            <View className="px-5 pb-5">
                <TouchableOpacity
                    className="w-full bg-green-400 p-5 rounded-2xl border items-center mt-8"
                    onPress={handleNext}
                >
                    <Text className="text-black text-xl font-bold">Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
