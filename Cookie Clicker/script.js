var fps=30;
var galletas=0;
var galletassegundos=0;
var galletasporclick=1;
var edificios=[
    ['cursor',0.1,15,0],
    ['abuela',1,100,0],
    ['granja',8,1100,0],
    ['mina',47,12000,0],
    ['fabrica',260,130000,0],
    ['banca',1400,1400000,0],
    ['templo',7800,20000000,0],
    ['torremagica',44000,330000000,0],
    ['envio',260000,5100000000,0],
    ['laboratorio',1600000,75000000000,0],
    ['portal',10000000,1000000000000,0],
    ['maquinadeltiempo',65000000,14000000000000,0],
    ['antimateria',10000000,170000000000000,0],
    ['prisma',2900000000,2100000000000000,0],
    ['probabilizador',22000000000,26000000000000000,0],
    ['motorfractal',150000000000,310000000000000000,0],
    ['javascript',1100000000000,71000000000000000000,0],
    ['universoparalelo',8300000000000,12000000000000000000000,0],
    ['panaderocerebral',64000000000000,6400000000000000000000000,0]
];

const cookie=document.getElementById("cookie");
const totalgalletas=document.getElementById('galletastotales');
const galletasporsegundo=document.getElementById('galletasporsegundo');
const multiplicador=document.getElementsByClassName('multiplicador');


function mejorar(edificios) {
    
}
setInterval(() => {   
    refresh();
}, 1000/fps);

setInterval(() => {
    galletas=galletas+galletassegundos;
    guardar();
}, 1000);

function refresh() {
    totalgalletas.innerHTML='Galletas '+Math.round(galletas);
    galletasporsegundo.innerHTML='por segundo: '+galletassegundos.toFixed(1);
}

function edificio(boton) {
    for (let i = 0; i < edificios.length; i++) {
        if (edificios[i][0]==boton.id && edificios[i][2]<=galletas) {
            galletassegundos+=edificios[i][1];
            galletas-=edificios[i][2];
            edificios[i][3]++; 
            edificios[i][2]+=Math.round(edificios[i][2]*0.18); 
            boton.innerHTML=boton.id+'--> '+edificios[i][3]+' : '+edificios[i][2]; 
        }
    }
}

cookie.onmousedown=function () {
    
    cookie.style.transform='scale(1)';
}
cookie.onmouseup=function () {

    galletas+=galletasporclick;
    cookie.style.transform='scale(1.1)';
}

function cargar() {
    galletas=parseFloat(localStorage.getItem("galletastotales"));
    galletassegundos=parseFloat(localStorage.getItem("galletasporsegundo"));
    edificios=JSON.parse(localStorage.getItem("edificios"));
    for (let i = 0; i < edificios.length; i++) {
        multiplicador[i].innerHTML=multiplicador[i].id+'--> '+edificios[i][3]+' : '+edificios[i][2];
    }
    console.log(edificios);
}

function guardar() {
    localStorage.setItem("galletastotales",galletas);
    localStorage.setItem("galletasporsegundo",galletassegundos);
    localStorage.setItem("edificios",JSON.stringify(edificios));
    console.log(edificios);
  
}

function reset() {
    localStorage.setItem("galletastotales",0);
    localStorage.setItem("galletasporsegundo",0);
    localStorage.setItem("edificios",JSON.stringify(
        [
            ['cursor',0.1,15,0],
            ['abuela',1,100,0],
            ['granja',8,1100,0],
            ['mina',47,12000,0],
            ['fabrica',260,130000,0],
            ['banca',1400,1400000,0],
            ['templo',7800,20000000,0],
            ['torremagica',44000,330000000,0],
            ['envio',260000,5100000000,0],
            ['laboratorio',1600000,75000000000,0],
            ['portal',10000000,1000000000000,0],
            ['maquinadeltiempo',65000000,14000000000000,0],
            ['antimateria',10000000,170000000000000,0],
            ['prisma',2900000000,2100000000000000,0],
            ['probabilizador',22000000000,26000000000000000,0],
            ['motorfractal',150000000000,310000000000000000,0],
            ['javascript',1100000000000,71000000000000000000,0],
            ['universoparalelo',8300000000000,12000000000000000000000,0],
            ['panaderocerebral',64000000000000,6400000000000000000000000,0]
        ]
    )
    );
    cargar();
}
