function mostrarTela(id) {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.getElementById(id).classList.add('ativa');
}

document.getElementById("btnCriarGrupo").addEventListener("click", () => {
  mostrarTela('criarGrupo');
});

function abrirChat(nome) {
  mostrarTela('chatGrupo');
  document.getElementById('chatTitulo').textContent = nome;
}

function voltarPara(id) {
  mostrarTela(id);
}
