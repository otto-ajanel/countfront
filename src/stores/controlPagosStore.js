import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchWrapper } from '@/helpers';
import { message } from 'ant-design-vue';
import { useToast } from 'vue-toastification';
const toast = useToast();

const baseUrl = `${import.meta.env.VITE_API_URL}/controlpago/all`;
const opciones = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
    }
}

export const useControlPagosStore = defineStore('controlPagos', {

    state: () => ({
        controlPagos: [],
        price: 0,
        controlPagoEdit: {

        },
        formVisible: false,
        formVisibleNew: false,
        newControlPago: {
            servicioId: null,
            clienteId: null,
            totalPago: null,

        },
        reportServices: [],
        reportLabels: [],
        reportData: []

    }),
    actions: {
        async getReportServices() {
            const headers = opciones
            const baseURL = `${import.meta.env.VITE_API_URL}/controlPago/reportServices`

            await axios.get(baseURL, headers).then(repSer => {
                this.reportServices = []
                this.reportLabels = []
                this.reportData = []
                this.reportServices = repSer.data.data
                this.reportServices.map((element) => {
                    this.reportData.push(element.cantidad)
                    this.reportLabels.push(element.servicio)
                })

            }).catch(err => {
                this.reportServices = { err }
            })
        },
        async getAll() {
            const headers = opciones
            await axios.get(baseUrl, headers)
                .then(controlPagos => {
                    this.controlPagos = controlPagos.data.data
                })
                .catch(error => this.controlPagos = { error })
        },
        setControlPagoEdit(id) {
            this.formVisible = true
            this.title = "Modulo de Editar Usuario"
            let controlPago = this.controlPagos.find(controlPago => controlPago.id == id)
            if (controlPago) {
                this.controlPago = controlPago
            }
            else { this.controlPagoEdit = [] }

        },
        setControlPagoNew() {

            this.newControlPago.clienteId = null;
            this.newControlPago.servicioId = null
            this.newControlPago.totalPago = 0
            this.formVisibleNew = true
        },
        onCloseFormE() {
            this.formVisible = false
        },
        onCloseNewF() {
            this.formVisibleNew = false
        },
        async deleteControlPago(id) {
            const baseURL = `${import.meta.env.VITE_API_URL}/controlPago/${id}`
            await axios.delete(baseURL, opciones).then(message => {
                this.getAll()
            }).catch(err =>
                console.log("error al Eliminar control de pago")
            )
        },
        async saveEdited() {
            const data = {
                nombre: this.constanciaEdit.nombre,
                clienteId: this.constanciaEdit.clienteId,

            }
            const headers = opciones
            const baseURL = `${import.meta.env.VITE_API_URL}/controlPago/${this.controlPagoEdit.id}`
            await axios.put(baseURL, data,


                headers

            ).then(mess => {
                this.getAll
                this.formVisible = false
            }).catch(erro => {
                console.log("error  al Editar " + erro)
            })

        },
        async saveControlPago() {
            const data = {
                servicioId: this.newControlPago.servicioId,
                clienteId: this.newControlPago.clienteId,
                totalPago: this.price
            }
            const headers = opciones
            const baseURL = `${import.meta.env.VITE_API_URL}/controlPago`
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
