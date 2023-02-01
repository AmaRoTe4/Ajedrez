import { TraducionDeNumeroAPos } from "../function/funciones"
import { Movimientos, PosicionEnElTablero } from "../interface"

interface Props{
    movimientos:Movimientos[]
}

export default function TableroDeJugadas({movimientos}:Props){
    const movimientosTablero:PosicionEnElTablero[] = movimientos.map(n => TraducionDeNumeroAPos(n.casilla))

    return (
        <div className="box-tablero-lateral col-3">
          <div>
            Movimientos
          </div>
          <ul>
            {movimientos.map(((n , i) => 
              <li key={i} style={{
                  backgroundColor: `${n.id % 2 === 0 ? "white" : "black"}`,
                  color: `${n.id % 2 !== 0 ? "white" : "black"}`,
                }}>
                <span style={{width: "10%" , borderRight: `${n.id % 2 === 0 ? "1px solid black" : "1px solid white"}`}}>
                  {n.id} 
                </span>
                <span style={{width: "90%"}}>
                  {n.piesa.toLocaleUpperCase()} 
                  {movimientosTablero[i].x} 
                  {movimientosTablero[i].y} 
                </span>
              </li>
            ))}
          </ul>
        </div>
    )
}