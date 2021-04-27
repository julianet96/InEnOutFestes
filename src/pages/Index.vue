<template>
  
    <div class="q-pa-md row items-start q-gutter-md flex flex-center">
    
      <q-card v-ripple class="my-card  q-hoverable cursor-pointer" @click.native="$router.push({path: '/Bebida', query: { mesa: ''+mesa+'' } })">
        <span class="q-focus-helper"></span>
        <q-img
          src="../../public/imagenes/cocacola.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            BEBIDA
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card q-hoverable cursor-pointer" @click.native="$router.push({path: '/Comida', query: { mesa: ''+mesa+'' } })">
      <span class="q-focus-helper"></span>
        <q-img
          src="../../public/imagenes/hamburguesa.png"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            COMIDA
          </div>
        </q-img>
      </q-card>

    </div>
</template>

<script>
export default {
  data () {
    return{
      name: 'PageIndex',
      mesa:0

    }
  },
  methods:{
    ComprovationMesa(mesa){
      if(mesa == undefined || mesa == null){
        console.log("Error que se tiene que notificar")
      }
    }
  },
  created (){
    this.mesa = this.$router.currentRoute.query.mesa
    this.ComprovationMesa(this.mesa)
  }
}
</script>