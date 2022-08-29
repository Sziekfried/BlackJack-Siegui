import { moverFicha, ganeFichas, perdiFichas,regresarFichas,fichasDelDealer} from "./animacionesCartas";

import { lugarApuestaActual, lugarSaldoActual, lugarFichasApostadas,lugarApuestaMinima } from "../index.js";
import swal from "sweetalert";
const ficha200 = document.querySelector('#ficha-200'),
      ficha100 = document.querySelector('#ficha-100'),
      ficha50 = document.querySelector('#ficha-50'),
      ficha25 = document.querySelector('#ficha-25');

export const apostandoLoMinimo = () => {
  let saldoActual = lugarSaldoActual.textContent*1;
  let apuestaMinima = lugarApuestaMinima.textContent*1;
  
  if (lugarApuestaActual.textContent>0){
    let fichasAQuitar = lugarFichasApostadas.children.length;
    let fichasPaBorrar = []
    for (let i = 0; i<fichasAQuitar;i++){
       fichasPaBorrar.push(lugarFichasApostadas.children[i]);
      regresarFichas(lugarFichasApostadas.children[i]);
    }
    setTimeout(()=> {
      fichasPaBorrar.forEach((ficha)=> {
      ficha.remove();
    })
    },500)
  }
     if (saldoActual >= apuestaMinima){
    lugarApuestaActual.textContent = apuestaMinima;
    setTimeout(()=>{
      moverFicha(dibujarYMoverFicha(ficha100));
    },500)
    swal(`Vas A Apostar lo minimo viejo cachondo`,{
      buttons:false,
      timer:1000,
    }  
    )
  } 
 
}

export const saldoYApuesta = () => {
  let saldoActual = lugarSaldoActual.textContent;
  let apuestaActual = lugarApuestaActual.textContent * 1;
  if (saldoActual <= 0) {
    throw "No tienes mas Saldo";
  }
  const agregarFicha = (ficha, saldoActual, apuesta, dibujoFicha) => {
    if (saldoActual >= apuesta + ficha) {
      apuesta += ficha;
      moverFicha(dibujarYMoverFicha(dibujoFicha));
      return apuesta;
    } else {
      alert("no Dispones del saldo suficiente");
      return apuesta;
    }
  };

  ficha200.addEventListener("click", () => {
    saldoActual = lugarSaldoActual.textContent;
    apuestaActual = lugarApuestaActual.textContent * 1;
    apuestaActual = agregarFicha(200, saldoActual, apuestaActual, ficha200);
    lugarApuestaActual.innerText = apuestaActual;
  });
  ficha100.addEventListener("click", () => {
    saldoActual = lugarSaldoActual.textContent;
    apuestaActual = lugarApuestaActual.textContent * 1;
    apuestaActual = agregarFicha(100, saldoActual, apuestaActual, ficha100);
    lugarApuestaActual.innerText = apuestaActual;
  });
  ficha50.addEventListener("click", () => {
    saldoActual = lugarSaldoActual.textContent;
    apuestaActual = lugarApuestaActual.textContent * 1;
    apuestaActual = agregarFicha(50, saldoActual, apuestaActual, ficha50);
    lugarApuestaActual.innerText = apuestaActual;
  });
  ficha25.addEventListener("click", () => {
    saldoActual = lugarSaldoActual.textContent;
    apuestaActual = lugarApuestaActual.textContent * 1;
    apuestaActual = agregarFicha(25, saldoActual, apuestaActual, ficha25);
    lugarApuestaActual.innerText = apuestaActual;
  });
};

const dibujarYMoverFicha = (ficha) => {
  let fichaNueva = lugarFichasApostadas.appendChild(ficha.cloneNode());
  return fichaNueva;
};

export const repartirGanancias = (resultado,manoJugador,manoDealer,scoreJugador,scoreDealer) => {
  let saldo = lugarSaldoActual.textContent*1;
  let apuesta = lugarApuestaActual.textContent*1;
  setTimeout(() => {
    if (resultado === "empate") {
      lugarSaldoActual.innerText = saldo + apuesta;
      lugarApuestaActual.innerHTML = '';
      swal('Fue Empate',{
        buttons:false,
        timer:1500,
      })
    } else if (resultado === true) {
      let fichasMas = lugarFichasApostadas.cloneNode(true)
      fichasDelDealer(fichasMas);
      if(fueBlackJack(manoJugador,scoreJugador)){
      lugarSaldoActual.innerText = saldo + apuesta * 2.5;
      lugarApuestaActual.innerHTML = '';
      setTimeout(()=>{
        swal('Tienes Un BlackJack Ganas 3:2',{
        buttons:false,
        timer:1500,
      })
      ganeFichas()
      },500)
      }else{
      lugarSaldoActual.innerText = saldo + apuesta * 2;
      lugarApuestaActual.innerHTML = '';
      setTimeout(()=>{
        swal('Has Ganado',{
        buttons:false,
        timer:1500,
      })
      ganeFichas()
      },500)
      }
    } else if (resultado === false){
      lugarApuestaActual.innerHTML = '';
      swal('Perdiste',{
        buttons:false,
        timer:1500,
      })
      perdiFichas()
    }
  }, 100);
};
const fueBlackJack = (mano,puntuacion)=>{
  return (puntuacion==21 && mano.length==2)
}
export const actualizarSaldoyApuesta = (saldo,apuesta) => {
  lugarSaldoActual.textContent=saldo;
  lugarApuestaActual.textContent=apuesta;
}
