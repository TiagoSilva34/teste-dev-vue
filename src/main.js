import './assets/main.css'
import App from './App.vue'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import TheHome from "./pages/TheHome.vue"
import TheRegister from "./pages/TheRegister.vue"
import TheEditPage from "./pages/TheEditPage.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: TheHome },
        { path: '/cadastrar', component: TheRegister },
        { name: "editar", path: '/editar/:id', component: TheEditPage}
    ]
});

const app = createApp(App)

app.use(router);

app.mount('#app')
                  
