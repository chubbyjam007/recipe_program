<template>
<div style="background-color:#FFFAF0;">
<br/>
<div style="margin-left:10%;">
    <div class="row">
        <div class="column">
            <ul v-for="img of this.info1.data.images" v-bind:key= img.id>
                <img class="ui medium rounded image" id='image' :src='img.imageUrlsBySize["360"]'  style="width:60%"/>
            </ul>
            <h1 class="double">{{info1.data.name}}</h1>
            <h1 class="dashed">Cooking Time</h1>
            <ul>{{info1.data.totalTime}}<br/></ul>
            <h1 class="dashed">Ingredient</h1>
            <ul>
                <div v-for="ingre of info1.data.ingredientLines" v-bind:key= ingre.id>
                <p>{{ingre}}</p>
                </div>
            </ul>
            <h1 class="dashed">Nutrition</h1>
            <ul>
            <div v-for="nutri of info1.data.nutritionEstimates" v-bind:key="nutri.id">
                <div v-if="nutri.attribute === 'PROCNT'">
                    <p>Protein = {{protein1 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}</p>
                </div>
                <div v-if="nutri.attribute === 'CHOCDF'">
                    Carbohydrate = {{carb1 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
                <div v-if="nutri.attribute === 'NA'">
                    Sodium = {{sodium1 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
                <div v-if="nutri.attribute === 'ENERC_KCAL'">
                    Energy = {{energy1 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
                <div v-if="nutri.attribute === 'FAT'">
                    Fat = {{fat1 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
                <div v-if="nutri.attribute === 'CHOLE'">
                    Cholesterol = {{choles1 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
                <div v-if="nutri.attribute === 'SUGAR'">
                    Sugars = {{sugar1 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
                <div v-if="nutri.attribute === 'FIBTG'">
                    Fiber = {{fiber1 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
            </div></ul><br/>
            {{set1(protein1,carb1,sodium1,energy1,fat1,choles1,sugar1,fiber1)}}
            <div v-for="nutrition in nutritions" v-bind:key="nutrition">
                <div class="lang">{{nutrition.name}}</div>
                <div class="bar">
                <div class="progress" v-bind:style = "{'background':nutrition.color, 'width':nutrition.percent+'%'}"></div>
                </div>
            </div><br/><br/>
            <!--
            <div class="foo proteinRatio">Protein</div>
            <div class="foo carbRatio">Carbohydrate</div>
            <div class="foo sodiumRatio">Sodium</div>
            <div class="foo energyRatio">Energy</div>
            <div class="foo sugarRatio">Sugar</div>
            <div class="foo cholesRatio">Cholesterol</div>
            <div class="foo fatRatio">Fat</div>
            <div class="foo fiberRatio">Fiber</div>-->
            <button class="ui teal button"  style="width:75%; height:25%;" v-on:click="gotoDirection(info1.data.source.sourceRecipeUrl)">Read   Direction</button>
            <br/><br/>
        </div>
        <div class="column">
            <ul v-for="img of this.info2.data.images" v-bind:key=img.id>
                <img class="ui medium rounded image" id='image' :src='img.imageUrlsBySize["360"]'  style="width:60%"/>
            </ul>
            <h1 class="double">{{info2.data.name}}</h1>
            <h1 class="dashed">Cooking Time</h1>
            <ul>{{info2.data.totalTime}}<br/></ul>
            <h1 class="dashed">Ingredient</h1>
            <ul>
                <div v-for="ingre of info2.data.ingredientLines" v-bind:key= ingre.id>
                <p>{{ingre}}</p>
                </div>
            </ul>
            <h1 class="dashed">Nutrition</h1>
            <ul>
            <div v-for="nutri of info2.data.nutritionEstimates" v-bind:key="nutri.id">
                <div v-if="nutri.attribute === 'PROCNT'">
                    Protein = {{protein2 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
                <div v-if="nutri.attribute === 'CHOCDF'">
                    Carbohydrate = {{carb2 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
                <div v-if="nutri.attribute === 'NA'">
                    Sodium = {{sodium2 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
                <div v-if="nutri.attribute === 'ENERC_KCAL'">
                    Energy = {{energy2 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
                <div v-if="nutri.attribute === 'FAT'">
                    Fat = {{fat2 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
                <div v-if="nutri.attribute === 'CHOLE'">
                    Cholesterol = {{choles2 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
                <div v-if="nutri.attribute === 'SUGAR'">
                    Sugars = {{sugar2 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
                <div v-if="nutri.attribute === 'FIBTG'">
                    Fiber = {{fiber2 = nutri.value}}   {{nutri.unit.pluralAbbreviation}}
                </div>
            </div></ul><br/>
            {{set2(protein2,carb2,sodium2,energy2,fat2,choles2,sugar2,fiber2)}}
            <div v-for="nutrition2 in nutritions2" v-bind:key="nutrition2">
                <div class="lang">{{nutrition2.name}}</div>
                <div class="bar">
                <div class="progress" v-bind:style = "{'background':nutrition2.color, 'width':nutrition2.percent+'%'}"></div>
                </div>
            </div>
            <br/><br/>
            <!--
            <div class="foo proteinRatiob">Protein</div>
            <div class="foo carbRatiob">Carbohydrate</div>
            <div class="foo sodiumRatiob">Sodium</div>
            <div class="foo energyRatiob">Energy</div>
            <div class="foo sugarRatiob">Sugar</div>
            <div class="foo cholesRatiob">Cholesterol</div>
            <div class="foo fatRatiob">Fat</div>
            <div class="foo fiberRatiob">Fiber</div>-->
            <button class="ui teal button" style="width:75%; height:25%;" v-on:click="gotoDirection(info2.data.source.sourceRecipeUrl)">Read   Direction</button>
            <br/><br/><br/><br/>
        </div>
    </div>
</div>
</div>
</template>
<style>
* {
    box-sizing: border-box;
}
h1.dashed {
    /*border-style: double;
    border-width: 1x;*/
    border-style: ridge;
    width:75%;
    height:20%;
    text-align: center;
}
h1.double {
    border-style: double;
    border-width: 15px;
    width:75%;
    height:25%;
    text-align: center;
}
.percent{
    float:right;
    font-weight:150;
    height:1px;
    line-height:1px;
}
.bar{
    width: 80%;
    background:#dfdfdf;
    overflow:hidden;
    padding:5px;
}
.progress{
    float:left;
    padding:10px;
}
.lang{
    margin:5px;
    font-size:15px;
}
.column {
    float: left;
    width: 50%;
    margin-left:0px;
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
@media screen and (max-width: 400px) {
    .column {
        width: 100%;
    }
}
</style>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import GraphLine3D from 'vue-graph/src/components/line3d.js'
import NoteWidget from 'vue-graph/src/widgets/note.js'
import LegendWidget from 'vue-graph/src/widgets/legends.js'
import VueGraph from 'vue-graph'
Vue.use(VueGraph)
Vue.component(GraphLine3D.name, GraphLine3D)
Vue.component(NoteWidget.name, NoteWidget)
Vue.component(LegendWidget.name, LegendWidget)
// eslint-disable-next-line
/* eslint-disable */
Vue.use(VueAxios, axios)
    export default {
        name: 'list2',
        data () {
            return {
                d:50,
                protein:0,
                carb:0,
                sodium:0,
                energy:0,
                sugar:0,
                choles:0,
                fat:0,
                fiber:0,
                protein2:0,
                carb2:0,
                sodium2:0,
                energy2:0,
                sugar2:0,
                choles2:0,
                fat2:0,
                fiber2:0,
                protein3:0,
                carb3:0,
                sodium3:0,
                energy3:0,
                sugar3:0,
                choles3:0,
                fat3:0,
                fiber3:0,
                list : "",
                b:'1',
                recipeid:[],
                info1:[],
                info2:[],
                Sugars1:0,
                Sugars2:0,
                Sugars3:0,
                Fiber1:0,
                Fiber2:0,
                Fiber3:0,
                Protein1:0,
                Protein2:0,
                Protein3:0,
                Carbohydrate1:0,
                Carbohydrate2:0,
                Carbohydrate3:0,
                Cholesterol1:0,
                Cholesterol2:0,
                Cholesterol3:0,
                Energy1:0,
                Energy2:0,
                Energy3:0,
                Fat1:0,
                Fat2:0,
                Fat3:0,
                Sodium1:0,
                Sodium2:0,
                Sodium3:0,
                names: [ "Sugars", "Fiber", "Protein","Carbohydrate","Cholesterol","Energy","Fat","Sodium" ],
                nutritions:[
                    { name:"A",     percent:90,   color:"#32CD32"	},
				    { name:"B", 	percent:76,   color:"#FF8C00"	},
				    { name:"C", 	percent:84,   color:"#FFD700"	},
				    { name:"D",	    percent:94,   color:"#DC143C"	},
					{ name:"E",	    percent:93,   color:"#A0522D"	},
                    { name:"F", 	percent:87,   color:"#8B008B"	},
                    { name:"F", 	percent:87,   color:"#00CED1"	},
                    { name:"F", 	percent:87,   color:"#0288d1"	}],
                nutritions2:[
                    { name:"A",     percent:90,   color:"#32CD32"	},
				    { name:"B", 	percent:76,   color:"#FF8C00"	},
				    { name:"C", 	percent:84,   color:"#FFD700"	},
				    { name:"D",	    percent:94,   color:"#DC143C"	},
					{ name:"E",	    percent:93,   color:"#A0522D"	},
                    { name:"F", 	percent:87,   color:"#8B008B"	},
                    { name:"F", 	percent:87,   color:"#00CED1"	},
                    { name:"F", 	percent:87,   color:"#0288d1"	}]
            }
        },
        created(){
            this.list = this.$route.params.lt;
            this.recipeid= this.list.split(/[,]+/);
            axios
            .get('http://api.yummly.com/v1/api/recipe/'+this.recipeid[0]+'?_app_id=b4c8cd6d&_app_key=28dbb92e37821d78714d98ca2e442545')
            .then(response => {(this.info1 = response)})
                //if(this.recipeid.length>1){this.fetchdata1();}
            axios
            .get('http://api.yummly.com/v1/api/recipe/'+this.recipeid[1]+'?_app_id=b4c8cd6d&_app_key=28dbb92e37821d78714d98ca2e442545')
            .then(response1 => {(this.info2 = response1)}) 
            console.log(this.recipeid.length);
            /*console.log(this.list);
            this.recipeid= this.list.split(/[,]+/);
            console.log(this.recipeid[1]);
            var count = this.recipeid.length
            this.fetch();*/
        },
        methods:{
            getvalue:function(){
                console.log("ppppppppppppppppppppppppppppp");
            },
            set1:function(protein,carb,sodium,energy,fat,choles,sugar,fiber){
                /*
                var root = document.querySelector(':root');
                root.style.setProperty('--w1',protein+"px")
                root.style.setProperty('--w2',carb/2+"px")
                root.style.setProperty('--w3',sodium+"px")
                root.style.setProperty('--w4',energy/8+"px")
                root.style.setProperty('--w5',fat+"px")
                root.style.setProperty('--w6',choles+"px")
                root.style.setProperty('--w7',sugar+"px")
                root.style.setProperty('--w8',fiber+"px")
                //console.log(s);*/
                this.nutritions[0].name = "Protein";
                this.nutritions[1].name = "Carbohydrate";
                this.nutritions[2].name = "Sodium";
                this.nutritions[3].name = "Energy";
                this.nutritions[4].name = "Fat";
                this.nutritions[5].name = "Cholesterol";
                this.nutritions[6].name = "Sugar";
                this.nutritions[7].name = "Fiber";
                this.nutritions[0].percent = protein;
                this.nutritions[1].percent = carb;
                this.nutritions[2].percent = sodium;
                this.nutritions[3].percent = energy/5;
                this.nutritions[4].percent = fat;
                this.nutritions[5].percent = choles;
                this.nutritions[6].percent = sugar;
                this.nutritions[7].percent = fiber;
            },
            set2:function(protein,carb,sodium,energy,fat,choles,sugar,fiber){
                /*
                var root = document.querySelector(':root');
                root.style.setProperty('--w9',protein+"px")
                root.style.setProperty('--w10',carb/2+"px")
                root.style.setProperty('--w11',sodium+"px")
                root.style.setProperty('--w12',energy/8+"px")
                root.style.setProperty('--w13',fat+"px")
                root.style.setProperty('--w14',choles+"px")
                root.style.setProperty('--w15',sugar+"px")
                root.style.setProperty('--w16',fiber+"px")
                */
                //console.log(s);
                this.nutritions2[0].name = "Protein";
                this.nutritions2[1].name = "Carbohydrate";
                this.nutritions2[2].name = "Sodium";
                this.nutritions2[3].name = "Energy";
                this.nutritions2[4].name = "Fat";
                this.nutritions2[5].name = "Cholesterol";
                this.nutritions2[6].name = "Sugar";
                this.nutritions2[7].name = "Fiber";
                this.nutritions2[0].percent = protein;
                this.nutritions2[1].percent = carb;
                this.nutritions2[2].percent = sodium;
                this.nutritions2[3].percent = energy/5;
                this.nutritions2[4].percent = fat;
                this.nutritions2[5].percent = choles;
                this.nutritions2[6].percent = sugar;
                this.nutritions2[7].percent = fiber;
            },
            gotoDirection:function(a){
                window.open(a, "_blank");
            }
        }
    }
</script>