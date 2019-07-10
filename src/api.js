import qs from 'qs';
import axios from 'axios';
let baseurl = '';
let Ajax = axios.create({
    baseURL: baseurl
});
const API = {
    getUserList () {
        return Ajax.get('/api/data');
    }
};
export default API;