<template>
  
    <div class="q-pa-md row items-start q-gutter-md flex flex-center">


      <q-card class="my-card " v-for="(bebida,i) in BebidasMenu" :key="i">
            <q-img
            :src= "bebida.Img"
            basic
            >
            <div class="absolute-bottom text-subtitle2 text-center" v-text="bebida.Nombre">
                
            </div>
            </q-img>
      </q-card>





        

       <q-card class="my-card ">
            <q-img
            :src="test"
            basic
            >
            <div class="absolute-bottom text-subtitle2 text-center">
                Agua
            </div>
            </q-img>
      </q-card>
     <!-- 
      <q-card class="my-card ">
        <q-img
          src="../../public/imagenes/cocacola.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Coca-Cola
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card ">
        <q-img
          src="../../public/imagenes/cocacola.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Fanta Limon
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card ">
        <q-img
          src="../../public/imagenes/cocacola.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Fanta Naranja
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card ">
        <q-img
          src="../../public/imagenes/cocacola.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Sprite
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card ">
        <q-img
          src="../../public/imagenes/cocacola.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Tonica
          </div>
        </q-img>
      </q-card>
      
      <q-card class="my-card ">
        <q-img
          src="../../public/imagenes/cocacola.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Granizado de limon
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card ">
        <q-img
          src="../../public/imagenes/cocacola.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Granizado de almendra
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card ">
        <q-img
          src="../../public/imagenes/cocacola.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Cerveza
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card ">
        <q-img
          src="../../public/imagenes/cocacola.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Shandy
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card ">
        <q-img
          src="../../public/imagenes/cocacola.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Cerveza 0,0
          </div>
        </q-img>
      </q-card>



      <q-card class="my-card ">
        <q-img
          src="../../public/imagenes/cocacola.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Pomada
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card ">
        <q-img
          src="../../public/imagenes/fanta-limon.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Chupito
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card ">
        <q-img
          src="../../public/imagenes/cocacola.jpg"
          basic
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Combinado
          </div>
        </q-img>
      </q-card> -->
      

    </div>
</template>

<script>
import globalvars from "../boot/globalvars.js";
export default {
  data () {
    return {
      name: 'PageIndex',
      BebidasMenu:[],
      test:'../assets/fanta-limon.jpg'
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
    }
  },
  created(){
    this.GetBebidasMenu();
  }
}
</script>
