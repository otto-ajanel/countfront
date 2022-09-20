import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';
import { InicioView, LoginView,UsuariosView,ClientesView } from '@/views';

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
