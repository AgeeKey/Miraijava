// ==========================================
// MIRAI AI - JavaScript Functionality
// ==========================================

// Global State
const state = {
    currentSection: 'dashboard',
    theme: 'dark',
    user: {
        name: 'Пользователь',
        tokensUsed: 12450,
        tasksCompleted: 127,
        activeTime: '18ч 24м',
        memoryUsage: '256 МБ'
    }
};

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeThemeToggle();
    initializeDateTime();
    initializeCharts();
    initializeChat();
    initializeSettings();
    updateStatistics();
    startAutoUpdate();
});

// ==========================================
// NAVIGATION
// ==========================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const actionButtons = document.querySelectorAll('[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateToSection(section);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            if (section) {
                navigateToSection(section);
                // Update nav link active state
                navLinks.forEach(l => l.classList.remove('active'));
                const matchingNav = document.querySelector(`.nav-link[data-section="${section}"]`);
                if (matchingNav) matchingNav.classList.add('active');
            }
        });
    });
}

function navigateToSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        state.currentSection = sectionId;
        
        // Add transition animation
        targetSection.style.opacity = '0';
        setTimeout(() => {
            targetSection.style.opacity = '1';
            targetSection.style.transition = 'opacity 0.3s ease';
        }, 10);
    }
}

// ==========================================
// THEME TOGGLE
// ==========================================

function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.querySelector('.theme-icon').textContent = '☀️';
            state.theme = 'light';
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggle.querySelector('.theme-icon').textContent = '🌙';
            state.theme = 'dark';
        }
        
        // Re-render charts with new theme
        setTimeout(() => {
            initializeCharts();
        }, 100);
    });
}

// ==========================================
// DATE AND TIME
// ==========================================

function initializeDateTime() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

function updateDateTime() {
    const now = new Date();
    
    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateStr = now.toLocaleDateString('ru-RU', dateOptions);
    
    const timeStr = now.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const dateEl = document.getElementById('currentDate');
    const timeEl = document.getElementById('currentTime');
    
    if (dateEl) dateEl.textContent = dateStr;
    if (timeEl) timeEl.textContent = timeStr;
}

// ==========================================
// CHARTS
// ==========================================

function initializeCharts() {
    // Mini charts on dashboard
    drawAgentActivityChart();
    drawMemoryGrowthChart();
    
    // Statistics section charts
    drawAIActivityChart();
    drawTasksChart();
    drawTradingChart();
    drawSystemChart();
}

function drawAgentActivityChart() {
    const canvas = document.getElementById('agentChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate sample data (24 hours)
    const data = Array.from({ length: 24 }, () => Math.random() * 40 + 20);
    
    // Draw line chart
    ctx.strokeStyle = getThemeColor();
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (value / 60) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
}

function drawMemoryGrowthChart() {
    const canvas = document.getElementById('memoryChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate sample data (7 days)
    const data = Array.from({ length: 7 }, (_, i) => 150 + i * 15 + Math.random() * 10);
    
    // Draw area chart
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(28, 212, 175, 0.5)');
    gradient.addColorStop(1, 'rgba(28, 212, 175, 0.1)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (value / 300) * height;
        ctx.lineTo(x, y);
    });
    
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
    
    // Draw line
    ctx.strokeStyle = '#1cd4af';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (value / 300) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
}

function drawAIActivityChart() {
    const canvas = document.getElementById('aiActivityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw bar chart for token usage by type
    const categories = ['Чат', 'Анализ', 'Код', 'Трейдинг', 'Другое'];
    const data = [3500, 2800, 2100, 1600, 1200];
    const colors = ['#6e56cf', '#a361ff', '#426ff6', '#1cd4af', '#8a8aff'];
    
    const barWidth = width / categories.length - 20;
    const maxValue = Math.max(...data);
    
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * (height - 40);
        const x = index * (width / categories.length) + 10;
        const y = height - barHeight - 20;
        
        // Draw bar
        ctx.fillStyle = colors[index];
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = getTextColor();
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(categories[index], x + barWidth / 2, height - 5);
    });
}

