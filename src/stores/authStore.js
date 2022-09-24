import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';
import { router } from '@/router'
import axios from 'axios';


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        modal: false,
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null,
        token: ''
    }),
    actions: {

        async login(username, password) {

            const user=await axios.post(`${baseUrl}/auth/signin`, { username, password })
            if (user) {

                // update pinia state
                this.user = user.data.username;
                this.token = user.data.token
                
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token',user.data.token)

                
                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/inicio');
            } else {



            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        },
        modalShow() {
            this.modal = true
        },
        sideModal() {
            this.modal = false
        }
    }
});
