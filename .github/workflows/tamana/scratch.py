import sys

with open('c:/Users/hp/tamana/js/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace addMessage
content = content.replace(
    '''        const addMessage = (text, isBot = true) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };''',
    '''        const addMessage = (text, isBot = true) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            scrollToBottom();
        };

        const scrollToBottom = () => {
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 50);
        };

        const showTypingIndicator = () => {
            const indicator = document.createElement('div');
            indicator.className = 'typing-indicator';
            indicator.id = 'typingIndicator';
            indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
            chatMessages.appendChild(indicator);
            scrollToBottom();
        };

        const hideTypingIndicator = () => {
            const indicator = document.getElementById('typingIndicator');
            if (indicator) indicator.remove();
        };

        const botReply = (text, delay = 1000) => {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                addMessage(text, true);
            }, delay);
        };'''
)

# Replace handleChatState
old_handle_chat_state = '''        const handleChatState = (input) => {
            switch(chatState) {
                case 'INIT':
                    addMessage("Greetings, traveler of the cosmos. I am the Aethera Oracle. To calculate your gravity nodes, may I first have your name?");
                    chatState = 'AWAITING_NAME';
                    break;
                case 'AWAITING_NAME':
                    if(input.trim() === '') return;
                    userData.name = input.trim();
                    addMessage(`Welcome, ${userData.name}. A strong energetic signature. Please provide your Date of Birth (e.g., DD/MM/YYYY) so I can align the planetary frequencies.`);
                    chatState = 'AWAITING_DOB';
                    break;
                case 'AWAITING_DOB':
                    if(input.trim() === '') return;
                    userData.dob = input.trim();
                    addMessage("Fascinating alignment. Lastly, what is your Place of Birth (City, Country)? This helps calculate the localized spatial gravitational pull at the time of your incarnation.");
                    chatState = 'AWAITING_BIRTHPLACE';
                    break;
                case 'AWAITING_BIRTHPLACE':
                    if(input.trim() === '') return;
                    userData.birthplace = input.trim();
                    addMessage("Calculating quantum entanglement and planetary mass resonance...");
                    chatState = 'ANALYZING';
                    
                    setTimeout(() => {
                        addMessage(`Analysis complete, ${userData.name}. Based on your birth coordinates in ${userData.birthplace} on ${userData.dob}, your core Anti-Gravity Node resides in Jupiter's expansion field. You naturally emit a frequency that dissolves obstacles and bends probabilities in your favor. Would you like a deeper reading on specific cosmic influences?`);
                        chatState = 'GENERAL_READING';
                    }, 2000);
                    break;
                case 'GENERAL_READING':
                    if(input.trim() === '') return;
                    addMessage("The cosmic strings are shifting. I sense a strong retrograde anomaly approaching your sector. Stay grounded. I am always here if you require further localized quantum insight.");
                    // Reset or stay in conversation
                    chatState = 'GENERAL_READING';
                    break;
            }
        };'''

new_handle_chat_state = '''        const handleChatState = (input) => {
            switch(chatState) {
                case 'INIT':
                    botReply("Greetings, traveler of the cosmos. I am the Aethera Oracle. To calculate your gravity nodes, may I first have your name?", 800);
                    chatState = 'AWAITING_NAME';
                    break;
                case 'AWAITING_NAME':
                    if(input.trim() === '') return;
                    userData.name = input.trim();
                    botReply(`Welcome, ${userData.name}. A strong energetic signature. Please provide your Date of Birth (e.g., DD/MM/YYYY) so I can align the planetary frequencies.`, 1200);
                    chatState = 'AWAITING_DOB';
                    break;
                case 'AWAITING_DOB':
                    if(input.trim() === '') return;
                    userData.dob = input.trim();
                    botReply("Fascinating alignment. Lastly, what is your Place of Birth (City, Country)? This helps calculate the localized spatial gravitational pull at the time of your incarnation.", 1200);
                    chatState = 'AWAITING_BIRTHPLACE';
                    break;
                case 'AWAITING_BIRTHPLACE':
                    if(input.trim() === '') return;
                    userData.birthplace = input.trim();
                    
                    botReply("Calculating quantum entanglement and planetary mass resonance...", 1000);
                    chatState = 'ANALYZING';
                    
                    setTimeout(() => {
                        botReply(`Analysis complete, ${userData.name}. Based on your birth coordinates in ${userData.birthplace} on ${userData.dob}, your core Anti-Gravity Node resides in Jupiter's expansion field. You naturally emit a frequency that dissolves obstacles and bends probabilities in your favor. Would you like a deeper reading on specific cosmic influences?`, 2500);
                        chatState = 'GENERAL_READING';
                    }, 2500);
                    break;
                case 'GENERAL_READING':
                    if(input.trim() === '') return;
                    botReply("The cosmic strings are shifting. I sense a strong retrograde anomaly approaching your sector. Stay grounded. I am always here if you require further localized quantum insight.", 1500);
                    break;
            }
        };'''
content = content.replace(old_handle_chat_state, new_handle_chat_state)

old_send_msg = '''        const sendMessage = () => {
            const text = chatInput.value;
            if (text.trim() === '') return;
            
            addMessage(text, false);
            chatInput.value = '';
            
            // Artificial delay for bot thinking
            setTimeout(() => {
                handleChatState(text);
            }, 600);
        };'''

new_send_msg = '''        const sendMessage = () => {
            const text = chatInput.value;
            if (text.trim() === '') return;
            
            addMessage(text, false);
            chatInput.value = '';
            
            // Only process state if not analyzing
            if (chatState !== 'ANALYZING') {
                setTimeout(() => {
                    handleChatState(text);
                }, 300);
            }
        };'''

content = content.replace(old_send_msg, new_send_msg)

with open('c:/Users/hp/tamana/js/main.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
