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

//movimientos:(solo con las negras por ahora)
//P:  salida 2 para adelante
//    de a uno para adelante
//    come a los lados
//    al paso
//    coronacion
//T:  a los lados para arriba y abajo
//    enroque
//C:  En L
//A:  en diagonal
//D:  torre y alfil
//R:  de a uno
//    enroque

//movimientos basicos:(solo con las negras por ahora)
//P:  -8
//T:  coluna and fila , dependiendo del lugar
//C:  -17 , -15 , -10 , -6  , -=  
//A:  -7 -9 , -=
//D:   A and T
//R:   -1 -7 -8 -9 , -=

const PosPeon = (pos:number):number[] => {
  return [pos - 8]
}

const PosTorre = (pos:number):number[] => {
  let posAgregar = []
  let posActual = positionActual(pos)

  for(let i = posActual[0] * 8; i < posActual[0] * 8 + 8; i++){
    posAgregar.push(i)
  }

  for(let i = posActual[1]; i < 64; i+=8){
    posAgregar.push(i)
  }

  return posAgregar
}

const PosCaballo = (pos:number):number[] => {
  let posAgregar = []
  let posActual = positionActual(pos)

  if(pos - 17 >= posActual[0] * 8 - 16) posAgregar.push(pos - 17)
  if(pos - 15 < posActual[0] * 8 - 8) posAgregar.push(pos - 15)
  if(pos - 10 >= posActual[0] * 8 - 8) posAgregar.push(pos - 10)
  if(pos - 6 < posActual[0] * 8) posAgregar.push(pos - 6)

  if(pos + 17 >= posActual[0] * 8 + 16 && pos + 17 <= posActual[0] * 8 + 23) posAgregar.push(pos + 17)
  if(pos + 15 >= posActual[0] * 8 + 16 && pos + 15 <= posActual[0] * 8 + 23) posAgregar.push(pos + 15)
  if(pos + 10 >= posActual[0] * 8 + 8 && pos + 10 <= posActual[0] * 8 + 15) posAgregar.push(pos + 10)
  if(pos + 6 >= posActual[0] * 8 + 8 && pos + 6 <= posActual[0] * 8 + 15) posAgregar.push(pos + 6)

  return posAgregar.filter(n => n < 64 && n >= 0)
}

const PosAlfil = (pos:number):number[] => {
  let supDer:number[] = [pos]
  let supIzq:number[] = [pos]
  let infDer:number[] = [pos]
  let infIzq:number[] = [pos]
  let vueltas = 0;

  while(true){
      vueltas++
      //sup der
      if(((supDer[0] + 1) % 8 !== 0) && supDer[0] - 7 >= 0 ) supDer.unshift(supDer[0] - 7) 
      //sup izq
      if((supIzq[0] % 8 !== 0) && supIzq[0] - 9 >= 0 ) supIzq.unshift(supIzq[0] - 9)
      //inf der
      if(((infDer[0] + 1) % 8 !== 0) && infDer[0] + 9 <= 64 ) infDer.unshift(infDer[0] + 9)
      //inf izq
      if((infIzq[0] % 8 !== 0) && infIzq[0] + 7 <= 64 ) infIzq.unshift(infIzq[0] + 7)

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

const PosDama = (pos:number):number[] => {
  const alfil:number[] = PosAlfil(pos);
  const torre:number[] = PosTorre(pos);
  return [...alfil , ...torre]
}

const PosRey = (pos:number):number[] => {
  let posAgregar:number[] = []

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
    return [pos - 1 , pos - 7 , pos - 8 , pos - 9 , pos + 1 , pos + 7 , pos + 8 , pos + 9].filter(n => n < 64 && n >= 0)
  }


  return posAgregar.filter(n => n < 64 && n >= 0)
}

const obtenerValoresPooisblesDeCas = (aux:Piesa):number[] => {
  switch (aux.piesa) {
    case "p":
      return PosPeon(aux.index)
      break;
    case "t":
      return PosTorre(aux.index)
      break;
    case "c":
      return PosCaballo(aux.index)
      break;
    case "a":
      return PosAlfil(aux.index)
      break;
    case "d":
      return PosDama(aux.index)
      break;
    case "r":
      return PosRey(aux.index)
      break;
}
  return [0,0]
}


export const seleccionador = (
        i:number , 
        setSelecionado:React.Dispatch<React.SetStateAction<Piesa>>,
        piesasN:Piesa[],
        setPosibleCasillas:React.Dispatch<React.SetStateAction<number[]>>,
    ) => {
    const aux:Piesa[] = piesasN.filter(n => n.index === i);
    if(aux.length === 0) {
      setSelecionado({
        index: -1,
        piesa: ""
      })
      setPosibleCasillas([])
      return 
    }
    const retorno:number[] = obtenerValoresPooisblesDeCas(aux[0])
    setPosibleCasillas(retorno.filter((n , i) => {
      return i === retorno.indexOf(n)
    }))

    setSelecionado(aux[0])
}