import { Piesa } from "../interface"

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

//movientos:

//enroques
//peon al paso
//coronar

const PosPeon = (
  pos:number,
  piesasN:Piesa[],
  piesasB:Piesa[]
):number[] => {
  let piesaActual:Piesa = piesasN.filter(n => n.index === pos)[0]
  let posActual = positionActual(pos)
  let PiesasN:number[] = piesasN.map(n => n.index)
  let PiesasB:number[] = piesasB.map(n => n.index)
  let Agregar:number[] = []

  if(!PiesasN.includes(pos - 8) && !PiesasB.includes(pos - 8)) Agregar.unshift(pos - 8) 
  if(!PiesasN.includes(pos - 16) && !PiesasB.includes(pos - 16) && piesaActual.movimientosR === 0 && Agregar.length !== 0) Agregar.unshift(pos - 16) 

  if((posActual[0] - 1) * 8 <= pos - 9 && (posActual[0] - 1) * 8 + 8 > pos - 9 && PiesasB.includes(pos - 9)) Agregar.unshift(pos - 9)
  if((posActual[0] - 1) * 8 <= pos - 7 && (posActual[0] - 1) * 8 + 8 > pos - 7 && PiesasB.includes(pos - 7)) Agregar.unshift(pos - 7)

  // -9 , -7

  return Agregar
}

const PosTorre = (
  pos:number,
  piesasN:Piesa[],
  piesasB:Piesa[],
):number[] => {
  let posAgregar: number[] = []
  let posActual = positionActual(pos)
  let PiesasN:number[] = piesasN.map(n => n.index)
  let PiesasB:number[] = piesasB.map(n => n.index)
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
      if(PiesasN.includes(auxPos)) BoolposArriba = false;
      if(BoolposArriba) posArriba.unshift(auxPos)
      if(PiesasB.includes(auxPos)) BoolposArriba = false;
    }
    if(BoolposAbajo && posAbajo[0] - 55 < 0)              {
      let auxPos = posAbajo[0] + 8
      if(PiesasN.includes(auxPos)) BoolposAbajo = false;
      if(BoolposAbajo) posAbajo.unshift(auxPos)
      if(PiesasB.includes(auxPos)) BoolposAbajo = false;
    }
    if(BoolposDer && ((posDer[0] + 1) % 8 !== 0))         {
      let auxPos = posDer[0] + 1
      if(PiesasN.includes(auxPos)) BoolposDer = false;
      if(BoolposDer) posDer.unshift(auxPos)
      if(PiesasB.includes(auxPos)) BoolposDer = false;
    }
    if(BoolposIzq && posIzq[0] % 8 !== 0)               {
      let auxPos = posIzq[0] - 1
      if(PiesasN.includes(auxPos)) BoolposIzq = false;
      if(BoolposIzq) posIzq.unshift(auxPos)
      if(PiesasB.includes(auxPos)) BoolposIzq = false;
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
  piesasN:Piesa[]
):number[] => {
  let posAgregar = []
  let posActual = positionActual(pos)
  let PiesasN:number[] = piesasN.map(n => n.index)

  if(pos - 17 >= posActual[0] * 8 - 16) posAgregar.push(pos - 17)
  if(pos - 15 < posActual[0] * 8 - 8) posAgregar.push(pos - 15)
  if(pos - 10 >= posActual[0] * 8 - 8) posAgregar.push(pos - 10)
  if(pos - 6 < posActual[0] * 8) posAgregar.push(pos - 6)

  if(pos + 17 >= posActual[0] * 8 + 16 && pos + 17 <= posActual[0] * 8 + 23) posAgregar.push(pos + 17)
  if(pos + 15 >= posActual[0] * 8 + 16 && pos + 15 <= posActual[0] * 8 + 23) posAgregar.push(pos + 15)
  if(pos + 10 >= posActual[0] * 8 + 8 && pos + 10 <= posActual[0] * 8 + 15) posAgregar.push(pos + 10)
  if(pos + 6 >= posActual[0] * 8 + 8 && pos + 6 <= posActual[0] * 8 + 15) posAgregar.push(pos + 6)

  return posAgregar.filter(n => n < 64 && n >= 0).filter(m => !PiesasN.includes(m))
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

  const posPiesasN:number[] = piesasN.map(n => n.index)
  const posPiesasB:number[] = piesasB.map(n => n.index)

  while(true){
      vueltas++
      //sup der
      if(CodsupDer && ((supDer[0] + 1) % 8 !== 0) && supDer[0] - 7 >= 0){ 
        let auxValue:number = supDer[0] - 7
        if(posPiesasN.includes(auxValue)){
          CodsupDer = false 
          continue
        } 
        supDer.unshift(auxValue)
        if(posPiesasB.includes(auxValue)) CodsupDer = false
      } 
      //sup izq
      if(CodsupIzq && (supIzq[0] % 8 !== 0) && supIzq[0] - 9 >= 0 ){ 
        let auxValue:number = supIzq[0] - 9
        if(posPiesasN.includes(auxValue)){
          CodsupIzq = false 
          continue
        } 
        supIzq.unshift(auxValue)
        if(posPiesasB.includes(auxValue)) CodsupIzq = false
      }
      //inf der
      if(CodinfDer && ((infDer[0] + 1) % 8 !== 0) && infDer[0] + 9 <= 64 ){ 
        let auxValue:number = infDer[0] + 9
        if(posPiesasN.includes(auxValue)){
          CodinfDer = false; 
          continue
        } 
        infDer.unshift(auxValue)
        if(posPiesasB.includes(auxValue)) CodinfDer = false;
      }
      //inf izq
      if(CodinfIzq && (infIzq[0] % 8 !== 0) && infIzq[0] + 7 <= 64 ){ 
        let auxValue:number = infIzq[0] + 7
        if(posPiesasN.includes(auxValue)){
          CodinfIzq = false  
          continue
        } 
        infIzq.unshift(auxValue)
        if(posPiesasB.includes(auxValue)) CodinfIzq = false 
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
):number[] => {
  let posAgregar:number[] = []
  let filtro:number[] = piesasN.filter(n => n.index !== pos).map(m => m.index)

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
    return [pos - 1 , pos - 7 , pos - 8 , pos - 9 , pos + 1 , pos + 7 , pos + 8 , pos + 9].filter(n => n < 64 && n >= 0).filter(m => !filtro.includes(m))
  }


  return posAgregar.filter(m => !filtro.includes(m)).filter(n => n < 64 && n >= 0)
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
      break;
    case "t":
      return PosTorre(
        aux.index,
        piesasN,
        piesasB  
      )
      break;
    case "c":
      return PosCaballo(
        aux.index,
        piesasN,
      )
      break;
    case "a":
      return PosAlfil(
        aux.index,
        piesasN,
        piesasB
      )
      break;
    case "d":
      return PosDama(
        aux.index,
        piesasN,
        piesasB
      )
      break;
    case "r":
      return PosRey(
        aux.index,
        piesasN
      )
      break;
}
  return [0,0]
}


export const seleccionador = (
        i:number , 
        setSelecionado:React.Dispatch<React.SetStateAction<Piesa>>,
        piesasN:Piesa[],
        piesasB:Piesa[],
        setPosibleCasillas:React.Dispatch<React.SetStateAction<number[]>>,
    ) => {
    const aux:Piesa[] = piesasN.filter(n => n.index === i);
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

    console.log(retorno.filter((n , i) => {
      return i === retorno.indexOf(n)
    }))

    setSelecionado(aux[0])
}