import { useAuthStore } from '@/stores';
import axios from 'axios';
export const fetchWrapper = async (url,body)=>{
    await axios.post(url,body).then(user=>{
       this.axios.defaults.headers.common['Authorization']= 'Bearer '+user.token

    })
    return user

}
  
