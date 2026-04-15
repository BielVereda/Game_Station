let socket;
let reconnectInterval = 5000; // 5 segundos

function openSocket(url) {
  if (!url) {
    console.warn('URL do WebSocket não foi fornecida.');
    return;
  }

  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('✅ WebSocket conectado');
    updateStatus(true);
  };

  socket.onclose = () => {
    console.log('❌ WebSocket desconectado');
    updateStatus(false);
    setTimeout(() => openSocket(url), reconnectInterval);
  };

  socket.onerror = (error) => {
    console.error('⚠️ WebSocket erro:', error);
  };

  socket.onmessage = (event) => {
    console.log('📩 Mensagem recebida:', event.data);
    // Exemplo: atualizar um elemento da página
    const msgBox = document.getElementById('ws-messages');
    if (msgBox) {
      msgBox.innerHTML += `<p>${event.data}</p>`;
    }
  };
}

function closeSocket() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
}

function updateStatus(connected) {
  const statusEl = document.getElementById('ws-status');
  if (statusEl) {
    statusEl.textContent = connected ? '🟢 Conectado' : '🔴 Desconectado';
  }
}

window.addEventListener('pagehide', closeSocket);