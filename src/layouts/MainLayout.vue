<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar class="q-hoverable cursor-pointer" @click.native="$router.push({path: '/', query: { mesa: ''+mesa+'' } })">
            <img src="../../public/portolg.png">
          </q-avatar>
          Festes del carme
        </q-toolbar-title>
        <q-btn  dense flat round icon="shopping_cart"  />
      </q-toolbar>
      
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-scroll-area class="fit">
        <q-item-label header class="text-grey-8">
          OPCIONES
        </q-item-label>

        <q-list>
          <q-item clickable v-ripple @click.native="$router.push({path: '/Comida', query: { mesa: ''+mesa+'' } })">
              <q-item-section avatar>
                <q-icon name="lunch_dining" />
              </q-item-section>
              <q-item-section>Comida</q-item-section>
          </q-item>

          <q-item clickable v-ripple @click.native="$router.push({path: '/Bebida', query: { mesa: ''+mesa+'' } })">
              <q-item-section avatar>
                <q-icon name="local_drink" />
              </q-item-section>
              <q-item-section>Bebida</q-item-section>
          </q-item>

          <q-separator/>

          <q-item clickable>
              <q-item-section avatar>
                <q-icon name="shopping_cart" />
              </q-item-section>
              <q-item-section>Cesta</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      mesa:0
    }
  },
  created(){
    console.log(this.$router.currentRoute.query.mesa)
    this.mesa = this.$router.currentRoute.query.mesa
  }
}
</script>