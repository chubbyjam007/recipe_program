<template>
    <div>
        <div class="ui inverted segment">
            <div class="ui inverted left icon input">
                <h1><font color="white"><center>Match Your Ingredients</center></font></h1>
            </div>
        </div>
        <div class="sidebar">
        <div class="ui vertical menu">
            <div class="item">
                <div class="header">Compare</div>
                <div class="menu">
                    <a class="item" v-on:click="gotoList()">compare</a>
                </div>
            </div>
            {{wish}}
            {{this.list}}
            <div class="item">
                <div class="header">Match Ingredients</div>
                <div class="menu">
                    <div v-for="t in ingredients"  v-bind:key= t>
                        <ul><input type="checkbox" :value="t" id="index" v-model="select">      {{t}}</ul>
                    </div>
                    <ul><button class="ui inverted orange button" v-on:click="selectIngredient()">CHECK</button></ul>
                </div>
            </div>
        </div>
        </div>
        <div v-if="info.data.matches==0">
            {{empty()}}
        </div>
        <div v-if="info.data.matches!=0">
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
                                            <button class="ui pink basic button" :disabled="dis[menu.id]===true" v-on:click="wishList(menu.id); dis[menu.id]=true">WISH</button>
                                            <!--<button class="ui pink basic button" :disabled="dis[menu.id]===true" v-on:click="wishList(menu.id);dis[menu.id]=true">WISH</button>-->
                                        </span>
                                </div>
                            </div>
                        </div>
                        <!--<p><br><br><br><br><br><br></p>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.text {
    text-align: center;
}
.image {
}
* {
    box-sizing: border-box;
}
.column {
    float:left;
    width: 28%;
    padding-left:3%;
    padding-bottom: 3%;
    display:flex;
}

/* Clearfix (clear floats) */
.row::after {
    content: "";
    clear: both;
    display: table;
}

/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media screen and (max-width: 500px) {
    .column {
        width: 100%;
    }
}
</style>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// eslint-disable-next-line
/* eslint-disable */
Vue.use(VueAxios, axios)
    export default {
        name: 'SelectIngredient',
        data () {
            return {
                ingredients : [],
                info:[],
                checkedNames: [],
                select:[],
                search:[],
                dis:{},
                disabled: false,
                wish:[],
                list:"",
                lastList:""
            }
        },
        created(){
            this.fetchData();
            this.ingredients = this.$route.params.ingredients;
            console.log(this.ingredients);
        },
        methods:{
            fetchData:function(){
                axios
                .get('http://api.yummly.com/v1/api/recipes?_app_id=b4c8cd6d&_app_key=28dbb92e37821d78714d98ca2e442545&q='+this.search+'&maxResult=33&start=10')
                .then(response => {(this.info = response)}) 
                .catch((err) => {
                console.log(err)
                })
            },
            picture:function(urlImg){
                var res = urlImg.replace('90', '250');
                return res
            },
            gotoDetail:function(recipeid){
                //this.$router.push('/detail/' + recipename)
                this.$router.push({ name: 'detail', params: {recipeId:recipeid}});
            },
            selectIngredient: function() {
                this.search = this.select.join('+');
                console.log(this.select);
                this.fetchData();
            },
            empty:function(){
                alert('Sorry we not found match ingredient');
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
            }
        }
    }
</script>

