import axios from 'axios'
var myaxios = {}
myaxios.install = function(Vue){
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        if (!config.url.includes('login')){
            config.headers.Authorization = window.localStorage.getItem('token')
        }
        return config
      })
      Vue.prototype.$http = axios
}
export default myaxios