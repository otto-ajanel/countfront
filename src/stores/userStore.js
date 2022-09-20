import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/users/all`;

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: []
    }),
    actions: {
        async getAll() {

            await axios.get(baseUrl)
                .then(users => {
                   
                    this.users = users.data.data
                })
                .catch(error => this.users = { error })
        }
    }
});
