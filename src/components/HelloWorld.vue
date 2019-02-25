<template>
<div>
<button class="ui pink basic button" v-on:click="click()">WISH</button>
<button class="ui pink basic button" v-on:click="click1()">W</button>
<button class="ui pink basic button" v-on:click="click3()">GET</button>
<p>jam</p>
</div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// eslint-disable-next-line
/* eslint-disable */
import VueCookie from 'vue-cookie'
Vue.use(VueAxios, axios)
Vue.use(VueCookie)

export default {
  
  name: 'HelloWorld',
  data () {
    return {
      cats: [],
      newCat: null,
      a:300
    }
  },
  methods:{
    click:function(){
      event.preventDefault();
      console.log("jamm");
      this.$cookie.set('test', this.a, 1);
    },
      click1:function(){
      console.log("jamm1");
      this.$cookie.delete('test');
    },
    click3:function(){
      console.log(this.$cookie.get('test'));
    },
    click4:function(){console.log("jams");},
    fetch:function(){
      axios.get('http://api.yummly.com/v1/api/recipe/'+'Fabulous-French-Onion-Soup-2475400'+'?_app_id=b4c8cd6d&_app_key=28dbb92e37821d78714d98ca2e442545')
      .then((response) => {(this.info = response)}) 
      console.log(this.info);
    }
  },
}
</script>
<style>
</style>
