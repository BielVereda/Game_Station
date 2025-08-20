let socket;

function openSocket(url) {
  if (!url) {
    console.warn('URL do WebSocket não foi fornecida. Conexão não será aberta.');
    return;
  }

  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('WebSocket conectado');
  };

  socket.onclose = () => {
    console.log('WebSocket desconectado');
  };

  socket.onerror = (error) => {
    console.error('WebSocket erro:', error);
  };

  socket.onmessage = (event) => {
    console.log('Mensagem:', event.data);
  };
}

function closeSocket() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
}

window.addEventListener('pagehide', () => {
  closeSocket();
});

window.addEventListener('pageshow', () => {
  // Caso queira reabrir, chame openSocket(url) explicitamente em algum outro lugar do código
});
