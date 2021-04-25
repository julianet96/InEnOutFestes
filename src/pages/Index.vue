<template>
  
    <div class="q-pa-md row items-start q-gutter-md flex flex-center">
    
    
      <q-card v-ripple class="my-card  q-hoverable cursor-pointer" @click.native="$router.push('/Bebida')">
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

      <q-card class="my-card q-hoverable cursor-pointer" @click.native="$router.push('/Comida')">
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
  name: 'PageIndex'
}
</script>
