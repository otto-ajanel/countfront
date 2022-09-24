import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/users/all`;
const opciones={
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization': localStorage.getItem("token")
    }
  }

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({

        
        users: [],
        userEdit:{
            idEdit:12,
            username:"OTOTO",
            rol:4,
            password:"5"
        }
    }),
    actions: {
        async getAll() {

            await axios.get(baseUrl)
                .then(users => {
                   
                    this.users = users.data.data
                })
                .catch(error => this.users = { error })
        },
        async getUserById(idEdit){
            
            await axios.get(`${import.meta.env.VITE_API_URL}/user/${idEdit}`,opciones)
            .then(user => {
               
                this.userEdit = user.data.data
                
            })
            .catch(error => console.log(error))
    },
    getters:{
         getuser(id){
            this.getUserById(id)
         }
    }
}

    
});
