const paginas = document.querySelectorAll(".pagina");
const titulo = document.getElementById("page-title");
const gruposContainer = document.getElementById("grupos");
const listaChats = document.getElementById("lista-chats");
const mensagens = document.getElementById("mensagens");
let grupoAtual = null;

const grupos = [
  { nome: "Programação", desc: "Discussões sobre código e tecnologia." },
  { nome: "Games", desc: "Fãs de jogos eletrônicos." },
  { nome: "Música", desc: "Compartilhe suas playlists!" },
  { nome: "Cinema", desc: "Filmes, séries e cultura pop." },
  { nome: "Estudos", desc: "Ajuda com faculdade e cursos." },
  { nome: "Cyberpunk", desc: "Futurismo e estilo neon." },
  { nome: "Arte Digital", desc: "Desenho, design e criatividade." },
  { nome: "Memes", desc: "Ria sem moderação 😂" }
];

let chats = {}; // nomeGrupo -> mensagens[]

function mostrarPagina(id) {
  paginas.forEach(p => p.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
  titulo.textContent = 
    id === "feed" ? "Descobrir" :
    id === "chats" ? "Chats" :
    id === "perfil" ? "Perfil" : "App";
}

function abrirCriarGrupo() {
  paginas.forEach(p => p.classList.remove("ativa"));
  document.getElementById("criar-grupo").classList.add("ativa");
  titulo.textContent = "Criar Grupo";
}

function renderGrupos() {
  gruposContainer.innerHTML = "";
  grupos.forEach(g => {
    const div = document.createElement("div");
    div.className = "grupo";
    div.innerHTML = `<h3>${g.nome}</h3><p>${g.desc}</p>`;
    div.onclick = () => abrirChat(g.nome);
    gruposContainer.appendChild(div);
  });
}
renderGrupos();

function criarGrupo() {
  const nome = document.getElementById("nome-grupo").value.trim();
  const desc = document.getElementById("desc-grupo").value.trim();
  if (!nome) return alert("Informe o nome do grupo!");
  grupos.push({ nome, desc });
  chats[nome] = [];
  renderGrupos();
  mostrarPagina("feed");
}

function abrirChat(nomeGrupo) {
  grupoAtual = nomeGrupo;
  paginas.forEach(p => p.classList.remove("ativa"));
  document.getElementById("chat-grupo").classList.add("ativa");
  titulo.textContent = nomeGrupo;
  if (!chats[nomeGrupo]) chats[nomeGrupo] = [];
  renderMensagens();
}

function renderMensagens() {
  mensagens.innerHTML = "";
  chats[grupoAtual].forEach(m => {
    const div = document.createElement("div");
    div.className = "msg " + (m.eu ? "eu" : "");
    div.textContent = m.texto;
    mensagens.appendChild(div);
  });
  mensagens.scrollTop = mensagens.scrollHeight;
}

function enviarMensagem() {
  const input = document.getElementById("msg-input");
  const texto = input.value.trim();
  if (!texto) return;
  chats[grupoAtual].push({ texto, eu: true });
  input.value = "";
  renderMensagens();
}

// Inicializa chats vazios
grupos.forEach(g => chats[g.nome] = []);
