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

    </div>
</template>

<script>
import globalvars from "../boot/globalvars.js";
export default {
  data () {
    return {
      name: 'PageIndex',
      BebidasMenu:[]
      
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
