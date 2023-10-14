
let pokemoncillo = [];
let screeen = document.getElementById("screen");
let botonsiguiente=document.getElementById("botonsiguiente");
let botonatras=document.getElementById("botonatras");
let pokemon=document.getElementsByClassName("pokemon");
let buscador = document.getElementById("buscador");

addEventListener('keyup', () => {
    buscar(buscador.value);
})

document.addEventListener("click",(e)=>{
    if (e.target.classList.value=="pokemon") {
        cargarinfodetallada(e.target);
    }else if(e.target.parentNode.classList.value=="pokemon"){
        cargarinfodetallada(e.target.parentNode);
    }
    
});

setTimeout(() =>{
    
    init();
    cargarinfodetallada(pokemon[0])

}, 4000);

function init() {
    for (let i = 1; i < 13; i++) {
        screeen.style.backgroundImage="none"
        creaminiatura(i);
    }   
}

async function adquirirpokemon(cantidad) {
    try {
        for (let i = 1; i < cantidad; i++) {
            const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
            const resultado = await respuesta.json();
            pokemoncillo.push(resultado);
        }
    } catch (err) {
        console.log(err);
        console.log("error al cargar la api");
    }
}
adquirirpokemon(905);

botonsiguiente.onclick=()=>siguientepagina();
botonatras.onclick=()=>paginaatras();

function siguientepagina() {
    let ultimodiv=screeen.lastChild;
    let idultimo=parseInt(ultimodiv.id);
    
    if (idultimo<=900) {
        screeen.innerHTML=""; 
        for (let i = idultimo; i < idultimo+12; i++) {
            creaminiatura(i+1);
        }
    }
    
}
function paginaatras() {
    let ultimodiv=screeen.firstChild;
    let idprimero=parseInt(ultimodiv.id);
    
    if (idprimero<=12) {
        idprimero=13;
    }
    if (parseInt(ultimodiv.id)!=1) {
        screeen.innerHTML="";
    }
    for (let i = idprimero-12; i < parseInt(ultimodiv.id); i++) {
        creaminiatura(i);
    }
}

function creaminiatura(number){
    //se crean los elementos que va a tener el pokemon
    let pokemon=document.createElement("div")
    let imagen = document.createElement("img");
    let nombre=document.createElement("p");
    let numero=document.createElement("p");
    //se le añaden las clase sprites nombre y numero
    pokemon.classList.add("pokemon");
    pokemon.setAttribute("id",pokemoncillo[number-1].id)
    imagen.src=pokemoncillo[number-1].sprites.front_default;
    imagen.classList.add("imagen_pokemon");
    nombre.textContent=pokemoncillo[number-1].name;
    numero.textContent="#"+pokemoncillo[number-1].id;
    //se le añade al div pokemon la imagen el numero y el nombre    
    pokemon.appendChild(imagen);
    pokemon.appendChild(numero);
    pokemon.appendChild(nombre);
    // pokemon.setAttribute("onclick","cargarinfodetallada(this)")
    //se añade a la pantalla el pokemon
    screeen.appendChild(pokemon);

}

function buscar(input) {
    let salir = false;
    let i = 0;
    let inputLC=input.toLowerCase();
    if (input.match(/^[0-9]+$/)) {
        
        while (!salir || i > pokemoncillo.length) {
            if (pokemoncillo[i].id == inputLC) {
                screeen.innerHTML=""; 
                creaminiatura(i+1)
                salir = true;
            }
            
            i++;
        }
    } else {
        while (!salir || i > pokemoncillo.length) {
            
            if (pokemoncillo[i].name.includes(inputLC)) {
                screeen.innerHTML=""; 
                creaminiatura(i+1)
                salir = true;
            }
            i++;
        }
    }
    if (input=="") {
        screeen.innerHTML=""; 
        init();
    }
}

