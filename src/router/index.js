import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';
import { InicioView, LoginView,UsuariosView,ClientesView,ConstanciasView } from '@/views';
import { ControlPagosView } from '../views';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: LoginView },
        { path: '/inicio', component: InicioView ,
        children: [
            {
                name: 'clientes',
                path: '/inicio/clientes',
                component:ClientesView
            },
            {
                name: 'users',
                path: '/inicio/usuarios',
                component:UsuariosView
            },
            {
                name: 'constancias',
                path: '/inicio/constancias',
                component:ConstanciasView
            },
            {
                name: 'controlPagos',
                path: '/inicio/controlPago',
                component:ControlPagosView
            }
        ]
    }
    ]
});

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/';
    }
});
