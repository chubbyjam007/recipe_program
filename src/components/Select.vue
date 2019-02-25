<template>
    <div>
        <!--<h1>{{ingredients}}</h1>-->
        <!--<p>{{info.data.matches}}</p>-->
        <h1>Match Ingredient</h1>
        <ul>
            <div v-for="t in ingredients"  v-bind:key= t>
                <input type="checkbox" :value="t" id="index" v-model="select" v-on:click="selectIngredient()">{{t}}
            </div>
        </ul>
        <!--<h1>{{select}}</h1>-->
        <br>
        <div v-if="info.data.matches==0">
            <!--{{empty()}}-->
            <h1>Not found</h1>
            <!--{{gotoMatch(splitingredient)}}-->
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
                                    <div class="header">{{menu.recipeName.substring(0,25)+"..."}}</div>
                                        <div class="meta">
                                            <a>{{menu.rating}}</a>
                                        </div>
                                        <div class="description">
                                            {{menu.totalTimeInSeconds}}
                                        </div>
                                </div>
                                <div class="extra content">
                                    <span class="right floated">
                                        <button class="ui pink basic button" v-on:click="wishList(menu.id)">WISH</button>
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
.image{
}
* {
    box-sizing: border-box;
}
.column {
    float: right;
    width: 25%;
    padding: 10px;
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
                search:[]
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
                .get('http://api.yummly.com/v1/api/recipes?_app_id=b4c8cd6d&_app_key=28dbb92e37821d78714d98ca2e442545&q='+this.search+'&maxResult=32&start=10')
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
                console.log(this.search);
                this.fetchData();
            }
            
        }
    }
</script>

