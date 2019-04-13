<template>
    <div style="background-color:#FFFAF0;">
    <br/><br/>
    <div class="recipename">
    <h1 class="double">{{info.data.name}}</h1>
    </div>
    <br/><br/>
    <div v-for="img of this.info.data.images" v-bind:key=img.id>
            <img class="ui medium rounded image" id='image' :src='img.imageUrlsBySize["360"]'  style="width:45%"/>
    </div>
    <!--show time for preparation-->
    <div class="text">
    <h1>Cooking Time</h1>
    <ul>{{info.data.totalTime}}<br/></ul>
    <!--Show ingredient-->
    <h1>Ingredient</h1>
    <ul>
    <div v-for="ingre of info.data.ingredientLines" v-bind:key= ingre.id>
        <p>{{ingre}}</p>
    </div>
    </ul>
    <!--Show nutrition-->
    <h1>Nutrition Units</h1>
    <ul>
    <div v-for="nutri of info.data.nutritionEstimates" v-bind:key="nutri.id">
        <div v-if="nutri.attribute === 'PROCNT'">
            Protein = {{nutri.value}}   {{nutri.unit.pluralAbbreviation}}
        </div>
        <div v-if="nutri.attribute === 'CHOCDF'">
            Carbohydrate = {{nutri.value}}   {{nutri.unit.pluralAbbreviation}}
        </div>
        <div v-if="nutri.attribute === 'NA'">
            Sodium = {{nutri.value}}   {{nutri.unit.pluralAbbreviation}}
        </div>
        <div v-if="nutri.attribute === 'ENERC_KCAL'">
            Energy = {{nutri.value}}   {{nutri.unit.pluralAbbreviation}}
        </div>
        <div v-if="nutri.attribute === 'FAT'">
            Fat = {{nutri.value}}   {{nutri.unit.pluralAbbreviation}}
        </div>
        <div v-if="nutri.attribute === 'CHOLE'">
            Cholesterol = {{nutri.value}}   {{nutri.unit.pluralAbbreviation}}
        </div>
        <div v-if="nutri.attribute === 'SUGAR'">
            Sugars = {{nutri.value}}   {{nutri.unit.pluralAbbreviation}}
        </div>
        <div v-if="nutri.description === 'FIBTG'">
            Fiber = {{nutri.value}}   {{nutri.unit.pluralAbbreviation}}
        </div>
    </div>
    </ul>
    <!--Link direction-->
    <button class="ui teal button"  id="button" style="width:45%; height:25%;" v-on:click="gotoDirection(info.data.source.sourceRecipeUrl)">Read   Direction</button>
    <br/><br/>
    </div>
    </div>
</template>
<style>
.text {
    padding-left:14%;
}
.image {
    float: right;
    padding-right:15%;
}
h1.double {
    border-style: double;
    border-width: 15px;
    width:45%;
    height:25%;
    text-align: center;
}
.recipename {
    padding-left:14%;
}
.button{
    padding-left:45%;
}
</style>
<script>
// eslint-disable-next-line
/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
export default {
    name: 'detail',
    data () {
        return {
            param : [],
            info:[],
            ingredients : [],
        }
    },
    created(){
        this.param = this.$route.params.recipeId;
        //this.fetchData(this.param);  
        axios
            .get('http://api.yummly.com/v1/api/recipe/'+this.param+'?_app_id=b4c8cd6d&_app_key=28dbb92e37821d78714d98ca2e442545')
            .then(response => {(this.info = response)}) 
            .catch((err) => {
            console.log(err)
            }) 
            console.log(this.info);
    },
    methods:{
        fetchData:function(recipeId){
            axios
            .get('http://api.yummly.com/v1/api/recipe/'+recipeId+'?_app_id=b4c8cd6d&_app_key=28dbb92e37821d78714d98ca2e442545')
            .then(response => {(this.info = response)}) 
            .catch((err) => {
            console.log(err)
            }) 
            console.log(this.info);
        },
        gotoDirection:function(a){
                window.open(a, "_blank");
        }
    }
}
</script>
<style scoped>
</style>
