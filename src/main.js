import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import { bootstrapPlugin } from 'bootstrap-vue-next';

const app = createApp(App).use(store).use(router);

app.use(store);
app.use(router);
app.use(bootstrapPlugin);

app.mount('#app');
