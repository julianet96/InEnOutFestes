<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../../public/portolg.png">
          </q-avatar>
          Area Fester@s
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <!-- drawer content -->
      <q-scroll-area class="fit">
        <q-item-label header class="text-grey-8">
          OPCIONES
        </q-item-label>

        <q-list>
          <q-item clickable v-ripple @click.native="$router.push({path: '/pedidos' })">
              <q-item-section avatar>
                <q-icon name="pending_actions" />
              </q-item-section>
              <q-item-section>Pedidos Chiringuito</q-item-section>
          </q-item>
          <q-item clickable v-ripple @click.native="$router.push({path: '' })">
              <q-item-section avatar>
                <q-icon name="liquor" />
              </q-item-section>
              <q-item-section>Pedidos Barra</q-item-section>
          </q-item>
          <q-item clickable v-ripple @click.native="$router.push({path: '' })">
              <q-item-section avatar>
                <q-icon name="local_pizza" />
              </q-item-section>
              <q-item-section>Pedidos Cocina</q-item-section>
          </q-item>
          <q-separator/>
            <q-item clickable v-ripple @click.native="$router.push({path: '' })">
              <q-item-section avatar>
                <q-icon name="emoji_people" />
              </q-item-section>
              <q-item-section>Area Camareros</q-item-section>
          </q-item>
          <q-separator/>
          <q-item clickable v-ripple @click.native="$router.push({path: '/stockBebida' })">
              <q-item-section avatar>
                <q-icon name="local_drink" />
              </q-item-section>
              <q-item-section>Stock Bebidas</q-item-section>
          </q-item>
          <q-item clickable v-ripple @click.native="$router.push({path: '/stockComida' })">
              <q-item-section avatar>
                <q-icon name="lunch_dining" />
              </q-item-section>
              <q-item-section>Stock Comidas</q-item-section>
          </q-item>
          <q-separator/>
          <q-item clickable v-ripple @click.native="$router.push({path: '/users' })">
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>
              <q-item-section>Aministrar Usuarios</q-item-section>
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
      left: false
    }
  }
}
</script>