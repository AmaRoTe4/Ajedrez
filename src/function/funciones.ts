import { Movimientos, Piesa } from "../interface"

export const pathOfPhoto = (valor:string , tipe:string):string => {
    switch (valor) {
        case "p":
            return `../public/Images/Peon${tipe === 'n' ? 'Negro' : 'Blanco'}.png`
            break;
        case "t":
            return `../public/Images/Torre${tipe === 'n' ? 'Negro' : 'Blanco'}.png`
            break;
        case "c":
            return `../public/Images/Caballo${tipe === 'n' ? 'Negro' : 'Blanco'}.png`
            break;
        case "a":
            return `../public/Images/Alfil${tipe === 'n' ? 'Negro' : 'Blanco'}.png`
            break;
        case "d":
            return `../public/Images/Reina${tipe === 'n' ? 'Negro' : 'Blanco'}.png`
            break;
        case "r":
            return `../public/Images/Rey${tipe === 'n' ? 'Negro' : 'Blanco'}.png`
            break;
    }
    return ""
}

export const conprobardorB = (i:number , piesasB:Piesa[]):boolean => {
    const aux:number[] = piesasB.map(n => n.index)
    return aux.includes(i)
}

export const conprobardorN = (i:number , piesasN:Piesa[]):boolean => {
  const aux:number[] = piesasN.map(n => n.index)
  return aux.includes(i)
}

export const conprobardorS = (i:number , seleccionado:Piesa):boolean => {
  if(seleccionado === undefined) return false 
  return seleccionado.index === i
}

export const valorB = (i:number , piesasB:Piesa[]):string => {
  const aux:Piesa[] = piesasB.filter(n => n.index === i);
  return aux[0].piesa
}

export const valorN = (i:number , piesasN:Piesa[]):string => {
  const aux:Piesa[] = piesasN.filter(n => n.index === i);
  return aux[0].piesa
}

//basic for now
//sin funcion por ahora
const positionActual = (casAct:number):number[] => {
    let ejes:number[] = [0, 0];
    for(let i = -1; i < casAct ; i+=8){
      ejes[0] += 1
    }  
    for(let i = 0; i < (casAct + 8 - ejes[0] * 8) ; i++){
      ejes[1] += 1
    }  
    ejes[0] -= 1
    return ejes;
}

const obtenerValoresPooisblesDeCas = (
  aux:Piesa,
  piesasN:Piesa[],
  piesasB:Piesa[],
):number[] => {
  switch (aux.piesa) {
    case "p":
      return PosPeon(
        aux.index,
        piesasN,
        piesasB  
      )
    case "t":
      return PosTorre(
        aux.index,
        piesasN,
        piesasB  
      )
    case "c":
      return PosCaballo(
        aux.index,
        piesasN,
        piesasB
      )
    case "a":
      return PosAlfil(
        aux.index,
        piesasN,
        piesasB
      )
    case "d":
      return PosDama(
        aux.index,
        piesasN,
        piesasB
      )
    case "r":
      return PosRey(
        aux.index,
        piesasN,
        piesasB,
      )
}
  return [0,0]
}

const obtenerValorPeonAtaque = (piesasRival:Piesa[] , color:number):number[] => {
  let retorno:number[] = []
  let peonesLaterales:number[] = piesasRival.filter(n => (n.index % 8 === 0 || (n.index + 1) % 8 === 0) && n.piesa === "p").map(n => n.index);
  let peonesCentrales:number[] = piesasRival.filter(n => !(n.index % 8 === 0 || (n.index + 1) % 8 === 0) && n.piesa === "p").map(n => n.index)
  
  if(color === 0){
    peonesLaterales.map(n => {
      n % 8 === 0 
      ? retorno.push(n - 7)
      : (n + 1) % 8 === 0 
      ? retorno.push(n - 9) 
      : ""
    }) 
    peonesCentrales.map(n => {
      retorno.push(n - 7)
      retorno.push(n - 9)
    })
  }else{
    peonesLaterales.map(n => {
      n % 8 === 0 
      ? retorno.push(n + 7)
      : (n + 1) % 8 === 0 
      ? retorno.push(n + 9)
      : ""
    })
    peonesCentrales.map(n => {
      retorno.push(n + 7)
      retorno.push(n + 9)
    })
  }

  return retorno
}

