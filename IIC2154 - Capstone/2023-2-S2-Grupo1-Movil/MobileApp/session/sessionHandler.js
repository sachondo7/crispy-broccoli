import AsyncStorage from '@react-native-async-storage/async-storage';

const SessionHandler = {    
    async login(userId) {
        try {
        await AsyncStorage.setItem('userId', String(userId));
        } catch (error) {
        console.error('Error al guardar el ID del usuario:', error);
        }
    },
    
    async logout() {
        try {
        await AsyncStorage.removeItem('userId');
        console.log('ID del usuario eliminado');
        } catch (error) {
        console.error('Error al eliminar el ID del usuario:', error);
        }
    },
    async isLoggedIn() {
        try {
        const userId = await AsyncStorage.getItem('userId');
        return userId !== null;
        } catch (error) {
        console.error('Error al obtener el ID del usuario:', error);
        }
    },
    async getUserId() {
        try {
        const userId = await AsyncStorage.getItem('userId');
        return userId;
        } catch (error) {
        console.error('Error al obtener el ID del usuario:', error);
        }
    },
    async saveIsAdmin(isAdmin) {
        try {
        await AsyncStorage.setItem('isAdmin', String(isAdmin));
        } catch (error) {
        console.error('Error al guardar el estado de administrador:', error);
        }
    },
    async getIsAdmin() {
        try {
        const isAdmin = await AsyncStorage.getItem('isAdmin');
        return isAdmin;
        } catch (error) {
        console.error('Error al obtener el estado de administrador:', error);
        }
    },
};

export default SessionHandler;