<template>
  
    <div class="q-pa-md ">

      <q-table
      title="Pedidos Pendiente Pago"
      :data="Pedidos"
      :columns="columns"
      row-key="name"
      dark
      color="amber"
    ></q-table>
    
     

    </div>
</template>

<script>
export default {
  data () {
    return{
      name: 'PageIndex',
      columns:[
        {

        }
      ],
      Pedidos:[]
      
    }
  },
  methods:{
    
  },
  created (){
    
  },
  mounted(){
    this.$socket.on('pedidoChiringo', (msg) => {
      console.log(msg)
    })
  }
}
</script>