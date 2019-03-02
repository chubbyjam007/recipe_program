<template>
    <div>
        <!-- Search ingredient-->
        <script type="text/x-template" id="modal-template">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <div class="modal-header">
                                <slot name="header">
                                    default header
                                </slot>
                            </div>
                            <div class="modal-body">
                                <slot name="body">
                                    default body
                                </slot>
                            </div>
                            <div class="modal-footer">
                                <slot name="footer">
                                    <button class="ui primary button" @click="$emit('close')">CLOSE</button>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </script>
        <div class="ui inverted segment">
            <div class="ui inverted left icon input">
                <input v-model="ingredient" v-on:keyup.enter="split()">
                <i class="search icon"></i>
            </div>
        </div>
        <!--Modal-->
        <!--<button id="show-modal" @click="showModal = true">Fillter</button>-->
            <!-- use the modal component, pass in the prop -->
        <!--++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
        <!--Show ingredient-->
        <!--<h1>{{ingredient}}</h1>-->
        <!--++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
        <!--check is empty-->
        <!--{{wish}}
        {{this.list}}-->
        <!--<ul><button class="ui inverted orange button" v-on:click="gotoList()">Wish List</button></ul>-->
        <div v-if="info.data.matches==0">
            {{empty()}}
            <!--{{gotoMatch(splitingredient)}}-->
        </div>
        <modal v-if="showModal" @close="showModal = false">
        <!--you can use custom content here to overwrite default content-->
        <h3 slot="header">Filter</h3>
        <div slot="body">
        <!--Select cuisine-->
            <ul>
                <p class="description">Cuisine
                    <select v-model="selectedCuisine">
                        <option v-for="cuisine in cuisines" v-bind:value="cuisine.value"  v-bind:key= cuisine.value v-on:click="split()">
                            {{cuisine.text }}
                        </option>
                    </select>
                </p>
                <p class="description">Cooking time
                    <select v-model="selectedTime">
                        <option v-for="time in filterTime" v-bind:value="time.value"  v-bind:key= time.value v-on:click="split()">
                            {{time.text }}
                        </option>
                    </select>
                </p>
            </ul>
            <!--++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
            <!--++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
            <ul>
                <div>
                <p class="description">Nutrition units</p>
                <p class="description1">Carbohydrate:</p><input v-model="carb_min" placeholder="minimum"> <input v-model="carb_max" placeholder="maximum">
                <p class="description1">Cholesterrol:</p><input v-model="choles_min" placeholder="minimum"> <input v-model="choles_max" placeholder="maximum">
                <p class="description1">Sugar:</p><input v-model="sugar_min" placeholder="minimum"> <input v-model="sugar_max" placeholder="maximum">
                <p class="description1">Energy:</p><input v-model="energy_min" placeholder="minimum"> <input v-model="energy_max" placeholder="maximum">
                <p class="description1">Fat:</p><input v-model="fat_min" placeholder="minimum"> <input v-model="fat_max" placeholder="maximum">
                <p class="description1">Fiber:</p><input v-model="fiber_min" placeholder="minimum"> <input v-model="fiber_max" placeholder="maximum">
                <p class="description1">Protein:</p><input v-model="protein_min" placeholder="minimum"> <input v-model="protein_max" placeholder="maximum">
                <p class="description1">Sodium:</p><input v-model="sodium_min" placeholder="minimum"> <input v-model="sodium_max" placeholder="maximum">
                <br/><br/>
                </div>
                <ul><div class="blue ui buttons">
                    <button class="ui button active" v-on:click="saveCookies()">
                        SAVE
                    </button>
                </div></ul>
            </ul>
            </div>
        </modal>
        <!--Menu-->
        <div class="ui vertical menu">
            <div class="item">
                <div class="header">Fillter & Nutrition unit</div>
                <div class="menu">
                    <a class="item" id="show-modal" @click="showModal = true">Fillter</a>
                </div>
            </div>
            <div class="item">
                <div class="header">Sort by</div>
                <div class="menu">
                    <a class="item" v-on:click="sortTime()">Cooking Time</a>
                    <a class="item"><input type="checkbox" v-on:click="sortTime()"> Cooking Time</a>
                    <a class="item"><input type="checkbox" v-on:click="sortRating()"> Rating</a>
                    <a class="item">Dedicated</a>
                </div>
            </div>
            <div class="item">
                <div class="header">Compare</div>
                <div class="menu">
                    <a class="item" v-on:click="gotoList()">compare</a>
                </div>
            </div>
            {{wish}}
            {{this.list}}
            {{info_2=info}}
            {{info_3=info}}
        </div>
        <!--show menu-->
        <div v-if="info.data.matches!=0">
            <div v-if="sort_time==true && sort_rating==false">
                <div class='row'>
                    <div v-for="menu in sortedTime(info_2.data.matches)" v-bind:key= menu.id>
                        <div class='column'>
                            <div class="ui link cards">
                                <div class="card">
                                    <div class="image">
                                        <div class="image" v-on:click="gotoDetail(menu.id)">
                                            <img class='image' :src='picture(menu.imageUrlsBySize["90"])' style="width:100%"/>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <!--<div class="header">{{menu.recipeName}}</div>-->
                                        <div class="header">{{menu.recipeName.substring(0,20)+"..."}}</div>
                                        <div class="meta">
                                            <a>Rating : {{menu.rating}}</a>
                                        </div>
                                        <div class="description">
                                            <div v-if="menu.totalTimeInSeconds<3600">
                                                cooking time :  {{Math.floor(menu.totalTimeInSeconds/60)}} minutes
                                            </div>
                                            <div v-if="menu.totalTimeInSeconds>=3600">
                                                cooking time :  {{Math.floor(menu.totalTimeInSeconds/3600)}} hours
                                            </div>
                                        </div>
                                    </div>
                                    <div class="extra content">
                                        <span class="right floated">
                                            <button class="ui inverted orange button" :disabled="dis[menu.id]===true" v-on:click="wishList(menu.id);dis[menu.id]=true">WISH</button>
                                            <!--<button class="ui pink basic button" :disabled="dis[menu.id]===true" v-on:click="wishList(menu.id);dis[menu.id]=true">WISH</button>-->
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="sort_time==false && sort_rating==true">
                <div class='row'>
                    <div v-for="menu in sortedRating(info_3.data.matches)" v-bind:key= menu.id>
                        <div class='column'>
                            <div class="ui link cards">
                                <div class="card">
                                    <div class="image">
                                        <div class="image" v-on:click="gotoDetail(menu.id)">
                                            <img class='image' :src='picture(menu.imageUrlsBySize["90"])' style="width:100%"/>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <!--<div class="header">{{menu.recipeName}}</div>-->
                                        <div class="header">{{menu.recipeName.substring(0,20)+"..."}}</div>
                                        <div class="meta">
                                            <a>Rating : {{menu.rating}}+aaaaa</a>
                                        </div>
                                        <div class="description">
                                            <div v-if="menu.totalTimeInSeconds<3600">
                                                cooking time :  {{Math.floor(menu.totalTimeInSeconds/60)}} minutes
                                            </div>
                                            <div v-if="menu.totalTimeInSeconds>=3600">
                                                cooking time :  {{Math.floor(menu.totalTimeInSeconds/3600)}} hours
                                            </div>
                                        </div>
                                    </div>
                                    <div class="extra content">
                                        <span class="right floated">
                                            <button class="ui inverted orange button" :disabled="dis[menu.id]===true" v-on:click="wishList(menu.id);dis[menu.id]=true">WISH</button>
                                            <!--<button class="ui pink basic button" :disabled="dis[menu.id]===true" v-on:click="wishList(menu.id);dis[menu.id]=true">WISH</button>-->
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="sort_time==false && sort_rating==false">
                <div class='row'>
                    <div v-for="menu of info.data.matches" v-bind:key= menu.id>
                        <div class='column'>
                            <div class="ui link cards">
                                <div class="card">
                                    <div class="image">
                                        <div class="image" v-on:click="gotoDetail(menu.id)">
                                            <img class='image' :src='picture(menu.imageUrlsBySize["90"])' style="width:100%"/>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <!--<div class="header">{{menu.recipeName}}</div>-->
                                        <div class="header">{{menu.recipeName.substring(0,20)+"..."}}</div>
                                        <div class="meta">
                                            <a>Rating : {{menu.rating}}+jam</a>
                                        </div>
                                        <div class="description">
                                            <div v-if="menu.totalTimeInSeconds<3600">
                                                cooking time :  {{Math.floor(menu.totalTimeInSeconds/60)}} minutes
                                            </div>
                                            <div v-if="menu.totalTimeInSeconds>=3600">
                                                cooking time :  {{Math.floor(menu.totalTimeInSeconds/3600)}} hours
                                            </div>
                                        </div>
                                    </div>
                                    <div class="extra content">
                                        <span class="right floated">
                                            <button class="ui inverted orange button" :disabled="dis[menu.id]===true" v-on:click="wishList(menu.id);dis[menu.id]=true">WISH</button>
                                            <!--<button class="ui pink basic button" :disabled="dis[menu.id]===true" v-on:click="wishList(menu.id);dis[menu.id]=true">WISH</button>-->
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!--++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
</template>

