import axios from 'axios';


const instance = axios.create({
   baseURL: 'https://burger-builder-e47ff.firebaseio.com/'
});


export default instance;