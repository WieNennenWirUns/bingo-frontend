import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const FILTERS = ['All', 'Finished', 'Running'] as const;
type FilterType = (typeof FILTERS)[number];

export default function HomeHeaderFilter() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<FilterType>('All');

    const toggleOpen = () => setOpen((prev) => !prev);

    const handleSelect = (value: FilterType) => {
        setSelected(value);
        setOpen(false);
        // hier später deine Filter-Logik einbauen (z.B. Boards nach Status filtern)
    };

    return (
        <View className="relative">
            {/* Button */}
            <TouchableOpacity
                className=" w-28 border border-gray-400 rounded-md px-3 py-1 bg-white z-50"
                onPress={toggleOpen}
            >
                <View className="flex-row items-center justify-between w-full px-2">
                    <Text className="text-sm font-medium flex-1 text-left">
                        {selected}
                    </Text>
                    <Text className="text-sm">
                        {open ? '▴' : '▾'}
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Dropdown-Liste */}
            {open && (
                <View className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow z-50">
                    {FILTERS.map((item) => (
                        <TouchableOpacity
                            key={item}
                            className="px-3 py-2"
                            onPress={() => handleSelect(item)}
                        >
                            <Text className={item === selected ? 'font-semibold' : ''}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}
