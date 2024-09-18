import axios from 'axios';
import {  serverapi } from '@/data/server';


export const getProfile = async () => {
    const responce = await axios.get(`${serverapi}/api/users/profile`,{withCredentials : true});
    return responce.data
}