const PosPeon = (
  pos:number,
  piesasN:Piesa[],
  piesasB:Piesa[]
):number[] => {
  let piesaActual:Piesa = piesasN.filter(n => n.index === pos)[0]
  if(piesaActual === undefined) piesasB.map(n => n.index === pos ? piesaActual = n : "")
  let posActual = positionActual(pos)

  let PiesasN:number[] = piesasN.map(n => n.index)
  let PiesasB:number[] = piesasB.map(n => n.index)
  let Agregar:number[] = []

  if(PiesasN.includes(pos)){
    if(!PiesasN.includes(pos - 8) && !PiesasB.includes(pos - 8)) Agregar.unshift(pos - 8) 
    if(!PiesasN.includes(pos - 16) && !PiesasB.includes(pos - 16) && piesaActual.movimientosR === 0 && Agregar.length !== 0) Agregar.unshift(pos - 16) 
  
    if((posActual[0] - 1) * 8 <= pos - 9 && (posActual[0] - 1) * 8 + 8 > pos - 9 && PiesasB.includes(pos - 9)) Agregar.unshift(pos - 9)
    if((posActual[0] - 1) * 8 <= pos - 7 && (posActual[0] - 1) * 8 + 8 > pos - 7 && PiesasB.includes(pos - 7)) Agregar.unshift(pos - 7)
  }
  else{
    if(!PiesasB.includes(pos + 8) && !PiesasN.includes(pos + 8)) Agregar.unshift(pos + 8) 
    if(!PiesasB.includes(pos + 16) && !PiesasN.includes(pos + 16) && piesaActual.movimientosR === 0 && Agregar.length !== 0) Agregar.unshift(pos + 16) 

    if((posActual[0] + 1) * 8 <= pos + 9 && (posActual[0] + 1) * 8 + 8 > pos + 9 && PiesasN.includes(pos + 9)) Agregar.unshift(pos + 9)
    if((posActual[0] + 1) * 8 <= pos + 7 && (posActual[0] + 1) * 8 + 8 > pos + 7 && PiesasN.includes(pos + 7)) Agregar.unshift(pos + 7)
  }

  return Agregar
}

const PosTorre = (
  pos:number,
  piesasN:Piesa[],
  piesasB:Piesa[],
):number[] => {
  let posAgregar: number[] = []
  let posActual = positionActual(pos)
  let PiesaN:number[] = piesasN.map(n => n.index)
  let PiesaB:number[] = piesasB.map(n => n.index)
  let PiesaAPropia:number[] = []
  let PiesaContraria:number[] = []

  if(PiesaN.includes(pos)){
    piesasN.map(n => PiesaAPropia.push(n.index))
    piesasB.map(n => PiesaContraria.push(n.index))
  }else{
    piesasB.map(n => PiesaAPropia.push(n.index))
    piesasN.map(n => PiesaContraria.push(n.index))
  }


  let posArriba: number[] = [pos];
  let posAbajo: number[] = [pos];
  let posDer: number[] = [pos];
  let posIzq: number[] = [pos];
  let max = 0
  let BoolposArriba = true
  let BoolposAbajo = true
  let BoolposDer = true
  let BoolposIzq = true

  while(true){
    max++
    
    if(BoolposArriba && posArriba[0] - posActual[1] !== 0) {
      let auxPos = posArriba[0] - 8
      if(PiesaAPropia.includes(auxPos)) BoolposArriba = false;
      if(BoolposArriba) posArriba.unshift(auxPos)
      if(PiesaContraria.includes(auxPos)) BoolposArriba = false;
    }
    if(BoolposAbajo && posAbajo[0] - 55 < 0)              {
      let auxPos = posAbajo[0] + 8
      if(PiesaAPropia.includes(auxPos)) BoolposAbajo = false;
      if(BoolposAbajo) posAbajo.unshift(auxPos)
      if(PiesaContraria.includes(auxPos)) BoolposAbajo = false;
    }
    if(BoolposDer && ((posDer[0] + 1) % 8 !== 0))         {
      let auxPos = posDer[0] + 1
      if(PiesaAPropia.includes(auxPos)) BoolposDer = false;
      if(BoolposDer) posDer.unshift(auxPos)
      if(PiesaContraria.includes(auxPos)) BoolposDer = false;
    }
    if(BoolposIzq && posIzq[0] % 8 !== 0)               {
      let auxPos = posIzq[0] - 1
      if(PiesaAPropia.includes(auxPos)) BoolposIzq = false;
      if(BoolposIzq) posIzq.unshift(auxPos)
      if(PiesaContraria.includes(auxPos)) BoolposIzq = false;
    }

    if(
      (posArriba[0] - posActual[1] === 0
      && posAbajo[0] - 55 > 0
      && (posDer[0] + 1) % 8 === 0
      && posIzq[0] % 8 === 0) || max === 100
    ) break
  }

  posArriba.map(n => posAgregar.unshift(n))
  posAbajo.map(n => posAgregar.unshift(n))
  posDer.map(n => posAgregar.unshift(n))
  posIzq.map(n => posAgregar.unshift(n))

  if(posAgregar.length > 0) return posAgregar
  
  return [0] 
}

