let tableroDOM=document.querySelector('#tablero');
let tablero=[
    ['','',''],
    ['','',''],
    ['','','']
]
let alternar=true;



function setGame() {
    crearTablero();
}
setGame();
function crearTablero() {
    tableroDOM.innerHTML="";
    for (let r = 0; r < tablero.length; r++) {
        for (let c = 0; c < tablero[r].length; c++) {
            let casilla=document.createElement('div');
            if (r==1) {
                casilla.classList.add('lineHorizontal');
            }
            if (c==1) {
                casilla.classList.add('lineVertical');
            }
            casilla.id="r"+r+"c"+c;
            casilla.onclick=(e)=>{
                activarCasilla(e.target);
            };

            tablero[r][c]=casilla;
            tableroDOM.appendChild(tablero[r][c]);
        }
    }

}


let activarCasilla=function(casilla) {
    
    if (alternar){
        if (!casilla.classList.contains('active2')) {
            casilla.innerHTML='X'
            casilla.classList.add('active1');
            alternar=false;
        }
        
    }else{
        if (!casilla.classList.contains('active1')) {
            casilla.innerHTML='O'
            casilla.classList.add('active2');
            alternar=true;
        }
    }
    checkGanador();
    
}

function checkGanador() {
    //chequear horizontal y vertical
    for (let r = 0; r < 3; r++) {
    
        if ( tablero[r][0].classList.contains('active2') && tablero[r][1].classList.contains('active2') && tablero[r][2].classList.contains('active2')) {
            ganar(tablero[r][0],tablero[r][1],tablero[r][2]);
        }else if(tablero[r][0].classList.contains('active1') && tablero[r][1].classList.contains('active1') && tablero[r][2].classList.contains('active1')){
            ganar(tablero[r][0],tablero[r][1],tablero[r][2]);
        }

        if ( tablero[0][r].classList.contains('active2') && tablero[1][r].classList.contains('active2') && tablero[2][r].classList.contains('active2')) {
            ganar(tablero[0][r],tablero[1][r],tablero[2][r]);
        }else if(tablero[0][r].classList.contains('active1') && tablero[1][r].classList.contains('active1') && tablero[2][r].classList.contains('active1')){
            ganar(tablero[0][r],tablero[1][r],tablero[2][r]);
        } 
        
    }
    //cheaquear diagonal
    if (tablero[0][0].classList.contains('active2') && tablero[1][1].classList.contains('active2') && tablero[2][2].classList.contains('active2')) {
        ganar(tablero[0][0],tablero[1][1],tablero[2][2]);
    }else if(tablero[0][0].classList.contains('active1') && tablero[1][1].classList.contains('active1') && tablero[2][2].classList.contains('active1')){
        ganar(tablero[0][0],tablero[1][1],tablero[2][2]);
    }
    //cheaquear diagonal contraria
    if (tablero[0][2].classList.contains('active2') && tablero[1][1].classList.contains('active2') && tablero[2][0].classList.contains('active2')) {
        ganar(tablero[0][2],tablero[1][1],tablero[2][0]);
    }else if(tablero[0][2].classList.contains('active1') && tablero[1][1].classList.contains('active1') && tablero[2][0].classList.contains('active1')){
        ganar(tablero[0][2],tablero[1][1],tablero[2][0]);
    }

}

function ganar(casilla1,casilla2,casilla3) {
    
    
    casilla1.style.backgroundColor='rgb(213, 240, 173)';
    casilla2.style.backgroundColor='rgb(213, 240, 173)';
    casilla3.style.backgroundColor='rgb(213, 240, 173)';
    for (let i = 0; i < tablero.length; i++) {
        
        for (let j = 0; j < tablero[i].length; j++) {
            tablero[i][j].onclick="";
        }
    }

}
let restart=document.querySelector('button');
restart.onclick=()=>{
    setGame();
}