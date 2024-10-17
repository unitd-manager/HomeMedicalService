import axios from 'axios'

const api = axios.create({
baseURL: 'https://homeservices.unitdtechnologies.com:2034',

});


// const loginApi = axios.create({
//   baseURL: 'https://art-cause.com:3003'
// });


export default api