const PosCaballo = (
  pos:number,
  piesasN:Piesa[],
  piesasB:Piesa[]
):number[] => {
  let posAgregar = []
  let posActual = positionActual(pos)
  let PiesasN:number[] = piesasN.map(n => n.index)
  let PiesasB:number[] = piesasB.map(n => n.index)

  if(pos - 17 >= posActual[0] * 8 - 16) posAgregar.push(pos - 17)
  if(pos - 15 < posActual[0] * 8 - 8) posAgregar.push(pos - 15)
  if(pos - 10 >= posActual[0] * 8 - 8) posAgregar.push(pos - 10)
  if(pos - 6 < posActual[0] * 8) posAgregar.push(pos - 6)

  if(pos + 17 >= posActual[0] * 8 + 16 && pos + 17 <= posActual[0] * 8 + 23) posAgregar.push(pos + 17)
  if(pos + 15 >= posActual[0] * 8 + 16 && pos + 15 <= posActual[0] * 8 + 23) posAgregar.push(pos + 15)
  if(pos + 10 >= posActual[0] * 8 + 8 && pos + 10 <= posActual[0] * 8 + 15) posAgregar.push(pos + 10)
  if(pos + 6 >= posActual[0] * 8 + 8 && pos + 6 <= posActual[0] * 8 + 15) posAgregar.push(pos + 6)

  return posAgregar.filter(n => n < 64 && n >= 0).filter(m => (
    !PiesasN.includes(m) && PiesasN.includes(pos)) 
    || (!PiesasB.includes(m) && PiesasB.includes(pos)))
}

const PosAlfil = (
  pos:number,
  piesasN:Piesa[],
  piesasB:Piesa[],
):number[] => {
  let supDer:number[] = [pos]
  let supIzq:number[] = [pos]
  let infDer:number[] = [pos]
  let infIzq:number[] = [pos]
  let CodsupDer:boolean = true
  let CodsupIzq:boolean = true
  let CodinfDer:boolean = true
  let CodinfIzq:boolean = true
  let vueltas = 0;

  const PiesasN:number[] = piesasN.map(n => n.index)
  const PiesasB:number[] = piesasB.map(n => n.index)
  let PiesasAPropia:number[] = []
  let PiesasContrario:number[] = []

  if(PiesasN.includes(pos)){
    piesasN.map(n => PiesasAPropia.push(n.index))
    piesasB.map(n => PiesasContrario.push(n.index))
  }else{
      piesasB.map(n => PiesasAPropia.push(n.index))
      piesasN.map(n => PiesasContrario.push(n.index))
  }

  while(true){
      vueltas++
      //sup der
      if(CodsupDer && ((supDer[0] + 1) % 8 !== 0) && supDer[0] - 7 >= 0){ 
        let auxValue:number = supDer[0] - 7
        if(PiesasAPropia.includes(auxValue)){
          CodsupDer = false 
          continue
        } 
        supDer.unshift(auxValue)
        if(PiesasContrario.includes(auxValue)) CodsupDer = false
      } 
      //sup izq
      if(CodsupIzq && (supIzq[0] % 8 !== 0) && supIzq[0] - 9 >= 0 ){ 
        let auxValue:number = supIzq[0] - 9
        if(PiesasAPropia.includes(auxValue)){
          CodsupIzq = false 
          continue
        } 
        supIzq.unshift(auxValue)
        if(PiesasContrario.includes(auxValue)) CodsupIzq = false
      }
      //inf der
      if(CodinfDer && ((infDer[0] + 1) % 8 !== 0) && infDer[0] + 9 <= 64 ){ 
        let auxValue:number = infDer[0] + 9
        if(PiesasAPropia.includes(auxValue)){
          CodinfDer = false; 
          continue
        } 
        infDer.unshift(auxValue)
        if(PiesasContrario.includes(auxValue)) CodinfDer = false;
      }
      //inf izq
      if(CodinfIzq && (infIzq[0] % 8 !== 0) && infIzq[0] + 7 <= 64 ){ 
        let auxValue:number = infIzq[0] + 7
        if(PiesasAPropia.includes(auxValue)){
          CodinfIzq = false  
          continue
        } 
        infIzq.unshift(auxValue)
        if(PiesasContrario.includes(auxValue)) CodinfIzq = false 
      }

      if(
        (
            (supDer[0] + 1) % 8 === 0
        &&  supIzq[0]  % 8 === 0
        &&  (infDer[0] + 1) % 8 === 0
        &&  infIzq[0]  % 8 === 0)
        || vueltas === 100
      ) break;
  }

  return [...supDer , ...supIzq , ...infDer , ...infIzq]
}

