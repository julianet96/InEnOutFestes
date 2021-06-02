<template>
  
    <div class="q-pa-md row items-start q-gutter-md flex flex-center">


      <q-card class="my-card cursor-pointer q-hoverable" v-for="(comida,i) in ComidasMenu" @click="OpenComida(comida)" :key="i">
        <span class="q-focus-helper"></span>
            <q-img
            :src= "comida.Img"
            basic
            >
            <div class="absolute-bottom text-subtitle2 text-center" v-text="comida.Nombre">
                
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
            :src= "ComidaSelec.Img"
            basic
            >
            <div class="absolute-bottom text-subtitle2 text-center" v-text="ComidaSelec.Nombre">
                
            </div>
            </q-img>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle2">Precio: {{ComidaSelec.Precio}} €</div>
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
              <q-input filled v-model="cantidad" label="Cantidad:"  > </q-input>
            </div>
            <q-btn
              round
              color="positive"
              @click="addCantidad()"
              icon="add"
            ></q-btn>
          </div>
        </q-card-section>
        
        <q-card-section class="q-pt-none">
          <div class="text-h6">Total: {{ComidaSelec.Precio * cantidad}} €</div>
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
      ComidasMenu:[],
      ComidaSelec:{},
      cantidad:1,
      maximizedToggle:true,
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
    GetComidasMenu(){
      this.$axios
        .get(globalvars.RestURL +"/getComidaMenu")
        .then(res => {
          let resData = res.data.recordset
          console.log(resData)
          this.ComidasMenu = resData
        })
        .catch(err => {
          console.log(err)
        })  
    },
    OpenComida(comida){
      this.ComidaSelec = comida
      this.card = true
    },
    LimpiarVariables(){
      this.cantidad = 1;
    },
    async CreateLineaComanda(){
      this.$root.$emit('UpdateBadge')
      let idComanda = await this.GetIdComanda()

      let comment = null;

      switch(this.ComidaSelec.Type){
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
            idComida:this.ComidaSelec.Id,
            idBebida:null,
            Comentario:comment,
            bebidaType:this.ComidaSelec.Type,
            cantidad: this.cantidad,
            totalLinea: this.cantidad * this.ComidaSelec.Precio
          })
          .then(res => {
            let result = res.data.recordset[0].Id
            this.sumarTotal(this.ComidaSelec.Precio)
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
      if(total = null){
        total = 0  
      }

      total = total + totalPedido
      this.$q.localStorage.set("TotalComanda", total)
    }
  },
  created(){
    this.GetComidasMenu();
    this.mesa = this.$router.currentRoute.query.mesa
  }
}
</script>
