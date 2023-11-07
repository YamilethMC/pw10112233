async function apirandomuser(){
    const respuesta = await fetch("https://randomuser.me/api/");
    const datos = await respuesta.json();
    let foto = document.getElementById("foto");
    let nombre = document.getElementById("nombre");
    let telefono = document.getElementById("telefono");
    foto.setAttribute("src",datos.results[0].picture.large);
    nombre.innerHTML=datos.results[0].name.first+" "+datos.results[0].name.last;
    telefono.innerHTML=datos.results[0].phone;
}