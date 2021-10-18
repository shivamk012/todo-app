import registerPage from '../components/auth/register.vue'
import loginPage from '../components/auth/login.vue'
import App from '../App.vue'

const routes = [
    {path: '/', component: registerPage },
    {path : '/login' , component : loginPage},
    {path : '/todo' , component : App}
];

export default routes;