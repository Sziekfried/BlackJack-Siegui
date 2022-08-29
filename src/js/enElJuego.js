import { tomarCarta, dibujarCarta } from "./accionesCartas";
import { moverCarta, revelarCartaDealer,quitandoCartas,reaparecerFichas } from "./animacionesCartas";
import { actualizarSaldoyApuesta, repartirGanancias } from "./apuestas";
import {
  btnDoblarApuesta,
  btnInicioJuego,
  btnPedirCarta,
  btnPlantarse,
  lugarFichasApostadas,
  lugarManoDealer,
  lugarManoPlayer,
  lugarApuestaActual,
  lugarSaldoActual,
} from "../index.js";
import swal from "sweetalert";

let tipos = ["H", "S", "C", "D"];
const scoreJugador = document.querySelector(".ptsActualesJugador"),
  scoreDealer = document.querySelector(".ptsActualesDealer");
let puntosJugador = 0;
let saldo, apuesta;

export const comenzando = (mano) => {
  setTimeout(() => {
    puntosJugador = determinarPuntuacionActual(mano);
    scoreJugador.innerText = puntosJugador;
    btnPedirCarta.disabled = false;
    btnPlantarse.disabled = false;
    btnDoblarApuesta.disabled = false;
    btnInicioJuego.innerText = "Continuar Juego";
    
  }, 2000);
};

export const agregarCarta = (mazo, mano, manoDealer) => {
  btnDoblarApuesta.disabled = true;
  let cartaNueva = tomarCarta(mazo);
  moverCarta(dibujarCarta(cartaNueva), 1);
  mano.push(cartaNueva);
  setTimeout(() => {
    puntosJugador = determinarPuntuacionActual(mano) * 1;
    scoreJugador.innerText = puntosJugador;
    if (puntosJugador === 21) {
      turnoDealer(mazo, manoDealer,mano, false);
    } else if (puntosJugador > 21) {
      turnoDealer(mazo, manoDealer,mano, true);
    }
  }, 350);
};

export const plantarseJuego = (manoJugador,manoDealer, mazo) => {
  if(scoreJugador.textContent <10){
    turnoDealer(mazo, manoDealer,manoJugador, true);
  }else{
    turnoDealer(mazo, manoDealer,manoJugador, false);
  }
};

export const doblandoMiApuesta = (saldo, apuesta, mano, mazo, manoDealer) => {
  if (saldo >= apuesta) {
    saldo = saldo - apuesta;
    apuesta = apuesta * 2;
    actualizarSaldoyApuesta(saldo, apuesta);
    setTimeout(() => {
      let cartaNueva = tomarCarta(mazo);
      moverCarta(dibujarCarta(cartaNueva), 1);
      mano.push(cartaNueva);
      setTimeout(() => {
        puntosJugador = determinarPuntuacionActual(mano) * 1;
        scoreJugador.innerText = puntosJugador;
        if (puntosJugador === 21) {
          turnoDealer(mazo, manoDealer,mano, false);
        } else if (puntosJugador > 21) {
          turnoDealer(mazo, manoDealer,mano, true);
        } else {
          turnoDealer(mazo, manoDealer,mano, false);
        }
      }, 350);
    }, 250);
  }else{
    swal('No dispones Del Saldo Suficiente para doblar tu apuesta');
  }
};

const determinarPuntuacionActual = (mano) => {
  let puntuacion = 0;
  mano.forEach((carta) => {
    let aux = carta.split();
    const valor = aux[0].substring(0, aux[0].length - 1);
    const valorA = isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
    puntuacion += valorA;
  });
  if (puntuacion > 21 && determinarSiHayUnAsEnMano(mano)) {
    puntuacion -= 10;
  }
  return puntuacion;
};

const determinarSiHayUnAsEnMano = (mano) => {
  // -+ Con que encuentre un solo AS se termina el ciclo y retorna un true.
  let aux = false;
  for (let i = 0; i < mano.length; i++) {
    for (let j = 0; j < tipos.length; j++) {
      if (mano[i] === `A${tipos[j]}`) {
        aux = true;
        break;
      }
    }
    if (aux) {
      break;
    }
  }
  return aux;
};

const turnoDealer = (mazo, manoDealer, manoJugador, sePaso) => {
  let puntosDealer = 0;
  btnPedirCarta.disabled = true;
  btnPlantarse.disabled = true;
  btnDoblarApuesta.disabled = true;
  revelarCartaDealer(manoDealer);
  puntosDealer = determinarPuntuacionActual(manoDealer);
  scoreDealer.innerText = puntosDealer;
  let aux = 1;
  if (!sePaso) {
    while (puntosDealer < 16) {
      aux += 2;
      let cartaNueva = tomarCarta(mazo);
      manoDealer.push(cartaNueva);
      puntosDealer = determinarPuntuacionActual(manoDealer);
      setTimeout(() => {
        moverCarta(dibujarCarta(cartaNueva), 2);
        scoreDealer.innerText = puntosDealer;
      }, 350);
    }
    setTimeout(() => {
      determinarGanador(puntosJugador, puntosDealer,manoJugador,manoDealer );
      btnInicioJuego.disabled=false;
    }, aux * 300);
  } else {
    setTimeout(() => {
      determinarGanador(puntosJugador, puntosDealer,manoJugador,manoDealer );
      btnInicioJuego.disabled=false;
    }, aux * 400);
  }
};

const determinarGanador = (puntosJugador, puntosDealer,manoJugador,manoDealer) => {
  let gane;
  gane =
    puntosJugador > 21
      ? false
      : puntosDealer > 21
      ? true
      : puntosJugador === puntosDealer
      ? "empate"
      : puntosJugador > puntosDealer
      ? true
      : false;
  repartirGanancias(gane,manoJugador,manoDealer,puntosJugador,puntosDealer );
  setTimeout(()=>{
    partidaFinalizada();
  },1500)
};

const quitarElementos = (lugar) => {
  lugar.innerHTML='';
}

const partidaFinalizada = ()=>{
  quitandoCartas(lugarManoPlayer,2);
  quitandoCartas(lugarManoDealer);
  setTimeout(()=>{
      quitarElementos(lugarManoDealer);
  quitarElementos(lugarManoPlayer);
  },400)
  scoreJugador.innerHTML ='';
  scoreDealer.innerHTML ='';
  lugarFichasApostadas.innerHTML = '';
  reaparecerFichas();
}
/* 
export const continuarJugando = () => {
  quitandoCartas(lugarManoPlayer,2);
  quitandoCartas(lugarManoDealer);
  reaparecerFichas();
  setTimeout(()=> {
    quitarElementos(lugarManoDealer);
    quitarElementos(lugarManoPlayer);
    marcadorJugador.innerHTML = '';
    marcadorDealer.innerHTML = '';
    lugarApuestaActual.innerHTML='';
    lugarFichasApostadas.innerHTML = '';
  },1500)
} */