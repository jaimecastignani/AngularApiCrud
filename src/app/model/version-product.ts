import { Product } from "./product";

export class VersionProduct {
    public idVersionProducto: number;
    public referenciaInterna: string;
    public referenciaProveedor: string;
    public codigoBarras: string;
    public textoVersion: string;
    public nombre: string;
    public producto: Product;
    public peso: string;
}
