

var tablacuerpo= document.getElementById('cuerpo');
var agregar= document.getElementById('agregar');
var NombreUsuario=document.getElementById('NombreUsuario');
var ApellidoUsuario=document.getElementById('ApellidoUsuario');
var NumeroUsuario=document.getElementById('NumeroUsuario');
var aviso=document.getElementById('aviso');
var activo=false;

agregar.onclick= function(e){
    anadir(NombreUsuario.value,ApellidoUsuario.value,NumeroUsuario.value);
    
}

function borrar(boton){
   boton.parentNode.parentNode.remove(); 
    
}

function editar(boton) { 
    
    if (!activo) {
        boton.parentNode.parentNode.nextSibling.style.display='contents';
        activo=true;
    }else if(activo){
        boton.parentNode.parentNode.nextSibling.style.display='none';
        activo=false;
    }
  
}

function confirmar(){
    
}



function anadir(nombre, apellido, numero){
    var contador=0;
    if(nombre!=''&&apellido!='' && numero!=''){
        tablacuerpo.innerHTML+='<tr><td>'+nombre+'</td> <td>'+apellido+'</td> <td>'+numero+'</td><td><input type="button" value="" class="borrar" onclick="borrar(this)"></td><td><input type="button" value="" class="editar" onclick="editar(this)"></td> </tr>';
        tablacuerpo.innerHTML+='<tr style="display:none;"><td><input type="text" placeholder="Nuevo Nombre" ></td> <td><input type="text" placeholder="Nuevo apellido" ></td> <td><input type="number" placeholder="Nuevo Numero"</td><td><input type="button" value="" onclick="confirmar()" class="check"></td><td></td> </tr>';
        aviso.style.display='none';
        NombreUsuario.value='';
        ApellidoUsuario.value='';
        NumeroUsuario.value='';
    }else{
        aviso.style.display='block';
    }  
}

