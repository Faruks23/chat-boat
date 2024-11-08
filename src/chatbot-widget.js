(function () {
    // Create the chatbot container
    const chatbot = document.createElement('div');
    chatbot.id = 'chatbot-widget';
    document.body.appendChild(chatbot);
  
    // Style the chatbot widget
    chatbot.style.position = 'fixed';
    chatbot.style.bottom = '10px';
    chatbot.style.right = '10px';
    chatbot.style.width = '300px';
    chatbot.style.height = '400px';
    chatbot.style.backgroundColor = 'white';
    chatbot.style.border = '1px solid #ccc';
    chatbot.style.borderRadius = '8px';
    chatbot.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.1)';
    chatbot.style.zIndex = '9999';
    chatbot.style.display = 'flex';
    chatbot.style.flexDirection = 'column';
    chatbot.style.overflow = 'hidden';
  
    // Create the chat window to display messages
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chat-window';
    chatWindow.style.flex = '1';
    chatWindow.style.overflowY = 'auto';
    chatWindow.style.padding = '10px';
    chatbot.appendChild(chatWindow);
  
    // Create the input area with a text field and a send button
    const inputContainer = document.createElement('div');
    inputContainer.style.display = 'flex';
    inputContainer.style.padding = '10px';
    inputContainer.style.backgroundColor = '#f4f4f4';
    inputContainer.style.borderTop = '1px solid #ccc';
    chatbot.appendChild(inputContainer);
  
    const inputField = document.createElement('input');
    inputField.style.flex = '1';
    inputField.style.padding = '10px';
    inputField.style.borderRadius = '5px';
    inputField.style.border = '1px solid #ccc';
    inputField.placeholder = 'Type a message...';
    inputContainer.appendChild(inputField);
  
    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.style.marginLeft = '10px';
    sendButton.style.padding = '10px';
    sendButton.style.backgroundColor = '#4CAF50';
    sendButton.style.color = 'white';
    sendButton.style.border = 'none';
    sendButton.style.borderRadius = '5px';
    inputContainer.appendChild(sendButton);
  
    // Function to add a message to the chat window
    function addMessage(sender, text) {
      const messageElement = document.createElement('div');
      messageElement.textContent = text;
      messageElement.style.padding = '5px';
      messageElement.style.marginBottom = '10px';
      messageElement.style.backgroundColor = sender === 'user' ? '#e0f7fa' : '#f1f1f1';
      messageElement.style.borderRadius = '5px';
      chatWindow.appendChild(messageElement);
      chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
    }
  
    // Handle the send button click
    sendButton.addEventListener('click', async function () {
      const userMessage = inputField.value;
      if (!userMessage.trim()) return;
  
      // Add the user's message to the chat window
      addMessage('user', userMessage);
  
      // Clear the input field
      inputField.value = '';
  
      // Call the OpenAI API to get the AI response
      try {
        const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY', // Replace with your API key
          },
          body: JSON.stringify({
            model: 'text-davinci-003',  // You can change to other models like 'gpt-4'
            prompt: userMessage,
            max_tokens: 150,
          }),
        });
        const data = await response.json();
        const aiMessage = data.choices[0].text.trim() || "Sorry, I didn't understand that.";
        addMessage('ai', aiMessage); // Add AI's response to the chat window
      } catch (error) {
        console.error('Error:', error);
        addMessage('ai', 'Sorry, something went wrong.');
      }
    });
  
    // Handle enter key press to send message
    inputField.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        sendButton.click();
      }
    });
  })();
  