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
          <div class="row"  >
            <q-btn
              class="column"
              round
              color="negative"
              icon="remove"
              :disable="this.cantidad <= 1"
              @click="removeCantidad()"
            ></q-btn>
            <div class="q-gutter-y-md column" style="max-width: 80px">
              <q-input filled v-model="cantidad" label="Cantidad:" readonly > </q-input>
            </div>
            <q-btn
              round
              color="positive"
              @click="addCantidad()"
              icon="add"
            ></q-btn>
          </div>
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
          <q-btn flat label="Cancelar" v-close-popup @click="LimpiarVariables()"></q-btn>
          <q-btn flat label="OK" v-close-popup @click="CreateLineaComanda()"></q-btn>
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
      cantidad:1,
      maximizedToggle:true,
      alcohol:13,
      refresco:1,
      alcoholOptions:[],
      refrescosOptions:[],
      mesa:0
      
    }
  },
  methods:{
    addCantidad(){
      this.cantidad = this.cantidad + 1
    },
    removeCantidad(){
      this.cantidad = this.cantidad - 1
    },
    GetBebidasMenu(){
      this.$axios
        .get(globalvars.RestURL +"/getBebidaMenu")
        .then(res => {
          let resData = res.data.recordset
          this.BebidasMenu = resData
        })
        .catch(err => {
          console.log(err)
        })  
    },
    OpenBebida(bebida){
      this.BebidaSelec = bebida
      this.card = true
    },
    GetBebidasAlcoholDestilado(){
      this.$axios
      .get(globalvars.RestURL+"/getBebidasAlcoholDestilado")
      .then(res => {
        let resData = res.data.recordset
        resData.forEach(element => {
          this.alcoholOptions.push({
            label:element.Nombre,
            value:element.Nombre
          })
        });
      })
      .catch(err => {
        console.log(err)
      })
    },
    GetBebidasRefrescos(){
      this.$axios
      .get(globalvars.RestURL+"/getBebidasRefrescos")
      .then(res => {
        let resData = res.data.recordset
        resData.forEach(element => {
          this.refrescosOptions.push({
            label:element.Nombre,
            value:element.Nombre
          })
        });
      })
      .catch(err => {
        console.log(err)
      })
    },
    LimpiarVariables(){
      this.cantidad = 1;
      this.alcohol = 13
      this.refresco = 1
    },
    async CreateLineaComanda(){
      this.$root.$emit('UpdateBadge')
      let idComanda = await this.GetIdComanda()

      let comment = null;

      switch(this.BebidaSelec.Type){
        case 'Alcohol-Chupito':
          comment = this.alcohol
          break;
        case 'Alcohol-Mezcla':
          comment = this.alcohol+' + '+this.refresco
          break;
      }

      this.$axios
          .post(globalvars.RestURL+"/createLineaComanda",{
            idComanda:idComanda,
            idComida:null,
            idBebida:this.BebidaSelec.Id,
            Comentario:comment,
            bebidaType:this.BebidaSelec.Type,
            cantidad: this.cantidad,
            totalLinea: this.cantidad * this.BebidaSelec.Precio
          })
          .then(res => {
            let result = res.data.recordset[0].Id
            this.sumarTotal(this.BebidaSelec.Precio)
            this.LimpiarVariables()
          })
          .catch(err => {
            console.log(err)
          })
      
    },
    async GetIdComanda(){
      
      let result = this.$q.localStorage.getItem("IdComanda")
      
      if(result == null){
        result = await this.CreateComanda()
      }

      return result
    },
    async CreateComanda(){
      console.log("entro en crear")
      let result = null;
      await this.$axios
          .post(globalvars.RestURL+"/createComanda",{
            Mesa:this.mesa,
            Estado:0,
            Hora: new Date(Date.now())
          })
          .then(res => {
            result = res.data.recordset[0].Id
            this.$q.localStorage.set("IdComanda", result)
          })
          .catch(err => {
            console.log(err)
          })

      return result
    },
    sumarTotal (precio) {
      let total = this.$q.localStorage.getItem("TotalComanda")
      let totalPedido = this.cantidad * precio;
      if(total == null){
        total = 0  
      }

      total = total + totalPedido
      console.log("Bebida: "+ total)
      this.$q.localStorage.set("TotalComanda", total)
    }
  },
  created(){
    this.GetBebidasMenu();
    this.GetBebidasAlcoholDestilado();
    this.GetBebidasRefrescos();
    this.mesa = this.$router.currentRoute.query.mesa
  }
}
</script>
