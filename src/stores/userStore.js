import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchWrapper } from '@/helpers';
import { message } from 'ant-design-vue';
import { useToast } from 'vue-toastification';
const toast = useToast();

const baseUrl = `${import.meta.env.VITE_API_URL}/users/all`;
const opciones = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
    }
}

export const useUsersStore = defineStore('users', {

    state: () => ({
        users: [],
        userEdit: {

        },
        formVisible: false,
        formVisibleNew: false,
        newUser: {
            username: null,
            email: null,
            rol: null,
            password: null
        }
    }),
    actions: {
        async getAll() {

            await axios.get(baseUrl)
                .then(users => {

                    this.users = users.data.data
                })
                .catch(error => this.users = { error })
        },
        setUserEdit(id) {
            this.formVisible = true
            this.title = "Modulo de Editar Usuario"
            let user = this.users.find(user => user.id == id)
            if (user) {
                this.userEdit = user
            }
            else { this.userEdit = [] }

        },
        setUserNew() {

            this.newUser.username = ''
            this.newUser.email = ''
            this.newUser.rol = null
            this.newUser.password = null
            this.formVisibleNew = true
        },
        onCloseFormE() {
            this.formVisible = false
        },
        onCloseNewF() {
            this.formVisibleNew = false
        },
        async deleteUser(id) {
            const baseURL = `${import.meta.env.VITE_API_URL}/user/${id}`
            await axios.delete(baseURL, opciones).then(message => {
                this.getAll()
            }).catch(err =>
                console.log("error al Eliminar Usuario")
            )
        },
        async saveEdited() {
            const data = {
                username: this.userEdit.username,
                email: this.userEdit.email,

            }
            const headers = opciones
            const baseURL = `${import.meta.env.VITE_API_URL}/user/${this.userEdit.id}`
            await axios.put(baseURL, data,


                headers

            ).then(mess => {
                this.getAll
                this.formVisible = false
            }).catch(erro => {
                console.log("error  al Editar " + erro)
            })

        },
        async saveUser() {
            const data = {
                username: this.newUser.username,
                email: this.newUser.email,
                rol: this.newUser.rol,
                password: this.newUser.password
            }
            const headers = opciones
            const baseURL = `${import.meta.env.VITE_API_URL}/auth/signup`
            await axios.post(baseURL,data).then(mess => {
                this.getAll
                this.formVisibleNew = false
                toast.success('Registrado con exito!')
            }).catch(erro => {
                toast.info("Error usuario / email que ya esta registrado")
            })

        }
    },
    getters: {

    }


});
