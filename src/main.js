import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import axios from 'axios';
import Chart from 'chart.js';
import VueChartkick from 'vue-chartkick';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/index.js';
import VueFormGeneratorElement from 'vue-form-generator-element';

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });
Vue.use(VueFormGeneratorElement);
Vue.use(VueChartkick.use(Chart));
VueChartkick.options = {
  colors: ["#ef6f6c", "#465775", "#56e39f", "#59c9a5", "#5b6c5d"]
}

axios.interceptors.response.use(response =>
  response,
(error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('USER_TOKEN');
    router.push('login');
  }
  return Promise.reject(error);
});

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
