import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import {router} from './router'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "../src/assets/main.css"
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
const options={
    
}
const app = createApp(App)

app.use(Antd)
app.use(Toast,options)
app.use(router)
app.use(createPinia())

app.mount('#app')