const PosDama = (
  pos:number,
  piesasN:Piesa[],
  piesasB:Piesa[],
):number[] => {
  const alfil:number[] = PosAlfil(
    pos,
    piesasN,
    piesasB,  
  );
  const torre:number[] = PosTorre(
    pos,
    piesasN,
    piesasB,  
  );
  return [...alfil , ...torre]
}

const PosRey = (
  pos:number,
  piesasN:Piesa[],
  piesasB:Piesa[],
):number[] => {
  let posAgregar:number[] = []
  let posEnroque:number[] = []
  let color:number = 0
  const PiesasN:number[] = piesasN.map(n => n.index)
  let piesas:Piesa[] = []
  let piesasRival:Piesa[] = []
  let filtro:number[] = []
  
  if(PiesasN.includes(pos)){
    color = 1
    piesasN.filter(n => n.index !== pos).map(m => filtro.push(m.index))
    piesasN.map(n => piesas.push(n))
    piesasB.map(n => piesasRival.push(n))
  }else{
    piesasB.filter(n => n.index !== pos).map(m => filtro.push(m.index))
    piesasB.map(n => piesas.push(n))
    piesasN.map(n => piesasRival.push(n))
  }

  let posiblesPosDelRival:number[] = []
  piesasRival.map(n => n.piesa !== "r" && n.piesa !== "p"
    ? posiblesPosDelRival.push(...obtenerValoresPooisblesDeCas(n, piesasRival , piesas))
    : "" 
  ) 
  
  let aux2 = obtenerValorPeonAtaque(piesasRival , color)
  aux2.map(n => posiblesPosDelRival.push(n))
  
  posiblesPosDelRival.filter(n => n !== pos).map(m => filtro.push(m))

  let aux = posiblesPosDelRival.filter((n , i) => {
    return i === posiblesPosDelRival.indexOf(n); 
  })

  const exprecionEnroqueCorto = () => {
    let exprecion:boolean = false;
    color === 0 
    ? exprecion =  (
      ((piesas.filter(n => n.piesa === "t" && n.index === 0 && n.movimientosR === 0).length === 0) 
      || (piesas.filter(n => n.piesa === "r" && n.index === 3 && n.movimientosR === 0).length === 0)
      || (piesas.filter(n => n.index === 1 || n.index === 2).length !== 0) 
      || aux.includes(3) || aux.includes(1) || aux.includes(2)
      )
    )
    : exprecion = (
      ((piesas.filter(n => n.piesa === "t" && n.index === 56 && n.movimientosR === 0).length === 0) 
      || (piesas.filter(n => n.piesa === "r" && n.index === 59 && n.movimientosR === 0).length === 0)
      || (piesas.filter(n => n.index === 57 || n.index === 58).length !== 0) 
      || aux.includes(59) || aux.includes(58) || aux.includes(57)
      )
    )
    return exprecion
  }

  const exprecionEnroqueLargo = () => {
    let exprecion:boolean = false;
    color === 0 
    ? exprecion = (
      ((piesas.filter(n => n.piesa === "t" && n.index === 7 && n.movimientosR === 0).length === 0) 
      || (piesas.filter(n => n.piesa === "r" && n.index === 3 && n.movimientosR === 0).length === 0)
      || (piesas.filter(n => n.index === 4 || n.index === 5 || n.index === 6 ).length !== 0)
      || (piesasRival.filter(n => n.index === 4 || n.index === 5 || n.index === 6 ).length !== 0)
      || aux.includes(4) || aux.includes(5) || aux.includes(3)
      )
    )
    : exprecion = (
      ((piesas.filter(n => n.piesa === "t" && n.index === 63 && n.movimientosR === 0).length === 0) 
      || (piesas.filter(n => n.piesa === "r" && n.index === 59 && n.movimientosR === 0).length === 0)
      || (piesas.filter(n => n.index === 60 || n.index === 61 || n.index === 62 ).length !== 0)
      || aux.includes(60) || aux.includes(62) || aux.includes(61) || aux.includes(59)
      )
    )
    return exprecion;
  }

  if(!exprecionEnroqueCorto() && color === 1) posEnroque.push(57)
  if(!exprecionEnroqueCorto() && color === 0) posEnroque.push(1)
  if(!exprecionEnroqueLargo() && color === 1) posEnroque.push(61)
  if(!exprecionEnroqueLargo() && color === 0) posEnroque.push(5)

  if(pos === 0){
    posAgregar.push(pos + 1)
    posAgregar.push(pos + 8)
    posAgregar.push(pos + 9)
  }else if(pos === 7){
    posAgregar.push(pos - 1)
    posAgregar.push(pos + 8)
    posAgregar.push(pos + 7)
  }else if(pos === 63){
    posAgregar.push(pos - 1)
    posAgregar.push(pos - 8)
    posAgregar.push(pos - 9)
  }else if(pos === 56){
    posAgregar.push(pos + 1)
    posAgregar.push(pos - 8)
    posAgregar.push(pos - 7)
  }else if(pos % 8 === 0 ){
      posAgregar.push(pos - 8)
      posAgregar.push(pos - 7)
      posAgregar.push(pos + 1)
      posAgregar.push(pos + 8)
      posAgregar.push(pos + 9)
  }else if((pos + 1) % 8 === 0 ){
    posAgregar.push(pos - 8)
    posAgregar.push(pos - 9)
    posAgregar.push(pos - 1)
    posAgregar.push(pos + 8)
    posAgregar.push(pos + 7)
  }else{
    return [...[pos - 1 , pos - 7 , pos - 8 , pos - 9 , pos + 1 , pos + 7 , pos + 8 , pos + 9].filter(n => n < 64 && n >= 0).filter(m => !filtro.includes(m)) , ...posEnroque]
  }

  return [...posAgregar.filter(m => !filtro.includes(m)).filter(n => n < 64 && n >= 0) , ...posEnroque]
}