function drawTasksChart() {
    const canvas = document.getElementById('tasksChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw pie chart for task statuses
    const data = [
        { label: 'Завершено', value: 85, color: '#1cd44d' },
        { label: 'Активно', value: 12, color: '#426ff6' },
        { label: 'Ожидание', value: 3, color: '#f97316' }
    ];
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 30;
    
    let currentAngle = -Math.PI / 2;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    data.forEach(item => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        // Draw slice
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 20);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 20);
        
        ctx.fillStyle = getTextColor();
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`${item.value}%`, labelX, labelY);
        
        currentAngle += sliceAngle;
    });
}

function drawTradingChart() {
    const canvas = document.getElementById('tradingChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate candlestick-like data
    const data = Array.from({ length: 20 }, () => ({
        open: 100 + Math.random() * 50,
        close: 100 + Math.random() * 50,
        high: 120 + Math.random() * 40,
        low: 80 + Math.random() * 30
    }));
    
    const barWidth = width / data.length - 2;
    
    data.forEach((candle, index) => {
        const x = index * (width / data.length) + barWidth / 2;
        const isGreen = candle.close > candle.open;
        
        // Normalize values to fit chart
        const scale = height / 200;
        const highY = height - candle.high * scale;
        const lowY = height - candle.low * scale;
        const openY = height - candle.open * scale;
        const closeY = height - candle.close * scale;
        
        // Draw wick
        ctx.strokeStyle = isGreen ? '#1cd44d' : '#e11d48';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();
        
        // Draw body
        ctx.fillStyle = isGreen ? '#1cd44d' : '#e11d48';
        const bodyHeight = Math.abs(closeY - openY);
        const bodyY = Math.min(openY, closeY);
        ctx.fillRect(x - barWidth / 4, bodyY, barWidth / 2, bodyHeight);
    });
}

function drawSystemChart() {
    const canvas = document.getElementById('systemChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate sample data for multiple metrics
    const metrics = [
        { name: 'CPU', data: Array.from({ length: 30 }, () => 20 + Math.random() * 40), color: '#6e56cf' },
        { name: 'RAM', data: Array.from({ length: 30 }, () => 40 + Math.random() * 30), color: '#a361ff' },
        { name: 'Disk', data: Array.from({ length: 30 }, () => 30 + Math.random() * 20), color: '#426ff6' }
    ];
    
    metrics.forEach(metric => {
        ctx.strokeStyle = metric.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        metric.data.forEach((value, index) => {
            const x = (index / (metric.data.length - 1)) * width;
            const y = height - (value / 100) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
    });
    
    // Draw legend
    ctx.font = '12px Inter';
    ctx.textAlign = 'left';
    let legendX = 10;
    
    metrics.forEach(metric => {
        ctx.fillStyle = metric.color;
        ctx.fillRect(legendX, 10, 15, 3);
        ctx.fillStyle = getTextColor();
        ctx.fillText(metric.name, legendX + 20, 15);
        legendX += 80;
    });
}

function getThemeColor() {
    return document.body.classList.contains('dark-theme') ? '#a361ff' : '#4a35a5';
}

function getTextColor() {
    return document.body.classList.contains('dark-theme') ? '#ffffff' : '#121212';
}

// ==========================================
// CHAT FUNCTIONALITY
// ==========================================

function initializeChat() {
    const chatInput = document.querySelector('.chat-input');
    const chatSend = document.querySelector('.chat-send');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatSend) return;
    
    // Auto-resize textarea
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = chatInput.scrollHeight + 'px';
    });
    
    // Send message
    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        // Simulate AI response
        setTimeout(() => {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                const responses = [
                    'Анализирую ваш запрос...',
                    'Данные обработаны успешно!',
                    'Выполняю задачу. Прогресс: 45%',
                    'Все системы работают в штатном режиме.',
                    'Интересный вопрос! Дайте мне момент для анализа.'
                ];
                const response = responses[Math.floor(Math.random() * responses.length)];
                addMessage(response, 'mirai');
            }, 1500);
        }, 500);
    };
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatarUrl = sender === 'mirai' 
        ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23a361ff'/%3E%3Ctext x='20' y='26' font-family='Arial' font-size='18' fill='white' text-anchor='middle'%3E未%3C/text%3E%3C/svg%3E"
        : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%236e56cf'/%3E%3Ctext x='20' y='26' font-family='Arial' font-size='18' fill='white' text-anchor='middle'%3EU%3C/text%3E%3C/svg%3E";
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        ${sender === 'mirai' ? `<img src="${avatarUrl}" alt="Mirai" class="message-avatar">` : ''}
        <div class="message-content">
            <div class="message-text">${text}</div>
            <div class="message-time">${timeStr}</div>
        </div>
        ${sender === 'user' ? `<img src="${avatarUrl}" alt="User" class="message-avatar">` : ''}
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const indicator = document.createElement('div');
    indicator.className = 'message mirai typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23a361ff'/%3E%3Ctext x='20' y='26' font-family='Arial' font-size='18' fill='white' text-anchor='middle'%3E未%3C/text%3E%3C/svg%3E" alt="Mirai" class="message-avatar">
        <div class="message-content">
            <div class="message-text">Мирай печатает...</div>
        </div>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// ==========================================
