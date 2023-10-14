var titulo= document.getElementsByTagName('span');
var btnPrimario=document.getElementById('primario');
var btnSecundario=document.getElementById('secundario');
var btnTerciario=document.getElementById('terciario');
var btnHexadecimal=document.getElementById('exadecimal')
var display=document.getElementById('MostrarColor');
var valor=document.getElementById('valor');
var colores=['red','green','blue','cadetblue','magenta','yellow','greenyellow','cadetblue','royalblue','deeppink','orangered','goldenrod'];
var primario=0;
var secundario=3;
var terciario=6;
setInterval(() => {
    
        
        
        for (let i = 0; i < titulo.length; i++) {
            var r=Math.floor(Math.random()*255);        
            var g=Math.floor(Math.random()*255);
            var b=Math.floor(Math.random()*255);
            titulo[i].style.color='rgb('+r+','+g+','+b+')';
            titulo[i].style.border= '2px solid rgb('+r+','+g+','+b+')';
        }
    
    
}, 100);

    btnPrimario.onclick=function() {
  
        display.style.backgroundColor=colores[primario++];
        valor.innerHTML=colores[primario-1];
        if (primario==3) {
            primario=0;
        }
        
    } 
    btnSecundario.onclick=function() {
         
        display.style.backgroundColor=colores[secundario++]
        valor.innerHTML=colores[secundario-1];
        if (secundario==6) {
            secundario=3;
        }
    } 

    btnTerciario.onclick=function () {
        display.style.backgroundColor=colores[terciario++]
        valor.innerHTML=colores[terciario-1];
        if (terciario==12) {
            terciario=6;
        }

    } 
    btnHexadecimal.onclick=function () {
        var r=Math.floor(Math.random()*255);        
        var g=Math.floor(Math.random()*255);
        var b=Math.floor(Math.random()*255);

        display.style.backgroundColor='rgb('+r+','+g+','+b+')';
        valor.innerHTML='rgb('+r+','+g+','+b+')';
    }
        


        
      






