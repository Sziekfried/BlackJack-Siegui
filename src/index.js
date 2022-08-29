/*
TODO: EN el Index cargaremos todos los scripts necesarios pero por separado para que haya un orden y sea de facil edicion.
! El juego se rige bajo las siguientes normas (en principio este es un blackjack Clasico):
* 8 barajas de 52 cartas mezcladas
* debe de haber una apuesta minima
* El Dealer no puede obtener mas de 17 puntos o en su defecto un 17 Blando ( Un as y que sume 7 o 17). Solo de esta manera puede ganar el dealer
* El as Vale 11 o si la mano del jugador supera a 21 y hay un as este pasa a valer 1.
* El jugador puede dividir una mano inicial (2 cartas) que sean iguales y seguir dividiendo hasta tener 4 manos excepto si la mano inicial, son dos ases en ese momento solo puede dividir una vez y a cada mano solo se le puede agregar una carta mas y despues plantarse.
* El jugador debe llegar a sumar 21 puntos o acercarse lo mas posible sin pasarse de dicha puntuacion.

-+ Acciones del Jugador:
<< Plantarse: Quedarse con la mano o manos actuales y que sea el turno del dealer.
<< Doblar: doblar la apuesta inicial pero solo cuando tengan dos cartas en su mano y recibiendo una carta mas deben plantarse sin importar el resultado.
<< Rendirse: (en el blackjack clasico esto no se puede)recuperar la mitad de la apuesta inicial.
<< Apuesta seguro: Si el jugador cree que el dealer formara un blackjack y en efecto lo obtiene el jugador ganara su apuesta en relacion 2 a 1.

-- Resultados:
% El jugador gana si obtiene un blackJack o el dealer no cumple los requisitos.
% si el jugador gana con blackJack la relacion de pago es de 3 a 2 de lo contrario si gana de otra manera se le pagara con una relacion 2 a 1
% si el jugador pierde contra un blackJack solo perdera la apuesta inicial es decir no importa si doblo o si separo sus manos dichas apuestas extra seran consideradas como empate y se le regresaran al jugador

TODO: En principio Se deben poner los botones de inicio del juego y la descripcion del juego y sus normas, una vez hecho esto: se tienen que hacer las siguientes vistas y acciones:
-+ 1 Boton Inicializar Juego: 
   <* CREAR VISTA INICIAL 
   << 1.1 Crea El mazo completo (416 cartas 8 mazos de 52 cartas cada una).
   << 1.2 Crea las manos (vacias) para cada jugador (en este caso 2 EL dealer y jugador 1)
   << 1.3 Se establece el saldo inicial del jugador el cual es de $1000 Monedas Sz (para el dealer el saldo es infinito)
   << 1.4 Se establece la apuesta minima de 100 Monedas Sz y el jugador ingresa lo que quiera apostar (mayor al minimo o minimo en su defecto).
   << 1.5 se habilita boton comenzar juego.
-+ 2 Boton Comenzar juego:
   <* CREAR VISTA JUEGO INICIADO.
   << 2.1 se descuenta al jugador la apuesta que haya hecho de su saldo y se pone en juego.
   << 2.2 Se reparten las cartas (que se toman del mazo inicial) a cada mano comenzando una para el jugador, otra para el dealer, hasta que cada uno tenga en su mano dos cartas, (la ultima carta que se le de al dealer debe de estar boca abajo. hasta que sea su turno se volteara dicha carta)
   << 2.3 Se cambia a la vista del turno del jugador.
-- VISTA TURNO DEL JUGADOR INICIO:
   <* En esta vista se hacen las siguientes comprobaciones para ver que botones se habilitan:
      << Se dehabilita el boton comenzar juego
      << Si la mano inicial del jugador es:
         * Un blackJack: Se termina su turno automaticamente y pasamos al turno del dealer.
         * Dos cartas de distinto valor: se habilitan los botones pedir carta, doblar apuesta, seguro y plantarse.
         * Dos cartas Con el mismo valor: se habilita el boton de Partir mano ademas de las anteriormente mencionadas.
-+ 3 Boton Pedir Carta:
   <* VISTA TURNO DEL JUGADOR
   << 3.1 se deshabilita el boton doblar apuesta y partir mano
   << 3.2 se agrega a la mano actual del jugador la ultima carta del mazo y se actualiza la puntuacion de la mano actual del jugador.
   << 3.3 si la puntuacion de la mano actual del jugador se pasa al turno del siguiente jugador (si el siguiente jugador es el dealer se deshabilita este boton.)
-+ 4 Boton Plantarse
   <* SEGUIMOS EN LA VISTA TURNO DEL JUGADOR
   << 4.1 Se termina el turno actual del jugador y en caso de que tenga mas de una mano se comienza el turno de su otra mano de lo hasta que pasen todos sus turnos y despues empieza el turno del dealer.
   << 4.2 si el siguiente es el turno del dealer: se deshabilitan todos los botones del jugador (Pedir carta, plantarse, doblar apuesta, seguro.)
-+ 5 Boton Doblar apuesta:
   <* SEGUIMOS EN LA VISTA TURNO DEL JUGADOR
   << 5.1 Si el jugador tiene dos cartas en la mano actual este boton estara activado, y si se da clic entonces la apuesta inicial se multiplicara por dos y se descontara a su saldo actual (solo lo que haga falta)
   << 5.2 Si el jugador no cuenta con el saldo suficiente, este boton se deshabilitara, y no se descontara nada de su saldo actual
   << 5.3 En caso de que se pueda, entonces una vez descontado el saldo se le dara una carta al jugador y terminara su turno sin importar el resultado, comenzara el turno del dealer.
-+ 6 Boton Seguro:
   <* SEGUIMOS EN LA VISTA TURNO DEL JUGADOR.
   << 6.1 El jugador ingresara un monto de apuesta valido y se descontara de su saldo actual.
   << 6.2 se agregara a espera una verificacion, cuando el dealer revele su carta boca abajo y esta haga que la mano del dealer sea un blackjack se dice que el jugador gano "La Apuesta seguro".
-+ 7 Boton Partir Mano:
   << 7.1 Si la mano a partir es una conformada por dos ASES:
      * Se pide el monto de la apuesta para la segunda mano (dicho monto debe ser mayor al minimo o el minimo en su defecto), y se descontara dicho monto una vez se haya aceptado partir la mano.
      * A cada mano partida se le agregara UNA SOLA CARTA mas automaticamente, y se terminara el turno del jugador posteriormente comenzara el turno del dealer.
   << 7.2 Si la mano a partir no son ases entonces:
      * Se pide el monto de la apuesta para la segunda mano (dicho monto debe ser mayor al minimo o el minimo en su defecto), y se descontara dicho monto una vez se haya aceptado partir la mano.
      * una vez partida la mano, el jugador tomara una carta para la primera mano y seguira su turno normalmente (hasta que decida plantarse o se mano pase de 21).
      * si en una de las manos partias vuelve a haber la posibilidad de partir nuevamente se hara hasta que el jugador actual tenga maximo 4 manos. (cada una con una apuesta)
*/
import {
  inicioJuego,
  reiniciarMesa,
  tomarCartasInicio,
  obtenerSaldoYApuesta,
  descontarApuesta,
} from "./js/inicializarJuego.js";
import { saldoYApuesta, apostandoLoMinimo } from "./js/apuestas.js";
import { desvanecerFichas } from "./js/animacionesCartas.js";
import { comenzando, agregarCarta,plantarseJuego,doblandoMiApuesta } from "./js/enElJuego.js";
import swal from "sweetalert";
import "./styles.css";
import { tomarCarta } from "./js/accionesCartas.js";

