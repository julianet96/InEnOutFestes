<template>
  
    <div class="q-pa-md ">
      <q-list bordered>
        <q-item clickable v-ripple v-for="(linea,i) in lineasComanda" :key="i" >
          <q-item-section avatar>
            <q-avatar>
              <q-img
                :src= "linea.Img"
                basic
              >
              </q-img>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle2">{{ linea.Nombre }}</q-item-label>
            <q-item-label caption lines="1">{{ linea.Comentario }}</q-item-label>
          </q-item-section>
          
          <q-item-section>
            <div class="test">Cantidad: {{linea.Cantidad}}</div>
            
          </q-item-section>
          <q-item-section>
            <div class="test">Total: {{linea.TotalLinea}} €</div>
            
          </q-item-section>

          <q-item-section side>
          <q-btn flat round color="red" icon="clear" @click="eliminarLineaComanda(linea)"></q-btn>
        </q-item-section>
        </q-item>
      </q-list>

      <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title >
          Total: {{this.totalPedido}} €
        </q-toolbar-title>
        <q-btn  dense color="positive"  icon="check" >Confirmar Pedido</q-btn>
      </q-toolbar>
    </q-footer>

    </div>


    
</template>

<script>
import globalvars from "../boot/globalvars.js";
export default {
  data () {
    return {
      mesa:0,
      lineasComanda:[],
      comanda:0,
      totalPedido:1
      
    }
  },
  methods:{
    async getLineasComanda (comanda) {
      await this.$axios
      .get(globalvars.RestURL+"/getLineasComanda",{params:{idComanda:comanda}})
      .then(res => {
        let resData = res.data
        this.lineasComanda = resData

        console.log(resData)
      })
      .catch(err => {
        console.log(err)
      })
    },
    async eliminarLineaComanda (linea) {
      this.$root.$emit('SubtractBadge')

      this.$axios
          .post(globalvars.RestURL+"/deleteLineaComanda",{
            idLineaComanda:linea.Id
          })
          .then(res => {
            let result = res.data
            this.getLineasComanda(this.comanda)
          })
          .catch(err => {
            console.log(err)
          }) 
          
      let total = this.$q.localStorage.getItem("TotalComanda")
      total = total - linea.TotalLinea
      this.$q.localStorage.set("TotalComanda", total)

      this.totalPedido = this.totalPedido - linea.TotalLinea
    }
  },
  created(){
    this.mesa = this.$router.currentRoute.query.mesa
    this.comanda = this.$q.localStorage.getItem("IdComanda")
    this.getLineasComanda(this.comanda)
    this.totalPedido = this.$q.localStorage.getItem("TotalComanda") ?? 0
  }
}
</script>