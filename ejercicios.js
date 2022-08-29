let n = 0, m = 0, r;

const sumaPrimerosNumeros = () => {
   r= 0
   n = prompt('Ingresa Un Numero y se sumaran dicha numeracion', 2);
   for (let i = 0; i<= n; i++){
      r = r+i;
   }
   alert('Este es el resultado: ');
   return r;
}
const factorialDiez = () => {
   r=1;
   n = prompt('Ingresa Un numero xD',10);
   if (n>10){
      for (let i = 1;i<=10;i++){
         r = r*i;
         console.log(r);
      }
      alert(`Este es el resultado ya que el numero ingresado es mayor a 10: ${r}`);
   }else {
      for (let i = 0;i<=10; i++){
         r = r +i;
         console.log(r);
      }
      alert(`Este es el resultado ya que el numero ingresado es menor a 10: ${r}`);
   }
}
const multiplosDeTres = () => {
   r = [];
   n = prompt('Ingresa un numero para ver cuantos multiplos de tres hay desde el uno al numero que quieras',9)
   for (let i = 1; i<=n;i++){
      if (i%3 === 0){
         r.push(i);
      }
   }
   alert(`Estos son los multiplos de 3 que hay en el rango establecido: ${r.length}`)
}
const multiplosDeCinco = () => {
   r = [];
   n = prompt('Ingresa un numero para ver cuantos multiplos de cinco hay desde el uno al numero que quieras',9)
   for (let i = 1; i<=n;i++){
      if (i%5 === 0){
         r.push(i);
      }
   }
   alert(`Estos son los multiplos de 5 que hay en el rango establecido: ${r.length}`)
}
const sumaRandom = () => {
   r = 0;
   let aux = [];
   n = prompt('Ingresa Un numero y haremos algo jj',10)
   for (let i = 1; i<=n;i++){
      if (i%2 != 0 ){
         aux.push(i,'-');
         r = r+(i);
      }
      else {
         aux.push(i,'+');
         r = r-(i);
      }
   }
   aux.pop();
   alert(`El resultado magico es: ${r}`);
}
const sumaParesRango = () => {
   r = 0;
   let aux = [];
   n = prompt('Ingresa el inicio del rango donde se sumaran todos los pares',1);
   m = prompt('Ingresa el final del rango',25);
   for (let i = n; i<= m;i++){
      if (i%2 === 0){
         aux.push(i);
         r = r+(i*1);
      }
   }
   console.log(aux);
   alert(`Esta es la suma de todos los pares: ${r}`);
}

const numerosPrimos = () => {
   let aux;
   for (let i = 2; i<100; i++){
      aux = 0;
      for (let j =2; j<i;j++){
         if (i%j === 0){
            aux++;
            break;
         }
      }
      if (aux === 0){
         console.log(`Este numero es Primo: ${i}`);
      }
   }
}

const nFactorial = () => {
   r = 1;
   n = prompt('Ingresa un numero al cual quieras obtener el factorial',5);
   for (let i = 1; i<=n;i++){
      r = r*i;
   }
   console.log(r);
   alert(`El factorial es ${r}`);
}
const fibonnacciSusecion = () => {
   r = [0];
   for (let i = 1;i<12;i++){
      let aux = 0;
      if (r.length<2){
         r.push(1);
      }else{
         aux = r[i-2]+r[i-1];
         r.push(aux)
      }
   }
   console.log(r);
}
const sumaImparesRango = () => {
   r = 0;
   let aux = [];
   n = prompt('Ingresa el inicio del rango donde se sumaran todos los impares',1);
   m = prompt('Ingresa el final del rango',25);
   for (let i = n; i<= m;i++){
      if (i%2 != 0){
         aux.push(i);
         r = r+(i*1);
      }
   }
   console.log(aux);
   alert(`Esta es la suma de todos los impares: ${r}`);
   console.log({aux});   
}
const comprobarNumeros = (a,b) => {
   let aMenor = false;
   while (isNaN(a)||isNaN(b)||!aMenor){
      if (isNaN(a)){
         a = prompt('Debes de ingresar un valor numerico (principio del rango)',0);
         a = a*1;
      }
      if (isNaN(b)){
         b = prompt('Debes de ingresar un valor numerico (final del rango)',15);
         b = b*1;
      }
      if (b==a){
         alert('Los valores ingresados no pueden ser iguales, el primero debe ser menor')
         a = prompt('Ingresa el Inicio del rango',0);
         b = prompt('Ingresa el final del rango',15);
         a = a*1,b = b*1;
         aMenor= false;
      } else if(b<a){
         alert('El final del rango no puede ser menor que el inicio del rango')
         b = prompt(`Ingresa un valor numerico mayor a: ${a}`,a*2);
         b = b*1;
         aMenor = false;
      } else {
         aMenor = true;
      }
   }
   n = a;
   m = b;
   return true;
}
const rangoDeNumeros = () => {
   r = [];
   let aux = 0;
   alert('Vamos a imprimir los valores dentro de un rango establecido, para ello debes poner los valores del inicio y final del rango (Valores numericos)')
   n = prompt('Ingresa el inicio del rango',0);
   m = prompt('Ingresa el final del rango',15);
   n = n*1, m = m*1;
   if(comprobarNumeros(n,m)){
      for (let i = n;i<=m;i++){
         r.push(i);
         aux = aux+i;
      }
   }
   alert(`Suma de todos los valores en el rango ${aux}`);
   return r;
}

const deseaSalir = () => {
   r = prompt('Para salir Teclee la letra S','N')
   while (r!='S'){
      r = prompt('Para salir Teclee la letra S','N')
   }
   return 'Weno Largate xD'
}
const cuadradosCien = () => {
   r = 0;
   let aux = [];
   for (let i = 1;i<101;i++){
      r = r + (i*i);
      aux.push(i*i);
   }
   alert(`La suma de los cuadrados de los primeros 100 numeros es ${r}`)
   return aux;
}