/* 
-+ VARIABLES GLOBALES:
-- Mano jugador (array), Mano Dealer (array)
-- Mazo (array son 4 barajas para un total de 208 cartas)
-- marcadores (DOM )
-- Saldo Del Jugador (DOM)
-- Apuesta actual & apuesta minima (DOM)
-- Botones De inicio de Juego (DOM 2 Botones)
-- Fichas Para Apostar (DOM 4 FIchas)

-+ FUNCIONES AL CARGAR LA PAGINA
-- Crear Mazo y Barajear
-- Poner las Fichas de apuesta
-- Establecer saldo inicial y apuesta minima
-- Poner los botones de iniciar juego y reiniciar (este ultimo oculto)
-- Habilitar que el usuario de clic a las fichas y comenzar su apuesta.

*/
// -- Variables Globales:
export let mazo = [],
  manoJugador = [],
  manoDealer = [],
  saldoJugador = 0,
  apuestaMinima = 0,
  puntosJugador = 0,
  puntosDealer = 0,
  apuestaActual = 0,
  vecesJugando = 0;

//-- Referencial al DOM:
export const lugarMazo = document.querySelector(".mazo"),
  contadorCartasMazo = document.querySelector(".contadorCartasMazo"),
  lugarManoDealer = document.querySelector(".manoDealer"),
  lugarManoPlayer = document.querySelector(".manoPlayer"),
  marcadorJugador = document.querySelector(".ptsActualesJugador"),
  marcadorDealer = document.querySelector(".ptsActualesDealer"),
  lugarSaldoActual = document.querySelector(".saldo-actual"),
  lugarApuestaActual = document.querySelector(".apuesta-actual"),
  lugarApuestaMinima = document.querySelector(".apuesta-minima"),
  lugarFichasApostadas = document.querySelector(".fichasApostadas");

