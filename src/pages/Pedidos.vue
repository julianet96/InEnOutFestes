<template>
  
    <div class="q-pa-md ">

      <q-table
      title="Pedidos Pendiente Pago"
      :data="Pedidos"
      :columns="columns"
      row-key="Id"
      dark
      color="amber"
      :rows-per-page-options="[0]"
      :hide-pagination="true"
      >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Mesa" :props="props">
            {{ props.row.Mesa }}
          </q-td>
          <q-td key="Total" :props="props">
            {{ props.row.Total }} €
          </q-td>
          <q-td key="acctions" :props="props">
            <q-btn color="amber" @click="ConfirmarPago(props.row)" glossy label="Confirmar"></q-btn>
          </q-td>
        </q-tr>
      </template>

    
      </q-table>
    

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Pago Confirmado</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Estas seguro que deseas Confirmar este Pago
        </q-card-section>

        <q-card-actions align="right">
          <q-btn glossy @click="realizarPago()" label="Si" color="primary" v-close-popup></q-btn>
          <q-btn glossy label="No" color="deep-orange" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
     

    </div>
</template>

<script>
import globalvars from "../boot/globalvars.js";
export default {
  data () {
    return{
      name: 'PageIndex',
      alert:false,
      columns:[
        {
          name: 'Mesa',
          label: 'Mesa',
          align: 'center'
        },
        {
          name: 'Total',
          label: 'Total',
          align: 'center'
        },
        {
          name: 'acctions',
          label: 'Confirmar Pago',
          align: 'center'
        }
      ],
      Pedidos:[],
      ComandaModificando:{}
    }
  },
  methods:{
    async getComandasPendientePago() {
      this.$axios
      .get(globalvars.RestURL +"/getComandaPendientePago")
      .then(res =>{
        console.log(res.data.recordset)
        this.Pedidos = res.data.recordset
      })
      .catch(err => {
        console.log(err)
      })
    },
    ConfirmarPago(props) {
      this.ComandaModificando = props
      this.alert = true;
    },
    realizarPago(){
      this.$axios
          .post(globalvars.RestURL+"/changeStatusComanda",{
            Estado:2,
            Id:this.ComandaModificando.Id
          })
          .then(res => {
            console.log(res)
            this.getComandasPendientePago();
            this.$socket.emit('cambioEstadoCoBa',{})
          })
          .catch(err => {
            console.log(err)
          })
    }
    
  },
  created (){
    this.getComandasPendientePago();
  },
  mounted(){
    this.$socket.on('pedidoChiringo', (msg) => {
      this.getComandasPendientePago()
    })
  }
}
</script>