const generar=document.getElementById('generador');
const cantidad =document.getElementById('cantidad');
const casillas=document.getElementById('casillas');
const casilla=document.getElementsByClassName('casilla');
const timer= document.getElementById('timer');
const perder= document.getElementById('perder');
const ganar= document.querySelector('#ganar');
var contador=0;
var columnas;
var filas;
var posicionesocupadas=[];
var contadorcillo=0;
var botonespulsados=[];
var tiempo;
var cronometro;



function colorear(boton) {
    if (boton.style.backgroundColor!="rgb(159, 231, 138)") {
        boton.style.backgroundColor="rgb(75, 109, 155)"
    }
    
}
function descolorear(boton) {
    if (boton.style.backgroundColor!="rgb(159, 231, 138)") {
        boton.style.backgroundColor="rgb(102, 148, 209)";
    }
}

generar.onclick=function name(params) {
    moverbotones();
    generarcuadricula(); 
    
}

function moverbotones() {
    const container= document.getElementById('container');
    container.style.justifyContent='flex-start'; 
}


function generarcuadricula() {
    perder.style.display="none";
    ganar.style.display="none";
    clearInterval(cronometro);
    timer.style.display="block"
    contadorcillo=0;
    botonespulsados.length=0;
    casillas.innerHTML='';
    posicionesocupadas.length=0;
    //consigue el tamaño de las celdas
    if (cantidad.value==3) {
        columnas=4;
        filas=3;
        tiempo=30;       
    }
    if (cantidad.value==4) {
        columnas=4;
        filas=4;
        tiempo=60;       
    }
    if (cantidad.value==5) {
        columnas=5;
        filas=4;
        tiempo=90;  
    }
    timer.innerHTML=tiempo;
    //introduce el timer 
    cronometro=setInterval(() => {
        timer.innerHTML=tiempo;
        tiempo--;
        if(tiempo<0){         
            clearInterval(cronometro); 
            
            perder.style.display="block";
        }
    },1000);
    //crea las celdas
    for (let i = 0; i < filas*columnas; i++) {
        casillas.innerHTML+='<button class="casilla" onclick="activar(this)" onmouseover="colorear(this)" onmouseout="descolorear(this)" id="'+contador+'"style="width:100px; background-color: rgb(102, 148, 209); height:100px ;  border:1px solid rgb(186, 195, 206); border-radius:10px; color:white; font-size:40px ;"></button>'; 
        contador++;      
    }
    //le da el estilo a las celdas creadas
    casillas.style.display='grid';
    casillas.style.gridTemplateColumns='repeat('+columnas+',auto)';
    casillas.style.gridTemplateRows='repeat('+filas+',auto)';
    casillas.style.gap='5px';
    //le da un valor a las casillas  
    var valor=1;    
    while (comprobarcasillavacia()) {

        do{
            posicion1=Math.round(Math.random()*(filas*columnas-1));
            posicion2=Math.round(Math.random()*(filas*columnas-1));
            
        }while (posicion1==posicion2 || posicionrepetida(posicion1) || posicionrepetida(posicion2))

        posicionesocupadas.push(posicion1);
        posicionesocupadas.push(posicion2);
        casilla[posicion1].setAttribute('value',''+valor+'');
        casilla[posicion2].setAttribute('value',''+valor+'');
        valor++;
    }
    
}

function comprobarcasillavacia() {
    for (let i = 0; i < casilla.length; i++) {
        if(casilla[i].value==""){
            return true;
        }
    }
}
function posicionrepetida(posicion) {
    for (let i = 0; i < posicionesocupadas.length; i++) {
        if(posicionesocupadas[i]==posicion){
            return true;
        }
    }   
}

function activar(boton) {
    
    boton.innerHTML=boton.value;  
    botonespulsados[contadorcillo]=boton;
    contadorcillo++;
    if(contadorcillo==2){
        

        if (boton.id!=botonespulsados[0].id) {  
            quitarcontrolbotones();
            if (comprobarinner()) {
                botonespulsados[0].style.backgroundColor="rgb(159, 231, 138)";
                botonespulsados[1].style.backgroundColor="rgb(159, 231, 138)";
                darcontroldebotones();
            }else{ 
                setTimeout(() => {
                    
                    botonespulsados[0].innerHTML="";
                    botonespulsados[1].innerHTML="";
                    botonespulsados.length=0;
                    darcontroldebotones();
                }, 1000);
                setTimeout(() => {
                    botonespulsados.length=0;
                }, 1001);  
            }
            
        }else{
            botonespulsados[0].innerHTML="";
            botonespulsados[1].innerHTML="";
            botonespulsados.length=0;
            darcontroldebotones();
        }
        contadorcillo=0;
    
    }
    victoria();
}


function comprobarinner(){
    if (botonespulsados[0].innerHTML==botonespulsados[1].innerHTML){
        return true;
    }   
}
function quitarcontrolbotones() {
    for (let i = 0; i < casilla.length; i++) {
        casilla[i].setAttribute('onclick','');    
    }
}
function darcontroldebotones() {
    for (let i = 0; i < casilla.length; i++) {
        if(casilla[i].innerHTML==""){
        casilla[i].setAttribute('onclick','activar(this)');
        }    
    }
}

function victoria() {
    for (let i = 0; i < casilla.length; i++) {
        if (casilla[i].innerHTML=="") {
            return false;
        }
    }
    clearInterval(cronometro);
    ganar.style.display="block";
    return true;
}