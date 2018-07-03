import Vue from 'vue'
import Router from 'vue-router'
import SearchRecipe from '@/components/SearchRecipe.vue';
import axios from 'axios';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchRecipe',
      component: SearchRecipe
    }
  ]
})