//-- Botones Iniciales (DOM):
export const btnInicioJuego = document.querySelector(".btnInicioJuego"),
      btnReiniciar = document.querySelector(".btnReiniciar"), 
      //-- Botones de control Juego (DOM):
      btnPedirCarta = document.querySelector('.pedirCarta'),
      btnPlantarse = document.querySelector('.plantarse'),
      btnDoblarApuesta = document.querySelector('.doblarApuesta');

const bloquearBotonesJuego = () => {
  btnPedirCarta.disabled = true;
  btnDoblarApuesta.disabled = true;
  btnPlantarse.disabled = true;
}
window.onload = () => {
  bloquearBotonesJuego();
  setTimeout(() => {
    mazo = inicioJuego();
    saldoJugador = lugarSaldoActual.textContent * 1;
    saldoYApuesta();
  }, 1000);
};

const verificarApuesta = (apuestaActual)=>{
  if (apuestaActual < 100){
    apostandoLoMinimo();
  }
  desvanecerFichas();
}

btnInicioJuego.addEventListener("click", () => {
  btnInicioJuego.disabled = true;
  if (vecesJugando === 0) {
    verificarApuesta(lugarApuestaActual.textContent);
    setTimeout(() => {
      [manoJugador, manoDealer] = tomarCartasInicio(mazo);
      descontarApuesta(
        lugarApuestaActual.textContent,
        lugarSaldoActual.textContent
      );
      comenzando(manoJugador);
    }, 500);
    vecesJugando++;
  } else {
    setTimeout(() => {
      verificarApuesta(lugarApuestaActual.textContent);
      manoJugador = [], manoDealer = [];
      [manoJugador, manoDealer] = tomarCartasInicio(mazo);
      descontarApuesta(
        lugarApuestaActual.textContent,
        lugarSaldoActual.textContent
      );
      comenzando(manoJugador);
    }, 500);
  }
});

btnReiniciar.addEventListener("click", () => {
  mazo = [];
  manoDealer = [], manoJugador = [];
  reiniciarMesa();
  bloquearBotonesJuego();
  setTimeout(()=>{
    mazo = inicioJuego();
    saldoJugador = lugarSaldoActual.textContent * 1;
  },100)
});

//-- BOTONES DE JUEGO
btnPedirCarta.addEventListener("click",()=>{
  agregarCarta(mazo,manoJugador,manoDealer)
})
btnPlantarse.addEventListener("click",()=>{
  plantarseJuego(manoJugador,manoDealer,mazo)
})
btnDoblarApuesta.addEventListener('click',()=> {
  doblandoMiApuesta(lugarSaldoActual.textContent*1,lugarApuestaActual.textContent*1,manoJugador,mazo,manoDealer)
})