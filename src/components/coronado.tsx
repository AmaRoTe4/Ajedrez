import {coronarPiesa, pathOfPhoto} from "../function/funciones"
import { Piesa } from "../interface";

interface Props{
    piesasB: Piesa[];
    piesasN: Piesa[];
    setPiesasB: React.Dispatch<React.SetStateAction<Piesa[]>>;
    setPiesasN: React.Dispatch<React.SetStateAction<Piesa[]>>;
}

export default function PantallaDeCoronar(
    {
        piesasB,
        piesasN,
        setPiesasB,
        setPiesasN
    }:Props
){
    
    const coronar = ():boolean[] => {
        return [(piesasN.filter(n => n.index < 8).filter(n => n.piesa === "p").length > 0), (piesasB.filter(n => n.index > 55 ).filter(n => n.piesa === "p").length > 0)]
    }

    return (
            (coronar()[0] || coronar()[1]) ? 
            <div className="box-coronado position-absolute top-50 start-50 translate-middle">
              <div onClick={e => {e.preventDefault() ; 
                coronarPiesa(
                  coronar()[1] ? piesasB : piesasN,
                  coronar()[1] ? setPiesasB : setPiesasN,
                  'c'
                )}}>
                { coronar()[1] &&
                  <img src={pathOfPhoto("c" , "b")} height={100} />
                }  
                { coronar()[0] &&
                  <img src={pathOfPhoto("c" , "n")} height={100} />
                }
              </div>
              <div onClick={e => {e.preventDefault() ; 
                coronarPiesa(
                  coronar()[1] ? piesasB : piesasN,
                  coronar()[1] ? setPiesasB : setPiesasN,
                  'a'
                )}}>
                { coronar()[1] &&
                  <img src={pathOfPhoto("a" , "b")} height={100} />
                }  
                { coronar()[0] &&
                  <img src={pathOfPhoto("a" , "n")} height={100} />
                }
              </div>
              <div onClick={e => {e.preventDefault() ; 
                coronarPiesa(
                  coronar()[1] ? piesasB : piesasN,
                  coronar()[1] ? setPiesasB : setPiesasN,
                  't'
                )}}>
                { coronar()[1] &&
                  <img src={pathOfPhoto("t" , "b")} height={100} />
                }  
                { coronar()[0] &&
                  <img src={pathOfPhoto("t" , "n")} height={100} />
                }
              </div>
              <div onClick={e => {e.preventDefault() ; 
                coronarPiesa(
                  coronar()[1] ? piesasB : piesasN,
                  coronar()[1] ? setPiesasB : setPiesasN,
                  'd'
                )}}>
                { coronar()[1] &&
                  <img src={pathOfPhoto("d" , "b")} height={100} />
                }  
                { coronar()[0] &&
                  <img src={pathOfPhoto("d" , "n")} height={100} />
                }
              </div>
            </div> : <></>
    )
}