let boton=document.getElementById("submit");
let input=document.getElementById("input");


input.addEventListener("keyup",()=>{
    validar();
});
boton.onclick=()=>{
    validar();
};


function validar() {
    let input=document.getElementById("input");
    let formulario=document.getElementById("formulario");
    let logoerror=document.getElementById("logoerror");
    let mensajeerror=document.getElementById("error");

    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(input.value)){
        formulario.style.border="1px solid rgba(189, 158, 158, 0.5)";
        logoerror.style.display="none";
        mensajeerror.style.display="none";
        
    } else {
        formulario.style.border="1px solid rgb(255, 95, 95)";
        logoerror.style.display="block";
        mensajeerror.style.display="block";
    }
 
}