import './assets/main.css'
import App from './App.vue'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import TheRegister from "./pages/TheRegister.vue"
import TheHome from "./pages/TheHome.vue"


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/cadastrar', component: TheRegister },
        { path: '/', component: TheHome },

    ]
});

const app = createApp(App)

app.use(router);

app.mount('#app')
                  
