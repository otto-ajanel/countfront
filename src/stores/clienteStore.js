import { defineStore } from 'pinia';
import axios, { Axios } from 'axios';
import { fetchWrapper } from '@/helpers';
import { message } from 'ant-design-vue';

const baseUrl = `${import.meta.env.VITE_API_URL}/cliente/all`;
const opciones = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
    }
}

export const useClientesStore = defineStore('clientes', {

    state: () => ({
        clientes: [],
        clienteEdit: {

        },
        formVisible: false,
        formVisibleNew: false,
        newCliente: {
            nombre: null,
            email: null,
            dpi: null,
            nit: null,
            telefono: null,
            fechaNacimiento: null

        }
    }),
    actions: {
        onCloseNew() {
            this.formVisibleNew = false
        },
        async getAll() {

            await axios.get(baseUrl)
                .then(clientes => {
                    this.clientes = clientes.data.data
                })
                .catch(error => this.clientes = { error })
        },
        setClienteEdit(id) {
            this.formVisible = true
            this.title = "Modulo de Editar cliente"
            let cliente = this.clientes.find(cliente => cliente.id == id)
            if (cliente) {
                this.clienteEdit = cliente
            }
            else { this.clienteEdit = [] }

        },
        setClienteNew() {

            this.newCliente.nombre = ''
            this.newCliente.nit = ''
            this.newCliente.email = ''
            this.newCliente.fechaNacimiento = ''
            this.newCliente.telefono = ''
            this.formVisibleNew = true
        },
        onCloseFormE() {
            this.formVisible = false
        },
        async deleteUser(id) {
            const baseURL = `${import.meta.env.VITE_API_URL}/cliente/${id}`
            await axios.delete(baseURL, opciones).then(message => {
                this.getAll()
            }).catch(err =>
                console.log("error al Eliminar Cliente")
            )
        },
        async saveEdited() {
            const data = {
                nombre: this.clienteEdit.username,
                email: this.clienteEdit.email,
                nit: this.clienteEdit.nit,
                dpi: this.clienteEdit.dpi,
                fechaNacimiento: this.clienteEdit.fechaNacimiento,
                telefono: this.clienteEdit.telefono
            }
            const headers = opciones
            const baseURL = `${import.meta.env.VITE_API_URL}/cliente/${this.clienteEdit.id}`
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
                nombre: this.newCliente.nombre,
                dpi: this.newCliente.dpi,
                nit: this.newCliente.nit,
                fechaNacimiento: this.newcliente.fecchaNacimiento,
                telefono: this.newCliente.telefono,
                email: this.newCliente.email
            }
            const headers = opciones
            const baseURL = `${import.meta.env.VITE_API_URL}/cliente`
            await axios.post(baseURL, data,


                headers

            ).then(mess => {
                this.getAll
                this.formVisible = false
            }).catch(erro => {
                console.log("error  al Nueo suario" + erro)
            })

        }
    },
    getters: {

    }


});
