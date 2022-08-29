import gsap from 'gsap';
import { lugarMazo, lugarManoPlayer, lugarManoDealer,lugarFichasApostadas } from '../index.js';

const fichasDeApuesta = document.querySelector('.fichas'),
      fichasApostadas = document.querySelector('.fichasApostadas');


export const inicioMazo = (mazo) => {
   let inicio = gsap.timeline({repeat: 0, yoyo:false})
   inicio.fromTo(mazo,{
      duration:1,
      rotate:(90,0,180),
      ease:"bounce",
   },{
      duration:0.5,
      rotate:(0,90,90),
      x:25,
      ease:"linear",
   });
   return inicio;
}
const a = (carta,mano) => {
     const imagenMoviendo = document.createDocumentFragment();
     imagenMoviendo.appendChild(carta);
     if (mano === 1) {
       lugarManoPlayer.appendChild(imagenMoviendo);
     } else if (mano === 2) {
       lugarManoDealer.appendChild(imagenMoviendo);
     }
   };
export const moverCarta = (carta,mano) => {
   let moviendo = gsap.timeline({onComplete:a(carta,mano),repeat:0,yoyo:false})
   let y = (mano===1) ? 150 : -150
   moviendo.fromTo(carta,{
      duration:0.4,
      x:350,
      y:-(y),
      rotate:(45,0,90),
      ease:"linear",
   },{
      duration:1,
      x:0,
      y:0,
      rotate:(0,0,0),
      ease: "back.out(1.7)"      
   })
   return moviendo;
}
export const desvanecerFichas = () =>{
   let desvaneciendo = gsap.timeline();
   desvaneciendo.to(fichasDeApuesta,{
      duration:0.5,
      x:-400,
      ease:"linear",
      opacity:0,
   })
}
export const reaparecerFichas = () => {
   let tl_aparecer = gsap.timeline();
   tl_aparecer.to(fichasDeApuesta,{
      duration:0.3,
      x:0,
      opacity:1,
      ease:"elastic",
   })
}
export const moverFicha = (ficha) => {
let agregandoFicha = gsap.timeline();
   agregandoFicha.from(ficha,{
      duration: 0.4,
      x: -400,
      y: -75,
      ease: "linear",
   });
}

export const revelarCartaDealer = (manoDealer) => {
   let cartaOculta = document.querySelector('.cartaOculta');
   cartaOculta.src = `./assets/img/barajas/${manoDealer[1]}.png`
   let revelando = gsap.timeline();
   revelando.from(cartaOculta,{
      duration:0.6,
      rotationY:-90,
      ease:"bounce"
   })
}

export const ganeFichas = () =>{
   let fichitas = fichasApostadas.getElementsByTagName('img');
   let tomandoFichas = gsap.timeline();
   for (let i = (fichitas.length-1); i>=0;i--){
      tomandoFichas.to(fichitas[i],{
         duration:0.4,
         x:-350,
         y:80,
         ease:"linear",
      })
   }
}
export const perdiFichas = () =>{
   let fichitas = fichasApostadas.getElementsByTagName('img');
   let quitandoFichas = gsap.timeline();
   for (let i = (fichitas.length-1); i>=0;i--){
      quitandoFichas.to(fichitas[i],{
         duration:0.4,
         x:500,
         y:-100,
         ease:"linear",
      })
   }
}
export const quitandoCartas = (manoAQuitar,who=1) =>{
   let cartitas = manoAQuitar.getElementsByTagName('img');
   let tlQuitar = gsap.timeline();
   let yy = (who < 1) ? -300 : -700
   for (let i = (cartitas.length-1); i>=0; i--){
      tlQuitar.to(cartitas[i],{
         duration:0.4,
         x:350,
         y:yy,
         ease:"expo.out",
         opacity:0,
      })
   }
}
export const regresarFichas = (ficha) => {
   let regresarFicha = gsap.timeline();
   regresarFicha.to(ficha,{
      duration:0.4,
      x:-500,
      y:-100,
      opacity:0,
      ease:"linear",
   })
}
export const fichasDelDealer = (fichas)=> {
   lugarFichasApostadas.append(fichas);
   let tl_add = gsap.timeline();
   tl_add.from(fichas,{
      duration:0.5,
      y:-80,
      x:500,
      opacity:0.5,
      ease:"linear",
   })
}