// SETTINGS
// ==========================================

function initializeSettings() {
    const settingsTabs = document.querySelectorAll('.settings-tab');
    const settingsPanels = document.querySelectorAll('.settings-panel');
    
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanel = tab.dataset.tab;
            
            // Update active tab
            settingsTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active panel
            settingsPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetPanel) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// ==========================================
// STATISTICS UPDATE
// ==========================================

function updateStatistics() {
    // Animate token counter
    animateCounter('tokensUsed', state.user.tokensUsed);
    animateCounter('tasksCompleted', state.user.tasksCompleted);
    
    // Update other stats
    document.getElementById('activeTime').textContent = state.user.activeTime;
    document.getElementById('memoryUsage').textContent = state.user.memoryUsage;
    document.getElementById('uptime').textContent = '0д 0ч 12м';
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 1000;
    const startValue = 0;
    const startTime = Date.now();
    
    function update() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = currentValue.toLocaleString('ru-RU');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// ==========================================
// AUTO-UPDATE
// ==========================================

function startAutoUpdate() {
    // Update statistics every 30 seconds
    setInterval(() => {
        // Simulate token usage increase
        state.user.tokensUsed += Math.floor(Math.random() * 10);
        document.getElementById('tokensUsed').textContent = state.user.tokensUsed.toLocaleString('ru-RU');
        
        // Re-draw mini charts
        drawAgentActivityChart();
        drawMemoryGrowthChart();
    }, 30000);
    
    // Add new log entries periodically
    setInterval(() => {
        addRandomLogEntry();
    }, 15000);
}

function addRandomLogEntry() {
    const logsContainer = document.querySelector('.logs-container');
    if (!logsContainer || state.currentSection !== 'dashboard') return;
    
    const modules = ['AI.Engine', 'Trading.Bot', 'API.Server', 'System', 'Memory'];
    const messages = [
        'Запрос обработан успешно',
        'Соединение установлено',
        'Данные обновлены',
        'Задача выполнена',
        'Система стабильна'
    ];
    const types = ['info', 'info', 'info', 'warning'];
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ru-RU');
    
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${types[Math.floor(Math.random() * types.length)]}`;
    logEntry.innerHTML = `
        <span class="log-time">${timeStr}</span>
        <span class="log-module">${modules[Math.floor(Math.random() * modules.length)]}</span>
        <span class="log-message">${messages[Math.floor(Math.random() * messages.length)]}</span>
    `;
    
    logsContainer.insertBefore(logEntry, logsContainer.firstChild);
    
    // Keep only last 20 entries
    while (logsContainer.children.length > 20) {
        logsContainer.removeChild(logsContainer.lastChild);
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Add ripple effect to buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('button') || e.target.closest('button')) {
        const button = e.target.matches('button') ? e.target : e.target.closest('button');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('🌟 Mirai AI System Initialized');
console.log('未来 - Будущее начинается сейчас');
