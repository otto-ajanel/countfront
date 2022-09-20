import { useAuthStore } from '@/stores';
import axios from 'axios';
export const fetchWrapper = async (url,body)=>{
    const user=await axios.post(url,body)
    return user
}
  
