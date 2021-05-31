<template>
    <div class="q-pa-sm row justify-center items-center" style="height: 100vh">
        <q-card class="col-12 col-xs-5 col-md-4 col-md-3 col-xl-2" flat bordered>
            <q-card-section>
                <div class="text-h6 text-center col-12">Inicio de sesión</div>
            </q-card-section>
            <q-card-section>
                <q-form
                    @submit="onSubmit"
                    class="q-gutter-md"
                >
                    <q-input 
                        label="Usuario"
                        v-model="username"
                        type="text"
                    />
                    <q-input 
                        label="Contraseña"
                        v-model="password"
                        :type="isPassHidden ? 'password' : 'text'"
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="isPassHidden ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPassHidden = !isPassHidden"
                            />
                        </template>
                    </q-input>

                    <q-card-actions class="justify-center">
                        <q-btn label="Enviar" type="submit" color="primary"> </q-btn>
                        <q-btn label="Cancelar" @click.native="$router.push({path: '/' })" color="negative"> </q-btn>
                    </q-card-actions>
                </q-form>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            isPassHidden: true,
        }
    },
    methods: {
        onSubmit(ev) {
            this.$axios
        }
    }
}
</script>