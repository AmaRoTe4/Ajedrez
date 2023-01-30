import { useState } from "react"
import PiesasN from "../data/piesaN.json"
import PiesasB from "../data/piesaB.json"
import PiesasTest from "../data/piesaTest.json"
import { Movimientos, Piesa } from "./interface"
import {conprobardorB , conprobardorN , conprobardorS , valorB , valorN , seleccionador , pathOfPhoto, movimientoDePos, deseleccionar} from "./function/funciones"
import PantallaDeCoronar from "./components/coronado"

function App() {
  const [turno , setTurno] = useState<number>(1)
  const [seleccionado , setSelecionado] = useState<Piesa>({
    index: -1,
    piesa: 'p',
    movimientosR : 0
  })
  const [posibleCasillas , setPosibleCasillas] = useState<number[]>([])
  const [casillas , setCasillas] = useState<Number[]>([
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63
  ])
  const aux:number[] = [0,1,2,3,4,5,6,7]
  const [movimiento , setMovimiento] = useState<number>(0)
  const [movimientos , setMovimientos] = useState<Movimientos[]>([])
  const [piesasB , setPiesasB] = useState<Piesa[]>(PiesasB)
  const [piesasN , setPiesasN] = useState<Piesa[]>(PiesasN)
  
  //const piesasTest:Piesa[] = PiesasTest
  //return (
  //  <div className="content">
  //      <div className="box-tablero row">
  //        {casillas.map((n , i) => 
  //            <div 
  //                key={i} 
  //                className={`
  //                  casilla col-1 centrado 
  //                  ${(i % 2  === 0 && aux[Math.trunc(i / 8)] % 2 === 0) 
  //                  || (i % 2  !== 0 && aux[Math.trunc(i / 8)] % 2 !== 0)  
  //                  ? 'pintado' : ""}
  //                  ${conprobardorN(i , piesasTest) ? "piesaNegra" : ""}
  //                  ${conprobardorS(i , seleccionado) || posibleCasillas.includes(i) ? "seleccionado" : ""} `
  //                }
                  
  //                onClick={e => {
  //                  e.preventDefault(); 
  //                  seleccionador(i , setSelecionado , piesasTest , setPosibleCasillas)}}

  //            >
  //                {conprobardorN(i , piesasTest) && 
  //                  <img src={pathOfPhoto(valorN(i , piesasTest) , "n")} height={50} />
  //                }  
  //                <p style={{zIndex: "1"}}>
  //                  {i}
  //                </p>
  //            </div>
  //        )}
  //      </div>
  //  </div>
  //)

  return (
    <div className="content row">
      <div className="box-nav-bar col-12">
        <button className="btn btn-danger" style={{width: '150px'}} onClick={e => {e.preventDefault()}}>
          Reiniciar
        </button>
      </div>
      <PantallaDeCoronar 
        piesasB={piesasB}
        piesasN={piesasN}
        setPiesasB={setPiesasB}
        setPiesasN={setPiesasN}
      />
      <div className="box-external-tablero col-8">
        <div className={`box-tablero row ${turno === 1 ? "girado" : ""}`}>
          {casillas.map((n , i) => 
              <div 
                  key={i} 
                  className={`
                    casilla col-1 centrado 
                    ${(i % 2  === 0 && aux[Math.trunc(i / 8)] % 2 === 0) 
                    || (i % 2  !== 0 && aux[Math.trunc(i / 8)] % 2 !== 0)  
                    ? 'pintado' : ""}
                    ${conprobardorB(i , piesasB) ? `piesaBlanca ${turno === 1 ? "girado" : ""}` : ""}
                    ${conprobardorN(i , piesasN) ? `piesaNegra ${turno === 1 ? "girado" : ""}` : ""}
                    ${conprobardorS(i , seleccionado) || posibleCasillas.includes(i) ? "seleccionado" : ""} `
                  }
                  
                  onClick={e => {
                    e.preventDefault(); 
                      posibleCasillas.includes(i) 
                      ? movimientoDePos(
                        seleccionado.index, 
                        i, 
                        turno === 1 ? piesasB : piesasN,
                        turno === 1 ? piesasN : piesasB,
                        turno === 1 ? setPiesasB : setPiesasN,
                        turno === 1 ? setPiesasN : setPiesasB,
                        setSelecionado,
                        setPosibleCasillas,
                        setTurno,
                        setMovimientos,
                        movimiento,
                        setMovimiento,
                      )
                      : seleccionado.index === i
                      ? deseleccionar(setSelecionado , setPosibleCasillas)
                      : seleccionador(i , setSelecionado , piesasN , piesasB ,  setPosibleCasillas , turno)}
                    }

              >
                  {conprobardorB(i , piesasB) && 
                    <img src={pathOfPhoto(valorB(i , piesasB) , "b")} height={60} />
                  }  
                  {conprobardorN(i , piesasN) && 
                    <img src={pathOfPhoto(valorN(i , piesasN) , "n")} height={60} />
                  }  
                  {/*<p style={{zIndex: "1"}}>
                    {i}
                  </p>*/}
              </div>
          )}
        </div>
      </div>
      <div className="box-tablero-lateral col-3">
        {movimientos.map((n => 
            //color:  
          <li style={{
              backgroundColor: `${n.id % 2 === 0 ? "white" : "black"}`,
              color: `${n.id % 2 !== 0 ? "white" : "black"}`,
            }}>
            <div style={{width: "10%" , borderRight: "1px solid black"}}>
              {n.id} 
            </div>
            <div style={{width: "90%"}}>
              {n.piesa} 
              {n.casilla} 
            </div>
          </li>
        ))}
      </div>
    </div>
  )
}

export default App
