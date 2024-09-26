function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        appendMessage('user', userInput);

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:5000/chatbot?user_input=" + encodeURIComponent(userInput), true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var responseData = JSON.parse(this.responseText);
                    var botResponse = responseData.response;
                    appendMessage('bot', botResponse);
                    document.getElementById('user-input').value = '';
                } else {
                    console.error('Error:', this.status);
                }
            }
        };
        xhr.send();
    }
}

function appendMessage(sender, message) {
    var chatDisplay = document.getElementById('chat-display');
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.classList.add('message');
    if (sender === 'user') {
        messageDiv.classList.add('user-message');
    } else {
        messageDiv.classList.add('bot-message');
    }
    chatDisplay.appendChild(messageDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // Auto scroll to bottom
}

