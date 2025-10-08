let groups = [
    {
        id: 1,
        name: 'Videogame Resenha',
        description: 'Todo tipo de jogo, entre e chame a galera pra jogar e resenhar.',
        image: 'imgs/grupos/videogame.png',
        messages: [
            { sender: 'João', text: 'Quem cola hoje?', time: '17:55' },
            { sender: 'Maria', text: 'Depois das 20h só', time: '17:57' },
            { sender: 'Felipe', text: 'To call já, kd vcs?', time: '20:13' }
        ]
    },
    {
        id: 2,
        name: 'Indie Music Lovers',
        description: 'Compartilhe suas bandas indie favoritas e descubra novas músicas com outros entusiastas.',
        image: 'imgs/grupos/indie.png',
        messages: [
            { sender: 'Clara', text: 'Acabei de montar uma playlist nova, alguém quer ouvir?', time: '10:10' },
            { sender: 'Eduardo', text: 'Manda aí, adoro descobrir bandas novas.', time: '10:13' }
        ]
    },
    {
        id: 3,
        name: 'Futebol no Campus',
        description: 'Junte-se a outros fãs de futebol para jogos casuais e discussões sobre partidas.',
        image: 'imgs/grupos/futebol.png',
        messages: [
            { sender: 'Renato', text: 'Confirmados pro jogo amanhã?', time: '14:15' },
            { sender: 'Thiago', text: 'Sim, eu levo a bola.', time: '14:17' },
            { sender: 'Bruno', text: 'Chego às 18h no campo.', time: '14:20' }
        ]
    },
    {
        id: 4,
        name: 'Leitores Vorazes',
        description: 'Discuta seus livros favoritos, participe de clubes de leitura e compartilhe recomendações.',
        image: 'imgs/grupos/literatura.png',
        messages: [
            { sender: 'Juliana', text: 'Terminei o livro ontem, que história incrível.', time: '21:30' },
            { sender: 'Rafael', text: 'Tô na metade ainda, mas já tô gostando bastante.', time: '21:32' }
        ]
    },
    {
        id: 5,
        name: 'Cozinheiros Amadores',
        description: 'Troque receitas, dicas de culinária e participe de eventos gastronômicos com outros amantes da culinária.',
        image: 'imgs/grupos/cozinheiros.png',
        messages: [
            { sender: 'Beatriz', text: 'Testei uma receita nova de lasanha hoje.', time: '12:10' },
            { sender: 'Fernando', text: 'Deu certo? Tô procurando algo pra fazer no fim de semana.', time: '12:13' },
            { sender: 'Beatriz', text: 'Ficou ótimo, depois mando a receita.', time: '12:16' }
        ]
    },
    {
        id: 6,
        name: 'Fotografia Urbana',
        description: 'Explore a cidade através da lente da fotografia, compartilhe seu trabalho e participe de caminhadas fotográficas.',
        image: 'imgs/grupos/fotografia.png',
        messages: [
            { sender: 'Lara', text: 'As fotos do centro ficaram ótimas hoje.', time: '09:25' },
            { sender: 'Diego', text: 'Quero ver depois, tava com boa luz mesmo.', time: '09:28' }
        ]
    },
    {
        id: 7,
        name: 'Persona!',
        description: 'Grupo para fãs da franquia de jogos Persona!  Bora relembrar sobre o jogo e discutir o futuro da franquia?',
        image: 'imgs/grupos/persona.png',
        messages: [
            { sender: 'Igor', text: 'Terminei Persona 5 ontem, que jogo incrível.', time: '22:40' },
            { sender: 'Natália', text: 'Eu chorei no final, não tava preparada.', time: '22:43' },
            { sender: 'Caio', text: 'Melhor trilha sonora que já ouvi.', time: '22:46' }
        ]
    },
    {
        id: 8,
        name: 'Hollow Knight',
        description: 'Grupo para fãs de hollow !  Bora relembrar sobre o jogo e discutir o futuro da franquia?',
        image: 'imgs/grupos/silksong.png',
        messages: [
            { sender: 'Leonardo', text: 'Mano, cansei de morrer... baixei o mod lá pra tomar só 1 de dano', time: '20:41' },
            { sender: 'Sofia', text: 'Oloco, aí perde a graça do jogo ', time: '20:43' },
            { sender: 'Paula', text: 'Fraco...', time: '20:45' }
        ]
    },

];

// ========================================
// VARIÁVEIS GLOBAIS
// ========================================
let currentGroupId = null;
let uploadedImage = null;

