import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchWrapper } from '@/helpers';
import { message } from 'ant-design-vue';
import { useToast } from 'vue-toastification';
const toast = useToast();

const baseUrl = `${import.meta.env.VITE_API_URL}/constancia/all`;
const opciones = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
    }
}

export const useConstanciasStore = defineStore('constancias', {

    state: () => ({
        constancias: [],
        constanciaEdit: {

        },
        formVisible: false,
        formVisibleNew: false,
        newConstancia: {
            nombre: null,
            clienteId: null,
        }
    }),
    actions: {
        async getAll() {
            const headers = opciones
            await axios.get(baseUrl, headers)
                .then(constancias => {

                    this.constancias = constancias.data.data
                })
                .catch(error => this.constancias = { error })
        },
        setConstanciaEdit(id) {
            this.formVisible = true
            this.title = "Modulo de Editar Usuario"
            let constancia = this.constancias.find(constancia => constancia.id == id)
            if (constancia) {
                this.constanciaEdit = constancia
            }
            else { this.constanciaEdit = [] }

        },
        setConstanciaNew() {

            this.newConstancia.nombre = ''
            this.newConstancia.constanciaId = ''
            this.formVisibleNew = true
        },
        onCloseFormE() {
            this.formVisible = false
        },
        onCloseNewF() {
            this.formVisibleNew = false
        },
        async deleteConstancia(id) {
            const baseURL = `${import.meta.env.VITE_API_URL}/constancia/${id}`
            await axios.delete(baseURL, opciones).then(message => {
                this.getAll()
            }).catch(err =>
                console.log("error al Eliminar constancia")
            )
        },
        async saveEdited() {
            const data = {
                nombre: this.constanciaEdit.nombre,
                clienteId: this.constanciaEdit.clienteId,

            }
            const headers = opciones
            const baseURL = `${import.meta.env.VITE_API_URL}/constancia/${this.constanciaEdit.id}`
            await axios.put(baseURL, data,


                headers

            ).then(mess => {
                this.getAll
                this.formVisible = false
            }).catch(erro => {
                console.log("error  al Editar " + erro)
            })

        },
        async saveConstancia() {
            const data = {
                nombre: this.newConstancia.nombre,
                clienteId: this.newConstancia.clienteId
            }
            const headers = opciones
            const baseURL = `${import.meta.env.VITE_API_URL}/constancia`
            await axios.post(baseURL, data, headers).then(mess => {
                this.getAll()
                this.formVisibleNew = false
                toast.success('Registrado con exito!')
            }).catch(erro => {
                toast.info("Error Verifica los datos de la constancia")
            })

        }
    },
    getters: {

    }


});
