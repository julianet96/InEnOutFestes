<template>
  
    <div class="q-pa-md row items-start q-gutter-md flex flex-center">


      <q-card class="my-card cursor-pointer q-hoverable" v-for="(bebida,i) in BebidasMenu" @click="OpenBebida(bebida)" :key="i">
        <span class="q-focus-helper"></span>
            <q-img
            :src= "bebida.Img"
            basic
            >
            <div class="absolute-bottom text-subtitle2 text-center" v-text="bebida.Nombre">
                
            </div>
            </q-img>
      </q-card>


      <q-dialog
      v-model="card"
      full-width
    >
      <q-card>
        <q-card-section>
          <q-img
            :src= "BebidaSelec.Img"
            basic
            >
            <div class="absolute-bottom text-subtitle2 text-center" v-text="BebidaSelec.Nombre">
                
            </div>
            </q-img>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle2">Precio: {{BebidaSelec.Precio}} €</div>
        </q-card-section>
        <q-card-section>
          
          <q-input filled v-model="cantidad" label="Cantidad:" stack-label type="number"></q-input>
        </q-card-section>
        <q-card-section  v-show="BebidaSelec.Type == 'Alcohol-Chupito' || BebidaSelec.Type == 'Alcohol-Mezcla'">
          <div class="text-subtitle2">Alcohol:</div>
          <q-option-group
            :options="alcoholOptions"
            label="Alcohol"
            type="radio"
            v-model="alcohol"
          ></q-option-group>
        </q-card-section>
        <q-card-section v-show="BebidaSelec.Type == 'Alcohol-Mezcla'">
          <div class="text-subtitle2">Mezcla:</div>
          <q-option-group
            :options="refrescosOptions"
            label="Mezcla"
            type="radio"
            v-model="refresco"
          ></q-option-group>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-h6">Total: {{BebidaSelec.Precio * cantidad}} €</div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cancelar" v-close-popup></q-btn>
          <q-btn flat label="OK" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>



      

    </div>
</template>

<script>
import globalvars from "../boot/globalvars.js";
export default {
  data () {
    return {
      name: 'PageIndex',
      card: false,
      BebidasMenu:[],
      BebidaSelec:{},
      lorem: 'Lorem ipsum dolor sit amet,',
      cantidad:1,
      maximizedToggle:true,
      alcohol:13,
      refresco:1,
      alcoholOptions:[],
      refrescosOptions:[]
      
    }
  },
  methods:{
    GetBebidasMenu(){
      this.$axios
        .get(globalvars.RestURL +"/GetBebidaMenu")
        .then(res => {
          let resData = res.data.recordset
          this.BebidasMenu = resData
          console.log(resData)
        })
        .catch(err => {
          console.log(err)
        })  
    },
    OpenBebida(bebida){
      this.BebidaSelec = bebida
      this.card = true
      console.log(bebida)
    },
    GetBebidasAlcoholDestilado(){
      this.$axios
      .get(globalvars.RestURL+"/GetBebidasAlcoholDestilado")
      .then(res => {
        let resData = res.data.recordset
        resData.forEach(element => {
          this.alcoholOptions.push({
            label:element.Nombre,
            value:element.Id
          })
        });
      })
      .catch(err => {
        console.log(err)
      })
    },
    GetBebidasRefrescos(){
      this.$axios
      .get(globalvars.RestURL+"/GetBebidasRefrescos")
      .then(res => {
        let resData = res.data.recordset
        resData.forEach(element => {
          this.refrescosOptions.push({
            label:element.Nombre,
            value:element.Id
          })
        });
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created(){
    this.GetBebidasMenu();
    this.GetBebidasAlcoholDestilado();
    this.GetBebidasRefrescos();
  }
}
</script>
