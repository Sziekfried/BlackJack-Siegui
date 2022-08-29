import { inicioMazo, moverCarta,reaparecerFichas } from './animacionesCartas';
import { dibujarCarta, tomarCarta} from './accionesCartas';

const _ = require('underscore');


import {lugarMazo, lugarApuestaMinima, lugarSaldoActual, contadorCartasMazo, lugarManoDealer, lugarManoPlayer, lugarApuestaActual, marcadorJugador,marcadorDealer, lugarFichasApostadas,btnInicioJuego} from '../index.js';
let tipos = ['H','S','C','D'];
let especiales = ['A','J','Q','K'];   
let apuestaMinima = 100, saldoInicial=1000, mazo = [];



export const inicioJuego = () => {
   mazo = crearMazo();
   inicioMazo(dibujarMazo(mazo));
   obtenerSaldoYApuesta(saldoInicial,apuestaMinima);
   return mazo;
}

export const reiniciarMesa = () => {
  lugarApuestaMinima.textContent = apuestaMinima;
  lugarSaldoActual.textContent = saldoInicial;
  lugarManoPlayer.innerHTML = '';
  lugarManoDealer.innerHTML = '';
  lugarMazo.innerHTML='';
  marcadorJugador.innerHTML = '';
  marcadorDealer.innerHTML = '';
  lugarApuestaActual.innerHTML = '';
  lugarFichasApostadas.innerHTML = '';
  contadorCartasMazo.innerHTML='';
  btnInicioJuego.innerText = "Iniciar Juego";
  btnInicioJuego.disabled = false;
  reaparecerFichas();
}
export const crearMazo = () => {
   mazo = [];
   for (let j = 0; j < 4 ; j++) {
     tipos.forEach((tipo) => {
       especiales.forEach((especial) => {
         mazo.push(especial + tipo);
       });
       for (let i = 2; i < 11; i++) {
         mazo.push(i + tipo);
       }
     });
   }
   mazo = _.shuffle(mazo);
return mazo;
}

const dibujarMazo = (mazo) => {
   let cartasRestantes = mazo.length;
   contadorCartasMazo.innerText=cartasRestantes;
   let imgMazo = document.createElement('img');
   imgMazo.src = `./assets/img/barajas/grey_back.png`;
   imgMazo.classList.add("cartaMazo");
   imgMazo.classList.add("img-thumbnail");
   lugarMazo.append(imgMazo);
   return imgMazo;
}

function timerUno(ms) {
  return new Promise(res => setTimeout(res, ms))
}

export const tomarCartasInicio = (mazo,jugadores = 2)=>{
  let manoUno = [], manoDos = [];
  for (let i=0;i<2;i++){
    manoUno.push(tomarCarta(mazo));
    manoDos.push(tomarCarta(mazo));
  }
  repartirPrimerasCartas(manoUno,manoDos);
  return [manoUno,manoDos];
}

async function repartirPrimerasCartas (manoJugador,manoDealer) {
  for (let i = 0; i<2;i++){
    moverCarta(dibujarCarta(manoJugador[i]),1)
    await timerUno(500);
    moverCarta(dibujarCarta(manoDealer[i],(i+1)),2)
    await timerUno(500);
  } 
}



export const obtenerSaldoYApuesta = (saldoInicio, apuestaMinima) => {
  lugarSaldoActual.innerText=saldoInicio;
  lugarApuestaMinima.innerText=apuestaMinima;
  return;
}
export const descontarApuesta = (apuesta,saldo) => {
  saldo = saldo-apuesta;
  lugarSaldoActual.innerText=saldo;
  /* indicadorApuesta.innerText=apuestaMinima; */
  return saldo
}
