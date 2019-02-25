import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import mycomponent from '@/components/mycomponent'
import Detail from '@/components/Detail'
import Select from '@/components/Select'
import list from '@/components/List'
import listt from '@/components/TwoList'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/mycomponent',
      name: 'mycomponent',
      component: mycomponent
    },
    {
      path: '/detail/:recipeId',
      name: 'detail',
      component: Detail
    },
    {
      path: '/SelectIngredient',
      name: 'SelectIngredient',
      component: Select,
      props: true
    },
    {
      path: '/List/:l',
      name: 'List',
      component: list,
      props: true
    },
    {
      path: '/TwoList/:lt',
      name: 'TwoList',
      component: listt,
      props: true
    }
  ]
})
