import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchWrapper } from '@/helpers';
import { message } from 'ant-design-vue';
import { useToast } from 'vue-toastification';
const toast = useToast();

const baseUrl = `${import.meta.env.VITE_API_URL}/factura/all`;
const opciones = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
    }
}

export const useFacturasStore = defineStore('facturas', {

    state: () => ({
        facturas: [],
        facturaEdit: {

        },
        formVisible: false,
        formVisibleNew: false,
        newFactura: {
            dpiUrl: null,
            clienteId: null,
            noNiss: null,
            fechaVenRtu: null,
            fechaVenFactura: null,
            idEstadoFactura: null
        }
    }),
    actions: {
        setDpiUrl(url) {
            this.newFactura.dpiUrl = url
        },
        async getAll() {
            const headers = opciones
            await axios.get(baseUrl, headers)
                .then(facturas => {

                    this.facturas = facturas.data.data
                })
                .catch(error => this.facturas = { error })
        },
        setFacturaEdit(id) {
            this.formVisible = true
            this.title = "Modulo de Editar Usuario"
            let factura = this.facturas.find(factura => factura.id == id)
            if (factura) {
                this.facturaEdit = factura
                this.facturaEdit.dpiUrl= 'https://drive.google.com/uc?id='+ factura.dpiUrl
            }
            else { this.facturaEdit = [] }

        },
        setFacturaNew() {

            this.newFactura.fechaVenFactura = ''
            this.newFactura.fechaVenRtu = ''
            this.newFactura.dpiUrl = ''
            this.newFactura.noNiss = 0
            this.formVisibleNew = true
        },
        onCloseFormE() {
            this.formVisible = false
        },
        onCloseNewF() {
            this.formVisibleNew = false
        },
        async deleteFactura(id) {
            const baseURL = `${import.meta.env.VITE_API_URL}/factura/${id}`
            await axios.delete(baseURL, opciones).then(message => {
                this.getAll()
            }).catch(err =>
                console.log("error al Eliminar factura")
            )
        },
        async saveEdited() {
            const data = {
                dpiUrl: this.facturaEdit.dpiUrl,
                clienteId: this.facturaEdit.clienteId,
                noNiss: this.facturaEdit.noNiss,
                fechaVenFactura: this.facturaEdit.fechaVenFactura,
                fechaVenRtu: this.facturaEdit.fechaVenRtu,
                idEstadoFactura: this.facturaEdit.idEstadoFactura

            }
            const headers = opciones
            const baseURL = `${import.meta.env.VITE_API_URL}/factura/${this.facturaEdit.id}`
            await axios.put(baseURL, data,


                headers

            ).then(mess => {
                this.getAll
                this.formVisible = false
            }).catch(erro => {
                console.log("error  al Editar " + erro)
            })

        },
        async saveFactura() {
            const data = {

                dpiUrl: this.newFactura.dpiUrl,
                clienteId: this.newFactura.clienteId,
                noNiss: this.newFactura.noNiss,
                fechaVenFactura: this.newFactura.fechaVenFactura,
                fechaVenRtu: this.newFactura.fechaVenRtu,
                idEstadoFactura: this.newFactura.idEstadoFactura
            }
            const headers = opciones
            const baseURL = `${import.meta.env.VITE_API_URL}/factura`
            await axios.post(baseURL, data, headers).then(mess => {
                this.getAll()
                this.formVisibleNew = false
                toast.success('Registrado con exito!')
            }).catch(erro => {
                toast.info("Error Verifica los datos de la Fa ")
            })

        }
    },
    getters: {

    }


});