const enroqueCorto = (
  piesas:Piesa[],
  setPiesas:React.Dispatch<React.SetStateAction<Piesa[]>>,
  color:boolean,
) => {
  let newPiesas:Piesa[] = []
  let Rey:Piesa = piesas.filter(n => n.index === 3)[0]
  let Torre:Piesa = piesas.filter(n => n.index === 0)[0]

  if(!color){
    piesas.map(n => n.index !== 3 && n.index !== 0 ? newPiesas.push(n) : "")
    Rey = piesas.filter(n => n.index === 3)[0]
    Torre = piesas.filter(n => n.index === 0)[0]
    
    Rey.index = 1
    Torre.index = 2
  }else{
    piesas.map(n => n.index !== 59 && n.index !== 56 ? newPiesas.push(n) : "")
    Rey = piesas.filter(n => n.index === 59)[0]
    Torre = piesas.filter(n => n.index === 56)[0]
    
    Rey.index = 57
    Torre.index = 58
  }

  Rey.movimientosR++
  Torre.movimientosR++

  newPiesas.push(Rey)
  newPiesas.push(Torre)

  setPiesas(newPiesas)
}

const enroqueLargo = (
  piesas:Piesa[],
  setPiesas:React.Dispatch<React.SetStateAction<Piesa[]>>,
  color:boolean,
) => {
  let newPiesas:Piesa[] = []
  let Rey:Piesa
  let Torre:Piesa

  if(!color){
    piesas.map(n => n.index !== 3 && n.index !== 7 ? newPiesas.push(n) : "")
    Rey = piesas.filter(n => n.index === 3)[0]
    Torre = piesas.filter(n => n.index === 7)[0]
    
    Rey.index = 5
    Torre.index = 4
  }else{
    piesas.map(n => n.index !== 59 && n.index !== 63 ? newPiesas.push(n) : "")
    Rey = piesas.filter(n => n.index === 59)[0]
    Torre = piesas.filter(n => n.index === 63)[0]
    
    Rey.index = 61
    Torre.index = 60
  }

  newPiesas.push(Rey)
  newPiesas.push(Torre)

  setPiesas(newPiesas)
}

