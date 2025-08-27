document.addEventListener('DOMContentLoaded', () => {

    // --- STATE MANAGEMENT ---
    let state = {
        heartCount: 0,
        coinCount: 100,
        copyCount: 2
    };

    // --- DATA FOR CARDS ---
    
    const services = [
        { name: "National Emergency Number", category: "All", number: "999", icon: "icons/emergency.png", color: "red" },
        { name: "Police Helpline Number", category: "Police", number: "999", icon: "icons/police.png", color: "blue" },
        { name: "Fire Service Number", category: "Fire", number: "999", icon: "icons/fire-service.png", color: "orange" }, 
        { name: "Ambulance Service", category: "Health", number: "1994-999999", icon: "icons/ambulance.png", color: "pink" },
        { name: "Women & Child Helpline", category: "Help", number: "109", icon: "icons/emergency.png", color: "purple" },
        { name: "Anti-Corruption Helpline", category: "Govt.", number: "106", icon: "icons/emergency.png", color: "teal" },
        { name: "Electricity Helpline", category: "Electricity Outage", number: "16216", icon: "icons/emergency.png", color: "yellow" },
        { name: "Brac Helpline", category: "NGO", number: "16445", icon: "icons/brac.png", color: "sky" },
        { name: "Bangladesh Railway Helpline", category: "Travel", number: "163", icon: "icons/Bangladesh-Railway.png", color: "indigo" } 
    ];

    // --- DOM ELEMENTS ---
    const heartCountEl = document.getElementById('heart-count');
    const coinCountEl = document.getElementById('coin-count');
    const copyCountEl = document.getElementById('copy-count');
    const cardsSection = document.getElementById('cards-section');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    // --- FUNCTIONS ---

    const updateNavbarCounts = () => {
        heartCountEl.textContent = state.heartCount;
        coinCountEl.textContent = state.coinCount;
        copyCountEl.textContent = state.copyCount;
    };

    const renderCards = () => {
        cardsSection.innerHTML = '';
        services.forEach(service => {
            const cardHTML = `
                <div class="service-card bg-white p-5 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
                    <div>
                        <div class="flex justify-between items-start">
                           <div class="bg-${service.color}-100 p-3 rounded-lg">
                             <img src="${service.icon}" alt="${service.name}" class="w-8 h-8">
                           </div>
                           <button class="heart-btn text-gray-300 hover:text-red-500 text-2xl">
                                <img src="icons/heart-outline.png" alt="Heart Icon" class="w-7 h-7">
                           </button>
                        </div>
                        <h3 class="text-xl font-bold mt-4 text-gray-800 service-name">${service.name}</h3>
                        <p class="text-gray-500">${service.category}</p>
                        <p class="text-2xl font-mono font-bold my-2 text-gray-900 phone-number">${service.number}</p>
                    </div>
                    <div class="flex items-center gap-3 mt-4">
                        <button class="copy-btn w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors">
                            <img src="icons/copy-outline.png" alt="Copy" class="w-5 h-5"> Copy
                        </button>
                        <button class="call-btn w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                            <img src="icons/call.png" alt="Call" class="w-5 h-5"> Call
                        </button>
                    </div>
                </div>
            `;
            cardsSection.insertAdjacentHTML('beforeend', cardHTML);
        });
    };

    const handleCardClick = (e) => {
        const target = e.target;
        const card = target.closest('.service-card');
        if (!card) return;

        if (target.closest('.heart-btn')) {
            const heartBtn = target.closest('.heart-btn');
            const heartIcon = heartBtn.querySelector('img');

            if (!heartBtn.classList.contains('liked')) {
                 state.heartCount++;
                 updateNavbarCounts();
                 heartBtn.classList.add('liked');
                 heartIcon.src = 'icons/heart.png'; // Filled heart icon
            }
        }
        
        if (target.closest('.copy-btn')) {
            const numberToCopy = card.querySelector('.phone-number').textContent;
            navigator.clipboard.writeText(numberToCopy).then(() => {
                alert(`"${numberToCopy}" has been copied to clipboard!`);
                state.copyCount++;
                updateNavbarCounts();
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy text.');
            });
        }

        if (target.closest('.call-btn')) {
            if (state.coinCount < 20) {
                alert("Sorry, you don't have enough coins to make a call!");
                return;
            }

            state.coinCount -= 20;
            updateNavbarCounts();

            const serviceName = card.querySelector('.service-name').textContent;
            const serviceNumber = card.querySelector('.phone-number').textContent;
            alert(`Calling ${serviceName} at ${serviceNumber}...`);

            const callTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const historyItem = `
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                    <div>
                        <p class="font-semibold text-gray-800">${serviceName}</p>
                        <p class="text-sm text-gray-600">${serviceNumber}</p>
                    </div>
                    <span class="text-xs font-mono text-gray-500">${callTime}</span>
                </div>
            `;
            historyList.insertAdjacentHTML('beforeend', historyItem);
        }
    };
    
    const clearHistory = () => {
        historyList.innerHTML = '';
    }

    // --- EVENT LISTENERS ---
    cardsSection.addEventListener('click', handleCardClick);
    clearHistoryBtn.addEventListener('click', clearHistory);

    // --- INITIALIZATION ---
    updateNavbarCounts();
    renderCards();
});