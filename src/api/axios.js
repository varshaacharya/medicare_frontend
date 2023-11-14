import axios from 'axios';
import ApplicationStore from '../utils/localStorageUtil';
const token = ApplicationStore().getStorage('token');  
//const student_id=ApplicationStore().getStorage('student_id');  

export default axios.create({
    baseURL:'http://localhost:3006/api',
    headers: {
        'Content-Type':'application/json',
        "authorization" : `Bearer:${token}`,
        "student_id":""
    } 
});