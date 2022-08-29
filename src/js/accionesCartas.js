import { lugarMazo } from "../index.js";


export const tomarCarta = (mazo) => {
   let contadorActual = document.querySelector('.contadorCartasMazo');
   let carta = mazo.pop();
   let cartasRestantes = mazo.length;
   contadorActual.innerText = cartasRestantes;
   return carta;
}
export const dibujarCarta = (carta,turno = 0) => {
   let imgCarta = document.createElement('img');
   imgCarta.src = `./assets/img/barajas/${carta}.png`;
   imgCarta.classList.add("cartaNueva");
   if (turno === 2){
      imgCarta.classList.add("cartaOculta");
      imgCarta.src = `./assets/img/barajas/grey_back.png`;
   }
   lugarMazo.append(imgCarta);
   return imgCarta;
}
export const valorCarta = (carta) =>{
   const valor = carta.substring(0,carta.length-1);
   const valorC = isNaN(valor) ? (valor === 'A' ? 11:10) : valor*1;
   return valorC;
}