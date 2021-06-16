<template>
  
    <div class="q-pa-md row items-start q-gutter-md flex flex-center ">
        <q-card class="my-card-pedidos" v-for="(pedido,i) in pedidos" :key="i">
            <q-card-section>
                <div class="text-h6">Pedido Nº: {{pedido.Id}}</div>
                <div class="text-subtitle2">Mesa: {{pedido.Mesa}}</div>
            </q-card-section>
            <q-list bordered separator>
                <q-item v-for="(linea,j) in pedido.lineas" v-ripple :key="j" class="pedidos-lineas" >
                    <q-item-section>{{linea.Cantidad}} {{linea.Nombre}}</q-item-section>
                    <q-item-section side>{{linea.Comentario == 'null' ? "" : linea.Comentario}}</q-item-section>
                </q-item>
            </q-list>
        </q-card>
      

    </div>
</template>

<script>
import globalvars from "../boot/globalvars.js";
export default {
  data () {
    return{
      name: 'PageIndex',
      mesa:0,
      pedidos:[]

    }
  },
  methods:{
      async getPedidos() {
          await this.$axios
            .get(globalvars.RestURL+"/getPedidosBarra")
            .then(res => {
            let result = res.data
            this.pedidos = result

            

            console.log(result)
            })
            .catch(err => {
            console.log(err)
            })
      }
    
  },
  created (){
    this.getPedidos()
  },
  mounted(){
    this.$socket.on('pedidoBarCocina', (msg) => {
      this.getPedidos()
    })
  }
}
</script>