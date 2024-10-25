import axios from 'axios'

const api = axios.create({
baseURL: 'https://homeservices.unitdtechnologies.com:2034',
//baseURL: 'http://localhost:2033'

});

export default api 