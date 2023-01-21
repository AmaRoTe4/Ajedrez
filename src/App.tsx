import { useState } from "react"
import PiesasN from "../data/piesaN.json"
import PiesasB from "../data/piesaB.json"
import PiesasTest from "../data/piesaTest.json"
import { Piesa } from "./interface"
import {conprobardorB , conprobardorN , conprobardorS , valorB , valorN , seleccionador , pathOfPhoto} from "./function/funciones"

function App() {
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
  const piesasB:Piesa[] = PiesasB
  const piesasN:Piesa[] = PiesasN
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
    <div className="content">
        <div className="box-tablero row">
          {casillas.map((n , i) => 
              <div 
                  key={i} 
                  className={`
                    casilla col-1 centrado 
                    ${(i % 2  === 0 && aux[Math.trunc(i / 8)] % 2 === 0) 
                    || (i % 2  !== 0 && aux[Math.trunc(i / 8)] % 2 !== 0)  
                    ? 'pintado' : ""}
                    ${conprobardorB(i , piesasB) ? "piesaBlanca" : ""}
                    ${conprobardorN(i , piesasN) ? "piesaNegra" : ""}
                    ${conprobardorS(i , seleccionado) || posibleCasillas.includes(i) ? "seleccionado" : ""} `
                  }
                  
                  onClick={e => {
                    e.preventDefault(); 
                    seleccionador(i , setSelecionado , piesasN , piesasB ,  setPosibleCasillas)}}

              >
                  {conprobardorB(i , piesasB) && 
                    <img src={pathOfPhoto(valorB(i , piesasB) , "b")} height={50} />
                  }  
                  {conprobardorN(i , piesasN) && 
                    <img src={pathOfPhoto(valorN(i , piesasN) , "n")} height={50} />
                  }  
                  <p style={{zIndex: "1"}}>
                    {i}
                  </p>
              </div>
          )}
        </div>
    </div>
  )
}

export default App
