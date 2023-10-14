let canva= document.getElementById('canva');
let ctx=canva.getContext('2d');
let rango=document.querySelector('input[type=range]');
let color= document.querySelector('#color');
let btnLimpiar=document.querySelector('input[type=button]');
var rect = canva.getBoundingClientRect();


posicionX=0;
posicionY=0;

function draw(Xi,Yi,Xf,Yf,color,grosor){
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.moveTo(Xi,Yi);
    ctx.lineCap="round";
    ctx.lineJoin="round";
    ctx.lineWidth=grosor;
    ctx.lineTo(Xf,Yf);
    ctx.stroke();

    posicionX=Xf;
    posicionY=Yf;
}
let mousemoving=(e)=>{
    
    draw(posicionX,posicionY, e.clientX, e.clientY, color.value,rango.value);

}

canva.onmousedown=(e)=>{
    posicionX=e.clientX;
    posicionY=e.clientY;
    draw(posicionX,posicionY, e.clientX, e.clientY, color.value,rango.value);
    canva.addEventListener('mousemove',mousemoving);
}

canva.onmouseup=()=>{
    canva.removeEventListener('mousemove', mousemoving);
}

btnLimpiar.onclick=()=>{
    limpiar(0,0,canva.clientWidth,canva.clientHeight);
}

function limpiar(Xinicial,Yinicial,Xfinal,Yfinal) {
    ctx.clearRect(Xinicial, Yinicial, Xfinal, Yfinal);
}

