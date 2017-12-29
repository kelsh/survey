// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
//import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);
window.UIkit = UIkit;
Vue.config.productionTip = false
console.log( UIkit );
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
