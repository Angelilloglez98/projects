//ElementosHTML
const tab=document.querySelector('#tablero');
const puntuacion=document.querySelector('#puntuacion');		
//propiedades del tablero
const nfilas=15;
const ncolumnas=15;
const tablero=[];
const vacio=0;
const snake=1;
const comida=2;

//Propiedades del juego
let score=0;

//Propiedades serpiente
let posicionSerpiente=['0,0','0,1','0,2','0,3']
let direccion='right';

//Propiedadescomida
let rowComida;
let colComida;

function CrearTablero(nfilas,ncolumnas) {
    tablero.length=0;
    for (let i = 0; i < nfilas; i++) {
            tablero.push([]);
        
        for (let j = 0; j < ncolumnas; j++) {
            tablero[i].push(vacio)
        }
    }
    PintarTablero();	
}



function PintarTablero() {
    tab.innerHTML='';
    tablero.forEach((fila,indexfila) => {
        let row=document.createElement('tr');
        
        fila.forEach((columna, indexcolumna)=> {
            let col=document.createElement('td');
            col.setAttribute('id',`${indexfila},${indexcolumna}`);
            switch (columna) {
                case 0:
                col.classList.add(`vacio`);
                break;

                case 1:
                col.classList.add(`snake`);
                break;

                case 2:
                col.classList.add(`food`);
                break;

                default:
                    break;
            }
            row.appendChild(col);
            tab.appendChild(row);
        });
    });
}


function ActualizarTableroSerpiente() {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            if (tablero[i][j]==snake) {
                tablero[i][j]=vacio;
            }
        }
    }
}

function PosicionarSerpiente(posiciones,tipo){
    ActualizarTableroSerpiente();
    for (let i = 0; i < posiciones.length; i++) {
        let fila=parseInt( posiciones[i].split(',')[0]);
        let columna=parseInt(posiciones[i].split(',')[1]);			
        tablero[fila][columna]=tipo;
        
    }
    PintarTablero();
}

function PosicionarComida(row,col) {
    rowComida = row;
    colComida = col;
    tablero[row][col] = comida;
    
    
}
function sumarScore(cantidad) {
    score+=cantidad;
    puntuacion.innerHTML=score;
}

function moverSerpiente(direccion) {
    
    let fila=posicionSerpiente[posicionSerpiente.length-1].split(',')[0]
    let columna=posicionSerpiente[posicionSerpiente.length-1].split(',')[1]
    
    switch (direccion) {
        case 'right':
            columna++;
            break;
        case 'left':
            columna--;
            break;
        case 'up':
            fila--;
            break;
        case 'down':
            fila++;
            break;
        default:
            break;
    }
    posicionSerpiente.push(`${fila},${columna}`);
    posicionSerpiente.shift()
    detectarColisiones()
    PosicionarSerpiente(posicionSerpiente,snake)
}


function Perder() {

    reset()
}
function detectarColisiones() {
    let fila=posicionSerpiente[posicionSerpiente.length-1].split(',')[0]
    let columna=posicionSerpiente[posicionSerpiente.length-1].split(',')[1]
    
    if (fila==nfilas || columna>=ncolumnas) {
        Perder();
    }
    
    if (fila<0 || columna<0 ) {
        Perder();
    }
    if (fila==rowComida && columna==colComida) {
        
        let col=Math.round(Math.random()*((ncolumnas-1)))
        let row=Math.round(Math.random()*((nfilas-1)))
        while (tablero[row][col]==snake) {
            
            col=Math.round(Math.random()*((ncolumnas-1)-0)+0)
            row=Math.round(Math.random()*((nfilas-1)-0)+0)
            
        }
        sumarScore(5)
        console.log(row,col);
        PosicionarComida(col,row);
        
        crecerSerpiente();
    }
    for (let i = 0; i < posicionSerpiente.length-1; i++) {
        let posicionRow=posicionSerpiente[i].split(',')[0];
        let posicionCol=posicionSerpiente[i].split(',')[1];
        if (fila==posicionRow && columna==posicionCol) {
            Perder();
        }
        
    }
    
}

function crecerSerpiente() {
    let fila=parseInt(posicionSerpiente[0].split(',')[0])
    let columna=parseInt( posicionSerpiente[0].split(',')[1])
    switch (direccion) {
        case 'right':
            posicionSerpiente.unshift(`${fila},${columna+1}`)
            break;
        case 'left':
            posicionSerpiente.unshift(`${fila},${columna-1}`)
            break;
        case 'up':
            posicionSerpiente.unshift(`${fila-1},${columna}`)
            break;
        case 'down':
            posicionSerpiente.unshift(`${fila+1},${columna}`)
            break;
        default:
            break;
    }
}

function reset() {
    posicionSerpiente=['0,0','0,1','0,2','0,3'];
    direccion='right';
    CrearTablero(nfilas,ncolumnas);
    let col=Math.round(Math.random()*((ncolumnas-1)))
    let row=Math.round(Math.random()*((nfilas-1)))
    PosicionarComida(col,row);
    score=0;
    sumarScore(0)
}

reset()

//gameLoop
document.onkeyup=(e)=>{
    switch (e.keyCode) {
        case 39:
            if (direccion!='left') {
                direccion='right'
            }
            
            break;
        case 40:
            if (direccion!='up') {
                direccion='down'
            }
            break;
        case 37:
            if (direccion!='right') {
                direccion='left'
            }
            break;
        case 38:
        if (direccion!='down') {
            direccion='up'
        }
            break;
        default:
            break;
    }
}

    setInterval(() => {

        moverSerpiente(direccion);
        
    }, 150);
    




