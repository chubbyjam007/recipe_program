<template>
<div>
        <!--Recipe id
        <h1>{{param}}</h1>-->
        <!--Recipe name-->
        <h1>{{info.data.name}}</h1>
        <!--picture-->
        <ul>
        <div v-for="img of this.info.data.images" v-bind:key=img.id>
            <img class='image' :src='img.imageUrlsBySize["360"]'  style="width:25%"/>
        </div>
        </ul>
        <!--show time for preparation-->
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
        <h1>Direction</h1>
        <ul><p>{{info.data.source.sourceRecipeUrl}}</p></ul>
        </div>
</template>

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
        }
    }
}
</script>
<style scoped>
</style>