<style>
.image{
}
* {
    box-sizing: border-box;
}
.column {
    float: left;
    width: 25%;
    padding: 10px;
}

/* Clearfix (clear floats) */
.row::after {
    content: "";
    clear: both;
    display: table;
}
.hide{
display:none;
}
/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media screen and (max-width: 500px) {
    .column {
        width: 100%;
    }
}
/*Modal*/
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 500px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}
.modal-footer{
    margin-left: 300px;
}

.modal-default-button {
    float: right;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
.description{
    color: #FF8C00;
    font-weight: bold;
    font-size: 125%;
}
.description1{
    color: #3CB371;
}
</style>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
// eslint-disable-next-line
/* eslint-disable */
Vue.use(VueCookie)
Vue.component('modal', {
    template: '#modal-template'
})
Vue.use(VueAxios, axios)
    export default {
        name: 'mycomponent',
        data () {
            return {
                sort_time:false,
                sort_rating:false,
                cookies_status:false,
                showModal: false,
                dis:{},
                disabled: false,
                info: [],
                info_2: [],
                a:[],
                ingredient :[],
                splitingredient:[],
                selectedCuisine: null,
                selectedTime: null,
                energy:null,
                energy_min:0,
                energy_max:1000,
                sugar:null,
                sugar_min:0,
                sugar_max:1000,
                fiber:null,
                fiber_min:0,
                fiber_max:1000,
                protein:null,
                protein_min:0,
                protein_max:1000,
                carb:null,
                carb_min:0,
                carb_max:1000,
                choles:null,
                choles_min:0,
                choles_max:1000,
                fat:null,
                fat_min:0,
                fat_max:1000,
                sodium:null,
                sodium_min:0,
                sodium_max:1000,
                cuisines: [
                    { text: "American", value: 'american' },
                    { text: 'Asian', value: 'asian' },
                    { text: 'Italian', value: 'italian' },
                    { text: 'Barbecue', value: 'barbecue' },
                    { text: 'Cajun & Creole', value: 'cajun&creole' },
                    { text: 'Chinese', value: 'chinese' },
                    { text: 'Cuban', value: 'cuban' },
                    { text: 'English', value: 'english' },
                    { text: 'French', value: 'french' },
                    { text: 'German', value: 'german' },
                    { text: 'Greek', value: 'greek' },
                    { text: 'Hawaiin', value: 'hawaiin' },
                    { text: 'Hungarian', value: 'hungarian' },
                    { text: 'Indian', value: 'indian' },
                    { text: 'Irish', value: 'irish' },
                    { text: 'Japanese', value: 'japanese' },
                    { text: 'Mediterranean', value: 'mediterranean' },
                    { text: 'Mexican', value: 'mexican' },
                    { text: 'Moroccan', value: 'moroccan' },
                    { text: 'Portugese', value: 'portugese' },
                    { text: 'Spanish', value: 'spanish' },
                    { text: 'Swedish', value: 'swedish' },
                    { text: 'Southern & Soul Food', value: 'southern&soul' },
                    { text: 'Southwestern', value: 'southwestern' },
                    { text: 'Thai', value: 'Thai' },
                ],
                filterTime:[
                    { text: "less than 15 minutes", value: 900 },
                    { text: "less than 30 minutes ", value: 1800 },
                    { text: "less than 40 minutes", value: 2400 },
                    { text: "less than 1 hour", value: 3600 },
                ],
                wish:[],
                list:"",
                lastList:""
            }
        },
        created (){
            //this.fetchData(this.ingredient)
            axios
                .get('http://api.yummly.com/v1/api/recipes?_app_id=b4c8cd6d&_app_key=28dbb92e37821d78714d98ca2e442545&q='+'onion+soup'+'&maxResult=8&start=1'
                )
                .then(response => {(this.info = response)}) 
                .catch((err) => {
                    console.log(err)
                })
            this.checkCookies();
        },
        methods:{
            sortedTime: function(arr) {
                return arr.slice().sort(function(a, b) {
                return a.totalTimeInSeconds - b.totalTimeInSeconds;
                });
            },
            sortedRating: function(arr) {
                return arr.slice().sort(function(a, b) {
                return b.rating - a.rating;
                });
            },
            picture:function(urlImg){
                var res = urlImg.replace('90', '250');
                return res
            },
            fetchData:function(ingredient){
                axios
                .get('http://api.yummly.com/v1/api/recipes?_app_id=b4c8cd6d&_app_key=28dbb92e37821d78714d98ca2e442545&q='+ingredient
                +'&allowedCuisine[]=cuisine^cuisine-'+this.selectedCuisine
                +'&maxTotalTimeInSeconds='+this.selectedTime
                +'&nutrition.SUGAR.min='+this.sugar_min+'&nutrition.SUGAR.max='+this.sugar_max
                +'&nutrition.ENERC_KCAL.min='+this.energy_min+'&nutrition.ENERC_KCAL.max='+this.energy_max
                +'&nutrition.CHOCDF.min='+this.carb_min+'&nutrition.CHOCDF.max='+this.carb_max
                +'&nutrition.CHOLE.min='+this.choles_min+'&nutrition.CHOLE.max='+this.choles_max
                +'&nutrition.FAT.min='+this.fat_min+'&nutrition.FAT.max='+this.fat_max
                +'&nutrition.FIBTG.min='+this.fiber_min+'&nutrition.FIBTG.max='+this.fiber_max
                +'&nutrition.PROCNT.min='+this.protein_min+'&nutrition.PROCNT.max='+this.protein_max
                +'&nutrition.NA.min='+this.sodium_min+'&nutrition.NA.max='+this.sodium_max
                +'&maxResult=8&start=1'
                )
                .then(response => {(this.info = response);
                console.log(this.info_2.data.matches);
                console.log("...");
                console.log(this.info.data.matches);}) 
                .catch((err) => {
                console.log(err)
                })
                console.log("info2");
                //this.sort_time=!this.sort_time;
                //console.log(this.info_2.data.matches);
                //this.fetchData(this.info.data.matches)
            },
            empty:function(event){
                alert('Sorry we not found match ingredient');
                this.gotoSelect(this.splitingredient);
                console.log(this.info.data.matches);
                //console.log(this.splitingredient);
            },
            split:function(){
                var str=this.ingredient;
                var str1=this.ingredient;
                this.splitingredient=str.split(/[+]+/);
                this.fetchData(this.ingredient);
                console.log(this.ingredient);
                //this.a=str1.replace(/\s/g,'%20');
                //this.fetchData(this.a);
            },
            gotoDetail:function(recipeid){
                //this.$router.push('/detail/' + recipename)
                let routeData = this.$router.resolve({name:'detail', params: {recipeId:recipeid}});
                window.open(routeData.href, '_blank');
                //this.$router.push({ name: 'detail', params: {recipeId:recipeid}});
            },
            gotoSelect:function(split){
                //let routeData = this.$router.resolve({name:'SelectIngredient', params: {ingredients:split}});
                //window.open(routeData.href, '_blank');
                this.$router.push({ name: 'SelectIngredient', params: {ingredients:split}});
            },
            gotoList:function(){
                //console.log(this.list);
                //this.$router.push({ name: 'List', params: {list:l}});
                if(this.wish.length>1 && this.wish.length==2){
                    let routeData = this.$router.resolve({name:'TwoList', params:  {lt:this.list}});
                    window.open(routeData.href, '_blank');
                    var count =this.wish.length
                    for(var i = 0; i < count; i++){
                        console.log(this.wish[i]);
                        this.dis[this.wish[i]]= false;
                    }
                    this.list="";
                    this.wish=[];
                    this.lastList="";
                }
                else if(this.wish.length>1 && this.wish.length>2){
                    let routeData = this.$router.resolve({name:'List', params:  {l:this.list}});
                    window.open(routeData.href, '_blank');
                    var count =this.wish.length
                    for(var i = 0; i < count; i++){
                        console.log(this.wish[i]);
                        this.dis[this.wish[i]]= false;
                    }
                    this.dis[this.lastList]= false;
                    this.list="";
                    this.wish=[];
                    this.lastList="";
                }
            },
            wishList:function(a){
                //console.log(this.dis[a]);
                if(this.wish.length<3){
                    this.wish.push(a);
                    this.list = this.wish.join(",");
                    // console.log(this.wish);
                }
                else
                {
                    alert("Wish List is full");
                    this.lastList = a;
                }
            },
            saveCookies:function(){
                this.$cookie.set('carb_min', this.carb_min, 1);
                this.$cookie.set('carb_max', this.carb_max, 1);
                this.$cookie.set('choles_min', this.choles_min, 1);
                this.$cookie.set('choles_max', this.choles_max, 1);
                this.$cookie.set('sugar_min', this.sugar_min, 1);
                this.$cookie.set('sugar_max', this.sugar_max, 1);
                this.$cookie.set('energy_min', this.energy_min, 1);
                this.$cookie.set('energy_max', this.energy_max, 1);
                this.$cookie.set('fat_min', this.fat_min, 1);
                this.$cookie.set('fat_max', this.fat_max, 1);
                this.$cookie.set('fiber_min', this.fiber_min, 1);
                this.$cookie.set('fiber_max', this.fiber_max, 1);
                this.$cookie.set('protein_min', this.protein_min, 1);
                this.$cookie.set('protein_max', this.protein_max, 1);
                this.$cookie.set('sodium_min', this.sodium_min, 1);
                this.$cookie.set('sodium_max', this.sodium_max, 1);
            },
            checkCookies:function(){
                for(var i=0;i<8;i++){
                    if(this.$cookie.get('carb_min') !=null || this.$cookie.get('carb_max') !=null){
                        if(this.$cookie.get('carb_max') !=null){
                            this.carb_max=this.$cookie.get('carb_max');
                        } 
                        this.carb_min=this.$cookie.get('carb_min');
                    }
                    if(this.$cookie.get('choles_min') !=null || this.$cookie.get('choles_max') !=null){
                        if(this.$cookie.get('choles_max') !=null){
                            this.choles_max=this.$cookie.get('choles_max');
                        }
                        this.choles_min=this.$cookie.get('choles_min');
                    }
                    if(this.$cookie.get('sugar_min') !=null || this.$cookie.get('sugar_max') !=null){
                        if(this.$cookie.get('sugar_max') !=null){
                            this.sugar_max=this.$cookie.get('sugar_max');
                        }
                        this.sugar_min=this.$cookie.get('sugar_min');
                    }
                    if(this.$cookie.get('energy_min') !=null || this.$cookie.get('energy_max') !=null){
                        if(this.$cookie.get('energy_max') !=null){
                            this.energy_max=this.$cookie.get('energy_max');
                        }
                        this.energy_min=this.$cookie.get('energy_min');
                    }
                    if(this.$cookie.get('fat_min') !=null || this.$cookie.get('fat_max') !=null){
                        if(this.$cookie.get('fat_max') !=null){
                            this.fat_max=this.$cookie.get('fat_max');
                        }
                        this.fat_min=this.$cookie.get('fat_min');
                    }
                    if(this.$cookie.get('fiber_min') !=null || this.$cookie.get('fiber_max') !=null){
                        if(this.$cookie.get('fiber_max') !=null){
                            this.fiber_max=this.$cookie.get('fiber_max');
                        }
                        this.fiber_min=this.$cookie.get('fiber_min');
                    }
                    if(this.$cookie.get('protein_min') !=null || this.$cookie.get('protein_max') !=null){
                        if(this.$cookie.get('protein_max') !=null){
                            this.protein_max=this.$cookie.get('protein_max');
                        }
                        this.protein_min=this.$cookie.get('protein_min');
                    }
                    if(this.$cookie.get('sodium_min') !=null || this.$cookie.get('sodium_max') !=null){
                        if(this.$cookie.get('sodium_max') !=null){
                            this.sodium_max=this.$cookie.get('sodium_max');
                        }
                        this.sodium_min=this.$cookie.get('sodium_min');
                    }
                }
            },
            sortTime:function(){
                this.sort_time=!this.sort_time;
            },
            sortRating:function(){
                this.sort_rating=!this.sort_rating;
            }
        }
    }
</script>

