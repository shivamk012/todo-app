import {createApp} from 'vue'
import routes from './router/routes'
import {store} from './store/store'
import {createRouter , createWebHashHistory} from 'vue-router'
import landingPage from './landingPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(landingPage);
app.use(store);
app.use(router);
app.mount('#app')
