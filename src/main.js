import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from './router/routes';

const app = createApp(App)

app.use(VueSweetalert2);
app.use(router);


app.mount('#app');
