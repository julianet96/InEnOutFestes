import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import axios from 'axios'
import globalvars from "../boot/globalvars.js";

import { io } from "socket.io-client";
const socket = io('http://localhost:3000');

Vue.prototype.$socket = socket

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    console.log(to.path)

    const publicPath = ['/login','/Carrito','/Comida','/Bebida','/','/users']
    const privatePath = ['/pedidos']
    
    let correctPath = publicPath.find(element => element == to.path)
    
    if(!correctPath){

      let token = localStorage.getItem('Token')

      if(token){
        axios.post(globalvars.RestURL+"/verifyToken",{
          token:token
        })
        .then(res => {
          next()
        })
        .catch(err => {
          next({path:'/login'})
        })
      }
      else{
        next({path:'/login'})
      }
    }
    else{
      next();
    }
  })

  return Router
}
