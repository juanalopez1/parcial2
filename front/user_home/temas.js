const user_id = localStorage.getItem("user_id");

const temas = await fetch(`http://localhost/back/usuarios/${user_id}/temas`, {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const temas_list = await temas.json();

const container = document.getElementById("temas-container");

for (const tema of temas_list) {
  const li = document.createElement("li");
  li.className = "card";
  li.innerHTML = `<h4>${tema.titulo}</h4>
  <p>${tema.descripcion}</p>`;

  container.appendChild(li);
}

const username = localStorage.getItem('username'); 
console.log(username)
const input = document.getElementById('actual_user');
input.value = `Bienvenido! ${username}`;
input.disabled = true;

const all_temas = document.getElementById("show_all");
all_temas.addEventListener("click", async () => {
  window.location.href = "../home";
});

const logout_button = document.getElementById('logout');
logout_button.addEventListener('click', ()=>{
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/login";
})