export const seleccionador = (
        i:number , 
        setSelecionado:React.Dispatch<React.SetStateAction<Piesa>>,
        piesasN:Piesa[],
        piesasB:Piesa[],
        setPosibleCasillas:React.Dispatch<React.SetStateAction<number[]>>,
        turno:number,
    ) => {
    let aux:Piesa[] = piesasN.filter(n => n.index === i && turno === 0);
    
    if(aux.length === 0 && turno === 1) piesasB.map(n => n.index === i ? aux.push(n) : "");

    if(aux.length === 0) {
      setSelecionado({
        index: -1,
        piesa: "",
        movimientosR: 0
      })
      setPosibleCasillas([])
      return 
    }
    const retorno:number[] = 
    obtenerValoresPooisblesDeCas(
      aux[0],
      piesasN,
      piesasB,
    )
    
    setPosibleCasillas(retorno.filter((n , i) => {
      return i === retorno.indexOf(n)
    }))

    //console.log(retorno.filter((n , i) => {
    //  return i === retorno.indexOf(n)
    //}))

    setSelecionado(aux[0])
}

export const movimientoDePos = (
  posActual:number , 
  newPos:number , 
  piesas:Piesa[],
  piesasRival:Piesa[],
  setPiesas:React.Dispatch<React.SetStateAction<Piesa[]>>,
  setPiesasRival:React.Dispatch<React.SetStateAction<Piesa[]>>,
  setSelecionado:React.Dispatch<React.SetStateAction<Piesa>>,
  setPosibleCasillas:React.Dispatch<React.SetStateAction<number[]>>,
  setTurno:React.Dispatch<React.SetStateAction<number>>,
  setMovimientos:React.Dispatch<React.SetStateAction<Movimientos[]>>,
  movimiento:number,
  setMovimiento:React.Dispatch<React.SetStateAction<number>>,
) => {
  let piesa:Piesa = piesas.filter(n => n.index === posActual)[0]
  let piesasFilter:Piesa[] = piesas.filter(n => n.index !== posActual)
  let piesasFilterRival:Piesa[] = piesasRival.filter(n => n.index !== newPos)

  let NewMovimiento:Movimientos = {
    id: movimiento,
    color: movimiento % 2 === 0 ? 0 : 1,
    piesa: piesa.piesa ,
    casilla: newPos,
    captura: "", 
  } 

  if(piesa.piesa === 'r' && (newPos === 57 || newPos === 1) && piesa.movimientosR === 0){
    enroqueCorto(piesas , setPiesas , newPos === 57)
  } 

  else if(piesa.piesa === 'r' && (newPos === 61 || newPos === 5) && piesa.movimientosR === 0){
    enroqueLargo(piesas , setPiesas , newPos === 61)
  } 

  else{    
    piesa.index = newPos
    piesa.movimientosR++
    piesasFilter.push(piesa)  
  
    setPiesas(piesasFilter)
    setPiesasRival(piesasFilterRival)
  }

  setSelecionado({
    index: -1,
    piesa: '',
    movimientosR : 0
  })
  setPosibleCasillas([])
  setTurno(n => n === 0 ? 1 : 0)
  setMovimiento(n => n + 1)
  setMovimientos(n => [...n , NewMovimiento])    
}

export const deseleccionar = (
  setSelecionado:React.Dispatch<React.SetStateAction<Piesa>>,
  setPosibleCasillas:React.Dispatch<React.SetStateAction<number[]>>,
  ) => {
    setSelecionado({
      index: -1,
      piesa: 'p',
      movimientosR : 0
    })
    setPosibleCasillas([])
}

export const coronarPiesa = (
  piesas:Piesa[],
  setPiesas:React.Dispatch<React.SetStateAction<Piesa[]>>,
  newPiesaValue: string
) => {
  let piesa:Piesa = piesas.filter(n => n.index < 8 || n.index > 55).filter(n => n.piesa === "p")[0]
  let newPiesas:Piesa[] = piesas.filter(n => n.index !== piesa.index)

  piesa.piesa = newPiesaValue
  newPiesas.push(piesa);

  setPiesas(newPiesas)
}

//tenemos que intergrar el enroque en las funciones...