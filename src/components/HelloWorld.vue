<template>
<div>
    <img src="../assets/adding-adult-apron-1537166.jpg" style="width:24.5%">
    <img src="../assets/food.jpg" style="width:24.5%">
    <img src="../assets/bake-bakery-baking-357627.jpg" style="width:24.5%">
    <img src="../assets/french-370108_1280.jpg" style="width:24.5%">
    <br/><br/>
    <div class="text">
        <h1>Recipe Recommendation Program</h1>
    </div>
    <!--<img src="../assets/agreement-2548138_1920.jpg" class="ui medium rounded image" id='image' style="width:45%">-->
    <div class="text">
        <ul>
            <p>Recipe Recommendation Program is program that let user search recipe from ingredients<p/>
            <p>according to your health conditions and your preference. We provide a smart helper to found the most appropriate menu including<p/>
            <h1>Filtering</h1>
            <p>Our program provide filtering that can help you specipic wanted recipe including<p/>
            <ul>
                <li>Cooking Time</li>
                <li>Cuisine</li>
                <li>Nutrition Unit</li>
            </ul>
            <h1>Sorting</h1>
            <p>Our program can sort the recipe so user can make decision easier including<p/>
            <ul>
                <li>Cooking Time</li>
                <li>Rating</li>
            </ul>
            <h1>Comparing</h1>
            <p>Our program provide comparation so you can see the difference of recipes such as amount of cooking time, ingredients, nutrition unit one by one.<p/>
        </ul>
        <ul><button class="ui orange button" style="width:50%; height:25%;" v-on:click="gotoMycomponent()">Getting  Start</button></ul>
        <br/>
    </div>
</div>
</template>
<style>
.image {
    float: right;
    padding-right:15%;
}
.text {
    padding-left:23%;
}
.button {
    padding-left:50%;
}
</style>
<script>
// eslint-disable-next-line
/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
Vue.use(VueAxios, axios)
Vue.use(VueCookie)
var elements = document.getElementsByClassName("column")
var i;
export default {
    name: 'HelloWorld',
    data () {
    return {
        cats: [],
        newCat: null,
        a:300,
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
    },
    gotoMycomponent:function(){
        this.$router.push({ name: 'mycomponent'});
    },
    two:function () {
    for (i = 0; i < elements.length; i++) {
        elements[i].style.msFlex = "50%";  // IE10
        elements[i].style.flex = "50%";
    }
    }
}}
</script>