function cargarinfodetallada(div) {
    let tipos = [];
    let tipodefinitivo = [];
    tipodefinitivo.length = 0;
    let contador = 0;
    let pokemoncompleto = pokemoncillo[div.id - 1];
    let imagenfrontal = pokemoncompleto.sprites.front_default;
    let imagenespalda = pokemoncompleto.sprites.back_default;
    let nombre = pokemoncompleto.name;
    let numero = pokemoncompleto.id;
    let hp = pokemoncompleto.stats[0].base_stat;
    let ataque = pokemoncompleto.stats[1].base_stat;
    let defensa = pokemoncompleto.stats[2].base_stat;
    let ataque_esp = pokemoncompleto.stats[3].base_stat;
    let defensa_esp = pokemoncompleto.stats[4].base_stat;
    let velocidad = pokemoncompleto.stats[5].base_stat;

    let asignacion = [
        ["grass", "planta", "lightgreen"],
        ["poison", "veneno", "blueviolet"],
        ["fire", "fuego", "red"],
        ["flying", "volador", "lightblue"],
        ["water", "agua", "blue"],
        ["bug", "bicho", "green"],
        ["normal", "normal", "lightgray"],
        ["electric", "electrico", "yellow"],
        ["ground", "tierra", "brown"],
        ["fighting", "lucha", "chocolate"],
        ["psychic", "psiquico", "pink"],
        ["ghost", "fantasma", "purple"],
        ["rock", "roca", "darkgoldenrod"],
        ["ice", "hielo", "deepskyblue"],
        ["fairy", "hada", "lightpink"],
        ["dragon", "dragon", "maroon"],
        ["dark", "siniestro", "darkslateblue"],
        ["steel", "acero", "gray"]
    ]

    for (let i = 0; i < pokemoncompleto.types.length; i++) {
        tipos.push(pokemoncompleto.types[i]);
    }
    for (let i = 0; i < tipos.length; i++) {
        for (let j = 0; j < asignacion.length; j++) {

            if (tipos[i].type.name == asignacion[j][0]) {
                if (contador == 0) {
                    tipodefinitivo.push([asignacion[j][0], asignacion[j][1], asignacion[j][2]])
                    contador++;
                } else if (contador == 1) {
                    tipodefinitivo.push([asignacion[j][0], asignacion[j][1], asignacion[j][2]]);
                }
            }
        }
    }

    const vida_form = document.getElementById("vida");
    const ataque_form = document.getElementById("ataque");
    const defensa_form = document.getElementById("defensa");
    const ataque_esp_form = document.getElementById("ataque_esp");
    const defensa_esp_form = document.getElementById("defensa_esp");
    const velocidad_form = document.getElementById("velocidad");
    const nombre_form = document.getElementById("nombre_info");
    const numero_form = document.getElementById("numero_info");
    const imagen_info_form = document.getElementById("imagen_info");
    const tipos_form = document.getElementById("tipos");
    nombre_form.innerHTML = nombre;
    numero_form.innerHTML = "#" + numero;
    vida_form.innerHTML = "Hp:.......................... " + hp;
    ataque_form.innerHTML = "Ataque:................... " + ataque;
    defensa_form.innerHTML = "Defensa:................. " + defensa;
    ataque_esp_form.innerHTML = "Ataque_esp:........... " + ataque_esp;
    defensa_esp_form.innerHTML = "defensa_esp:......... " + defensa_esp;
    velocidad_form.innerHTML = "velocidad:............. " + velocidad;
    imagen_info_form.style.backgroundImage = "url(" + imagenfrontal + ")";

    if (tipodefinitivo.length == 1) {
        tipos_form.innerHTML = "<div class='tipo' style='background-color:" + tipodefinitivo[0][2] + " ;'>" + tipodefinitivo[0][1] + "</div>"
    } else {
        tipos_form.innerHTML = "<div class='tipo' style='background-color:" + tipodefinitivo[0][2] + " ;'>" + tipodefinitivo[0][1] + "</div>"
        tipos_form.innerHTML += "<div class='tipo' style='background-color:" + tipodefinitivo[1][2] + " ;'>" + tipodefinitivo[1][1] + "</div>"
    }
    let alternar = false;
    imagen_info_form.onclick = function () {
        let circ = document.getElementsByClassName("circ");
        let imagenfrontal = pokemoncompleto.sprites.front_default;
        let imagenespalda = pokemoncompleto.sprites.back_default;
        if (alternar) {
            imagen_info_form.style.backgroundImage = "url(" + imagenfrontal + ")";
            alternar = false;
            circ[1].style.backgroundColor = "lightgray";
            circ[0].style.backgroundColor = "gray";
        } else {
            imagen_info_form.style.backgroundImage = "url(" + imagenespalda + ")";
            alternar = true

            circ[0].style.backgroundColor = "lightgray";
            circ[1].style.backgroundColor = "gray";
        }
    }
}