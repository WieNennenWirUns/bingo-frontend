import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAccessToken() {
    return await AsyncStorage.getItem('access_token');
}

export async function getRefreshToken() {
    return await AsyncStorage.getItem('refresh_token');
}
