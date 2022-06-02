import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

axios.defaults.baseURL = store.state.backend_domain
axios.defaults.headers.common = {'Authorization': `bearer ${store.getters.getAccessToken}`}

app.use(router)
app.use(store)
app.use(VueAxios, axios)


app.mount("#app")

