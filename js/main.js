/* main.js - Core Interactions */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. Form Submission Mock
    const communityForm = document.getElementById('communityForm');
    if (communityForm) {
        communityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = communityForm.querySelector('.submit-btn');
            const originalText = btn.textContent;
            
            btn.textContent = 'Transmitting...';
            btn.style.background = 'linear-gradient(45deg, #00f2fe, #4facfe)';
            
            // Simulate network request
            setTimeout(() => {
                communityForm.innerHTML = '<div class="success-message" style="text-align: center; padding: 2rem;"><h3 style="color: var(--accent-teal)">Transmission Received!</h3><p>Your frequency signature has been logged in our quantum databases.</p></div>';
            }, 1500);
        });
    }

    // 5. Add floating animation to random elements for aesthetic
    document.querySelectorAll('.theory-item, .blog-post').forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('float-anim');
        } else {
            el.classList.add('float-anim-alt');
        }
    });

    // 6. Professional AI Chatbot (Aethera Oracle)
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');

    if (chatToggle && chatWindow) {
        let isChatOpen = false;
        
        // Chatbot State Machine
        let chatState = 'INIT';
        const userData = {
            name: '',
            dob: '',
            birthplace: ''
        };

        const addMessage = (text, isBot = true) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const handleChatState = (input) => {
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
        };

        const sendMessage = () => {
            const text = chatInput.value;
            if (text.trim() === '') return;
            
            addMessage(text, false);
            chatInput.value = '';
            
            // Artificial delay for bot thinking
            setTimeout(() => {
                handleChatState(text);
            }, 600);
        };

        chatToggle.addEventListener('click', () => {
            isChatOpen = true;
            chatWindow.classList.add('active');
            chatToggle.style.transform = 'scale(0)';
            
            // Init chat if empty
            if (chatMessages.children.length === 0) {
                setTimeout(() => handleChatState(''), 500);
            }
        });

        closeChat.addEventListener('click', () => {
            isChatOpen = false;
            chatWindow.classList.remove('active');
            chatToggle.style.transform = 'scale(1)';
        });

        sendChat.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
});