// ========================================
// FUNÇÕES DE NAVEGAÇÃO
// ========================================
function showPage(page) {
    document.getElementById('descobrirPage').classList.add('hidden');
    document.getElementById('chatsPage').classList.add('hidden');
    document.getElementById('perfilPage').classList.add('hidden');
    document.getElementById('criarGrupoPage').classList.add('hidden');
    document.getElementById('chatPage').classList.add('hidden');

    if (page === 'descobrir') {
        document.getElementById('descobrirPage').classList.remove('hidden');
        renderGroups();
    } else if (page === 'chats') {
        document.getElementById('chatsPage').classList.remove('hidden');
        renderChatList();
    } else if (page === 'perfil') {
        document.getElementById('perfilPage').classList.remove('hidden');
    } else if (page === 'criar-grupo') {
        document.getElementById('criarGrupoPage').classList.remove('hidden');
    } else if (page === 'chat') {
        document.getElementById('chatPage').classList.remove('hidden');
        renderChat();
    }
}

// ========================================
// RENDERIZAÇÃO DE GRUPOS
// ========================================
function renderGroups() {
    const grid = document.getElementById('groupsGrid');
    grid.innerHTML = groups.map(group => `
        <div class="group-card" onclick="openChat(${group.id})">
            <div class="group-image">
                ${group.image ? `<img src="${group.image}" alt="${group.name}">` : ''}
            </div>
            <div class="group-info">
                <div class="group-name">${group.name}</div>
                <div class="group-description">${group.description}</div>
            </div>
        </div>
    `).join('');
}

// ========================================
// RENDERIZAÇÃO DA LISTA DE CHATS
// ========================================
function renderChatList() {
    const list = document.getElementById('chatList');
    list.innerHTML = groups.map(group => {
        const lastMessage = group.messages[group.messages.length - 1];
        return `
            <div class="chat-item" onclick="openChat(${group.id})">
                <div class="chat-avatar">
                    ${group.image ? `<img src="${group.image}" alt="${group.name}">` : ''}
                </div>
                <div class="chat-info">
                    <div class="chat-title">${group.name}</div>
                    <div class="chat-preview">${lastMessage ? lastMessage.text : 'Sem mensagens'}</div>
                </div>
                <div class="chat-time">${lastMessage ? lastMessage.time : ''}</div>
            </div>
        `;
    }).join('');
}

// ========================================
// FUNÇÕES DO CHAT
// ========================================
function openChat(groupId) {
    currentGroupId = groupId;
    const group = groups.find(g => g.id === groupId);
    document.getElementById('chatTitle').textContent = group.name;
    showPage('chat');
}

function renderChat() {
    const group = groups.find(g => g.id === currentGroupId);
    const messagesDiv = document.getElementById('chatMessages');
    
    messagesDiv.innerHTML = group.messages.map((msg) => {
        const isOwn = msg.sender === 'Pedro';
        return `
            <div class="message ${isOwn ? 'own' : ''}">
                ${!isOwn ? '<div class="message-avatar"></div>' : ''}
                <div class="message-content">
                    <div class="message-sender">${msg.sender}</div>
                    <div class="message-bubble">${msg.text}</div>
                </div>
                ${isOwn ? '<div class="message-avatar"></div>' : ''}
            </div>
        `;
    }).join('');

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (text && currentGroupId) {
        const group = groups.find(g => g.id === currentGroupId);
        const now = new Date();
        const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        group.messages.push({
            sender: 'Pedro',
            text: text,
            time: time
        });
        
        input.value = '';
        renderChat();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// ========================================
// FUNÇÕES DE CRIAR GRUPO
// ========================================
function toggleInterest(element) {
    element.classList.toggle('selected');
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage = e.target.result;
            const preview = document.getElementById('imagePreview');
            const label = document.getElementById('imageUploadLabel');
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            label.classList.add('has-image');
        }
        reader.readAsDataURL(file);
    }
}

function createGroup() {
    const nameInput = document.getElementById('groupName');
    const name = nameInput.value.trim();
    
    if (name) {
        const newGroup = {
            id: groups.length + 1,
            name: name,
            description: 'Novo grupo criado',
            image: uploadedImage,
            messages: []
        };
        
        groups.push(newGroup);
        
        // Limpar formulário
        nameInput.value = '';
        uploadedImage = null;
        document.getElementById('imagePreview').classList.add('hidden');
        document.getElementById('imageUploadLabel').classList.remove('has-image');
        document.getElementById('imageUpload').value = '';
        
        document.querySelectorAll('.interest-tag').forEach(tag => {
            tag.classList.remove('selected');
        });
        
        alert('Grupo criado com sucesso!');
        showPage('descobrir');
    } else {
        alert('Por favor, digite um nome para o grupo');
    }
}

function cancelCreateGroup() {
    document.getElementById('groupName').value = '';
    uploadedImage = null;
    document.getElementById('imagePreview').classList.add('hidden');
    document.getElementById('imageUploadLabel').classList.remove('has-image');
    document.getElementById('imageUpload').value = '';
    
    document.querySelectorAll('.interest-tag').forEach(tag => {
        tag.classList.remove('selected');
    });
    
    showPage('descobrir');
}

// ========================================
// INICIALIZAÇÃO
// ========================================
window.addEventListener('DOMContentLoaded', () => {
    showPage('descobrir');
});