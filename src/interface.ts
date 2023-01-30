export interface Piesa{
    index: number;
    piesa: string;
    movimientosR: number;
    posiblesMov?: number[]; 
}

export interface Movimientos{
    id: number;
    color: number;
    piesa: string;
    casilla: number;
    captura: string; 
}