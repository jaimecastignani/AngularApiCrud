import { Promotion } from "./promotion";
import { ReceptionStatus } from "./reception-status";

export class ClientReception {
    public idRecepcion: number;
    public idProveedor: number;
    public nombreProveedor: string;
    public promocion: Promotion;
    public estadoRecepcion: ReceptionStatus;
    public cantidadSolicitada: number;
    public idPromocion: number;
    public pdteRecibir: boolean;
    public cerrado: boolean;
    public tituloPromocion: string;
    public abierto: boolean;
    public pdteMontaje: boolean;
    public descripcionProveedor: string;
    public descripcionPromocion: string;
}
