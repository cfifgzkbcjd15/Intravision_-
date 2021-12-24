const routes=[
    { path: '*', component: drink },
    { path: '/adminPanel', component: adminPanel }
]
const router=new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')