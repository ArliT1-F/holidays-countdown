// ============================================================================
// 🎄 HOLIDAY COUNTDOWN - MAIN JAVASCRIPT
// ============================================================================

// ============================================================================
// SECTION 1: CONFIGURATION & STATE
// ============================================================================

const CONFIG = {
    currentHoliday: 'christmas',
    isPlaying: false,
    volume: 50,
    currentFactIndex: 0,
    wishes: [],
    openedDays: [],
    settings: {
        snow: true,
        lights: true,
        aurora: true,
        animals: true,
        clickEffects: true,
        fog: true,
        showMs: true,
        showStats: true,
        sound: true,
        music: false,
        reduceMotion: false,
        highContrast: false
    },
    skyPhase: 'day', // dawn, day, dusk, night
    lastSecond: -1,
    animationFrame: null,
    intervals: {},
    timeouts: {}
};

// Fun Facts Data
const FACTS = {
    christmas: [
        "The tradition of Christmas trees started in Germany in the 16th century! 🌲",
        "Rudolph the Red-Nosed Reindeer was created for a department store coloring book in 1939! 🦌",
        "The first Christmas card was sent in 1843 in England! 📬",
        "Santa Claus has different names worldwide: Père Noël, Sinterklaas, Babbo Natale! 🎅",
        "Jingle Bells was originally written for Thanksgiving, not Christmas! 🔔",
        "The world's tallest Christmas tree was 221 feet tall, displayed in Seattle in 1950! 🎄",
        "Christmas wasn't a federal holiday in the US until 1870! 📅",
        "Approximately 3 billion Christmas cards are sent in the US every year! 💌",
        "The first artificial Christmas trees were made in Germany using dyed goose feathers! 🪶",
        "Electric Christmas lights were first used in 1880 by Thomas Edison! 💡",
        "In Japan, eating KFC chicken on Christmas is a popular tradition! 🍗",
        "The Christmas wreath symbolizes eternal life because of its circular shape! 🎀"
    ],
    newyear: [
        "The Times Square ball drop has been a tradition since 1907! 🗽",
        "In Spain, people eat 12 grapes at midnight for good luck! 🍇",
        "The first New Year's celebration dates back 4,000 years to ancient Babylon! 🏛️",
        "In Denmark, people throw unused plates at friends' doors for good luck! 🍽️",
        "Auld Lang Syne means 'times gone by' in Scottish! 🎵",
        "About 1 billion people watch the Times Square ball drop! 📺",
        "In Colombia, people carry empty suitcases around hoping for travel in the new year! 🧳",
        "The tradition of New Year's resolutions dates back to the ancient Babylonians! 📝",
        "In Japan, Buddhist temples ring their bells 108 times at midnight! 🔔",
        "The Times Square ball weighs 11,875 pounds and is covered in 2,688 crystals! 💎",
        "In the Philippines, people wear polka dots for prosperity! 👔",
        "Sydney, Australia hosts one of the world's largest New Year's fireworks displays! 🎆"
    ]
};

// Emoji sets for effects
const EMOJIS = {
    christmas: ['❄️', '🎄', '🎅', '🎁', '⭐', '🔔', '🦌', '☃️', '🍪', '🥛', '🎀', '✨'],
    newyear: ['🎆', '🎇', '✨', '🥳', '🎊', '🎉', '🍾', '🥂', '⭐', '💫', '🌟', '🎭']
};

// Sky colors for different times of day
const SKY_COLORS = {
    night: {
        start: 'linear-gradient(180deg, #0a0a1a 0%, #1a1a3a 30%, #2a2a4a 60%, #1a2a3a 100%)',
        end: 'linear-gradient(180deg, #0f0f2a 0%, #1f1f4a 30%, #2f2f5a 60%, #1f3a4a 100%)'
    },
    dawn: {
        start: 'linear-gradient(180deg, #1a1a3a 0%, #3a2a4a 20%, #6a4a5a 40%, #9a6a6a 60%, #ca9a7a 80%, #eaca9a 100%)',
        end: 'linear-gradient(180deg, #2a2a4a 0%, #5a4a5a 20%, #8a6a6a 40%, #ba8a7a 60%, #daba8a 80%, #fade9a 100%)'
    },
    day: {
        start: 'linear-gradient(180deg, #4a90c2 0%, #6ab0d2 30%, #8ad0e2 50%, #aae0f0 70%, #caf0ff 100%)',
        end: 'linear-gradient(180deg, #5aa0d2 0%, #7ac0e2 30%, #9ae0f2 50%, #baf0ff 70%, #daffff 100%)'
    },
    dusk: {
        start: 'linear-gradient(180deg, #4a6a8a 0%, #7a5a6a 20%, #aa6a5a 40%, #da8a5a 60%, #faaa6a 80%, #ffca8a 100%)',
        end: 'linear-gradient(180deg, #3a5a7a 0%, #6a4a5a 20%, #9a5a4a 40%, #ca7a4a 60%, #ea9a5a 80%, #ffba7a 100%)'
    }
};

// Mountain colors for different times
const MOUNTAIN_COLORS = {
    night: { back: '#1a2030', mid: '#2a3040', front: '#3a4050' },
    dawn: { back: '#4a3a4a', mid: '#5a4a5a', front: '#6a5a6a' },
    day: { back: '#6a8090', mid: '#7a90a0', front: '#8aa0b0' },
    dusk: { back: '#5a4a4a', mid: '#6a5a5a', front: '#7a6a6a' }
};


// ============================================================================
// SECTION 2: INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('🎄 Initializing Holiday Countdown...');
    
    // Load saved settings
    loadSettings();
    
    // Initialize components
    initTimezone();
    initSkySystem();
    initSnowfall();
    initStars();
    initClouds();
    initChristmasLights();
    initMountainTrees();
    initGroundAnimals();
    initBirds();
    initFlyingElements();
    initAdventCalendar();
    initFactIndicators();
    initWishInput();
    loadWishes();
    
    // Apply settings
    applySettings();

    // Initialize Audio
    initAudio();
    
    // Start systems
    updateSkyBasedOnTime();
    updateCountdown();
    updateCurrentTime();
    updateFunFact();
    checkSantaSeason();
    
    // Setup event listeners
    setupEventListeners();
    
    // Start animation loop
    startAnimationLoop();
    
    // Start intervals
    startIntervals();
    
    // Hide loading screen
    hideLoadingScreen();
    
    console.log('🎄 Holiday Countdown initialized successfully!');
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }
}

function startIntervals() {
    // Update current time every second
    CONFIG.intervals.time = setInterval(updateCurrentTime, 1000);
    
    // Update sky every minute
    CONFIG.intervals.sky = setInterval(updateSkyBasedOnTime, 60000);
    
    // Rotate fun facts every 30 seconds
    CONFIG.intervals.facts = setInterval(nextFact, 30000);
    
    // Spawn birds periodically
    CONFIG.intervals.birds = setInterval(spawnBird, 8000);
    
    // Check Santa season every hour
    CONFIG.intervals.santa = setInterval(checkSantaSeason, 3600000);
    
    // Spawn shooting stars at night
    CONFIG.intervals.shootingStars = setInterval(() => {
        if (CONFIG.skyPhase === 'night') {
            spawnShootingStar();
        }
    }, 5000);
    
    // Animate ground deer
    CONFIG.intervals.deer = setInterval(animateGroundDeer, 10000);
}

function startAnimationLoop() {
    let lastTime = 0;
    
    function loop(timestamp) {
        const deltaTime = timestamp - lastTime;
        
        // Update countdown at ~60fps
        if (deltaTime >= 16) {
            updateCountdown();
            lastTime = timestamp;
        }
        
        CONFIG.animationFrame = requestAnimationFrame(loop);
    }
    
    CONFIG.animationFrame = requestAnimationFrame(loop);
}


// ============================================================================
// SECTION 3: SETTINGS MANAGEMENT
// ============================================================================

function loadSettings() {
    try {
        const saved = localStorage.getItem('holidayCountdownData');
        if (saved) {
            const data = JSON.parse(saved);
            CONFIG.settings = { ...CONFIG.settings, ...data.settings };
            CONFIG.currentHoliday = data.currentHoliday || 'christmas';
            CONFIG.wishes = data.wishes || [];
            CONFIG.openedDays = data.openedDays || [];
            CONFIG.volume = data.volume || 50;
        }
    } catch (e) {
        console.warn('Could not load settings:', e);
    }
}

function saveSettings() {
    try {
        const data = {
            settings: CONFIG.settings,
            currentHoliday: CONFIG.currentHoliday,
            wishes: CONFIG.wishes,
            openedDays: CONFIG.openedDays,
            volume: CONFIG.volume
        };
        localStorage.setItem('holidayCountdownData', JSON.stringify(data));
    } catch (e) {
        console.warn('Could not save settings:', e);
    }
}

function applySettings() {
    // Apply toggle states
    const toggleMappings = {
        'snowToggle': 'snow',
        'lightsToggle': 'lights',
        'auroraToggle': 'aurora',
        'animalsToggle': 'animals',
        'clickToggle': 'clickEffects',
        'fogToggle': 'fog',
        'msToggle': 'showMs',
        'statsToggle': 'showStats',
        'soundToggle': 'sound',
        'musicToggleSwitch': 'music',
        'reduceMotionToggle': 'reduceMotion',
        'highContrastToggle': 'highContrast'
    };
    
    Object.entries(toggleMappings).forEach(([elementId, settingKey]) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.checked = CONFIG.settings[settingKey];
        }
    });
    
    // Apply visual settings
    toggleElement('snowfallLayer', CONFIG.settings.snow);
    toggleElement('lightsString', CONFIG.settings.lights);
    toggleElement('northernLights', CONFIG.settings.aurora);
    toggleElement('birdsContainer', CONFIG.settings.animals);
    toggleElement('groundAnimals', CONFIG.settings.animals);
    toggleElement('fogLayer', CONFIG.settings.fog);
    toggleElement('msRow', CONFIG.settings.showMs);
    toggleElement('msSeparator', CONFIG.settings.showMs);
    toggleElement('statsContainer', CONFIG.settings.showStats);
    
    // Apply reduce motion
    if (CONFIG.settings.reduceMotion) {
        document.body.classList.add('reduce-motion');
    } else {
        document.body.classList.remove('reduce-motion');
    }
    
    // Apply high contrast
    if (CONFIG.settings.highContrast) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
    
    // Apply holiday theme
    switchHoliday(CONFIG.currentHoliday, false);
    
    // Apply volume
    document.getElementById('volumeSlider').value = CONFIG.volume;
}

function resetSettings() {
    CONFIG.settings = {
        snow: true,
        lights: true,
        aurora: true,
        animals: true,
        clickEffects: true,
        fog: true,
        showMs: true,
        showStats: true,
        sound: true,
        music: false,
        reduceMotion: false,
        highContrast: false
    };
    saveSettings();
    applySettings();
    showToast('✅ Settings reset to default!');
}

function toggleElement(id, show) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = show ? '' : 'none';
    }
}


// ============================================================================
// SECTION 4: EVENT LISTENERS
// ============================================================================

function setupEventListeners() {
    // Settings toggles
    setupSettingToggle('snowToggle', 'snow', () => {
        toggleElement('snowfallLayer', CONFIG.settings.snow);
    });
    
    setupSettingToggle('lightsToggle', 'lights', () => {
        toggleElement('lightsString', CONFIG.settings.lights);
    });
    
    setupSettingToggle('auroraToggle', 'aurora', () => {
        toggleElement('northernLights', CONFIG.settings.aurora);
    });
    
    setupSettingToggle('animalsToggle', 'animals', () => {
        toggleElement('birdsContainer', CONFIG.settings.animals);
        toggleElement('groundAnimals', CONFIG.settings.animals);
    });
    
    setupSettingToggle('clickToggle', 'clickEffects');
    
    setupSettingToggle('fogToggle', 'fog', () => {
        toggleElement('fogLayer', CONFIG.settings.fog);
    });
    
    setupSettingToggle('msToggle', 'showMs', () => {
        toggleElement('msRow', CONFIG.settings.showMs);
        toggleElement('msSeparator', CONFIG.settings.showMs);
    });
    
    setupSettingToggle('statsToggle', 'showStats', () => {
        toggleElement('statsContainer', CONFIG.settings.showStats);
    });
    
    setupSettingToggle('soundToggle', 'sound');
    
    setupSettingToggle('musicToggleSwitch', 'music', () => {
        if (CONFIG.settings.music) {
            startMusic();
        } else {
            stopMusic();
        }
    });
    
    setupSettingToggle('reduceMotionToggle', 'reduceMotion', () => {
        document.body.classList.toggle('reduce-motion', CONFIG.settings.reduceMotion);
    });
    
    setupSettingToggle('highContrastToggle', 'highContrast', () => {
        document.body.classList.toggle('high-contrast', CONFIG.settings.highContrast);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
    
    // Click effects
    document.addEventListener('click', handleGlobalClick);
    
    // Music controls
    document.getElementById('musicToggle')?.addEventListener('click', toggleMusic);
    document.getElementById('volumeSlider')?.addEventListener('input', handleVolumeChange);
    
    // Modal close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Fullscreen change
    document.addEventListener('fullscreenchange', updateFullscreenButton);
    
    // Visibility change (pause animations when tab not visible)
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Window resize
    window.addEventListener('resize', debounce(handleResize, 250));
}

function setupSettingToggle(elementId, settingKey, callback) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener('change', (e) => {
            CONFIG.settings[settingKey] = e.target.checked;
            saveSettings();
            if (callback) callback();
        });
    }
}

function handleKeyboard(e) {
    // Ignore if in input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch (e.key.toLowerCase()) {
        case 'm':
            toggleMusic();
            break;
        case 's':
            openModal('settingsModal');
            break;
        case 'f':
            toggleFullscreen();
            break;
        case 'c':
            switchHoliday('christmas');
            break;
        case 'n':
            switchHoliday('newyear');
            break;
        case '?':
            openModal('infoModal');
            break;
        case ' ':
            e.preventDefault();
            createConfettiAtCenter();
            break;
    }
}

function handleGlobalClick(e) {
    if (!CONFIG.settings.clickEffects) return;
    
    // Don't trigger on buttons and interactive elements
    if (e.target.closest('button, a, input, .modal, .wish-item')) return;
    
    createClickEffect(e.clientX, e.clientY);
    
    if (CONFIG.settings.sound) {
        playClickSound();
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        // Pause heavy animations
        cancelAnimationFrame(CONFIG.animationFrame);
    } else {
        // Resume
        startAnimationLoop();
    }
}

function handleResize() {
    // Recalculate positions if needed
    updateSkyBasedOnTime();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


// ============================================================================
// SECTION 5: TIMEZONE & TIME DETECTION
// ============================================================================

function initTimezone() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezoneElement = document.getElementById('timezone');
    if (timezoneElement) {
        timezoneElement.textContent = timezone;
    }
    
    const infoTimezone = document.getElementById('infoTimezone');
    if (infoTimezone) {
        infoTimezone.textContent = timezone;
    }
}

function getCurrentTimeInfo() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    
    return {
        hours,
        minutes,
        totalMinutes,
        date: now
    };
}

function getSkyPhase() {
    const { hours } = getCurrentTimeInfo();
    
    // Dawn: 5-7
    // Day: 7-17
    // Dusk: 17-20
    // Night: 20-5
    
    if (hours >= 5 && hours < 7) return 'dawn';
    if (hours >= 7 && hours < 17) return 'day';
    if (hours >= 17 && hours < 20) return 'dusk';
    return 'night';
}

function getTimeOfDayInfo() {
    const phase = getSkyPhase();
    const icons = {
        dawn: '🌅',
        day: '☀️',
        dusk: '🌆',
        night: '🌙'
    };
    const texts = {
        dawn: 'Dawn',
        day: 'Day',
        dusk: 'Dusk',
        night: 'Night'
    };
    
    return {
        phase,
        icon: icons[phase],
        text: texts[phase]
    };
}


// ============================================================================
// SECTION 6: SKY SYSTEM
// ============================================================================

function initSkySystem() {
    createStars();
    updateCelestialBodies();
}

function updateSkyBasedOnTime() {
    const timeInfo = getTimeOfDayInfo();
    CONFIG.skyPhase = timeInfo.phase;
    
    // Update sky gradient
    updateSkyGradient(timeInfo.phase);
    
    // Update celestial bodies
    updateCelestialBodies();
    
    // Update mountain colors
    updateMountainColors(timeInfo.phase);
    
    // Update UI indicator
    updateTimeOfDayIndicator(timeInfo);
    
    // Show/hide night elements
    updateNightElements(timeInfo.phase);
    
    // Update info modal
    const infoPhase = document.getElementById('infoSkyPhase');
    if (infoPhase) {
        infoPhase.textContent = `${timeInfo.icon} ${timeInfo.text}`;
    }
}

function updateSkyGradient(phase) {
    const sky = document.getElementById('sky');
    if (!sky) return;
    
    const colors = SKY_COLORS[phase];
    sky.style.background = colors.start;
    
    // Add subtle animation
    sky.style.transition = 'background 2s ease';
}

function updateCelestialBodies() {
    const { hours, minutes } = getCurrentTimeInfo();
    const sun = document.getElementById('sun');
    const moon = document.getElementById('moon');
    
    if (!sun || !moon) return;
    
    // Calculate positions (simplified arc)
    // Sun visible roughly 6am - 6pm
    // Moon visible roughly 6pm - 6am
    
    const totalDayMinutes = hours * 60 + minutes;
    
    // Sun position (rises at 6am, sets at 6pm)
    if (hours >= 6 && hours < 18) {
        const sunProgress = (totalDayMinutes - 360) / 720; // 0 to 1 during day
        const sunX = sunProgress * 80 + 10; // 10% to 90%
        const sunY = Math.sin(sunProgress * Math.PI) * 40 + 10; // Arc from top
        
        sun.style.left = `${sunX}%`;
        sun.style.top = `${100 - sunY}%`;
        sun.style.opacity = '1';
        sun.style.transform = 'translate(-50%, -50%) scale(1)';
    } else {
        sun.style.opacity = '0';
    }
    
    // Moon position (rises at 6pm, sets at 6am)
    const moonVisible = hours >= 18 || hours < 6;
    if (moonVisible) {
        let moonProgress;
        if (hours >= 18) {
            moonProgress = (totalDayMinutes - 1080) / 720;
        } else {
            moonProgress = (totalDayMinutes + 360) / 720;
        }
        moonProgress = Math.max(0, Math.min(1, moonProgress));
        
        const moonX = moonProgress * 80 + 10;
        const moonY = Math.sin(moonProgress * Math.PI) * 35 + 15;
        
        moon.style.left = `${moonX}%`;
        moon.style.top = `${100 - moonY}%`;
        moon.style.opacity = '1';
        moon.style.transform = 'translate(-50%, -50%) scale(1)';
    } else {
        moon.style.opacity = '0';
    }
}

function updateMountainColors(phase) {
    const colors = MOUNTAIN_COLORS[phase];
    
    document.querySelectorAll('.mountain-back-1').forEach(el => {
        el.style.fill = colors.back;
    });
    document.querySelectorAll('.mountain-mid-1').forEach(el => {
        el.style.fill = colors.mid;
    });
    document.querySelectorAll('.mountain-front-1').forEach(el => {
        el.style.fill = colors.front;
    });
}

function updateTimeOfDayIndicator(info) {
    const icon = document.getElementById('todIcon');
    const text = document.getElementById('todText');
    
    if (icon) icon.textContent = info.icon;
    if (text) text.textContent = info.text;
}

function updateNightElements(phase) {
    const starsLayer = document.getElementById('starsLayer');
    const northernLights = document.getElementById('northernLights');
    
    const isNight = phase === 'night';
    const isDusk = phase === 'dusk';
    const isDawn = phase === 'dawn';
    
    if (starsLayer) {
        starsLayer.style.opacity = isNight ? '1' : (isDusk || isDawn ? '0.3' : '0');
    }
    
    if (northernLights && CONFIG.settings.aurora) {
        northernLights.style.opacity = isNight ? '1' : '0';
    }
}


// ============================================================================
// SECTION 7: STARS
// ============================================================================

function initStars() {
    createStars();
}

function createStars() {
    const container = document.getElementById('starsLayer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 60}%`; // Only in upper portion
        
        // Random size
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random twinkle animation delay
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        
        container.appendChild(star);
    }
}

function spawnShootingStar() {
    const container = document.getElementById('shootingStarsContainer');
    if (!container) return;
    
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Random starting position (upper right area)
    shootingStar.style.left = `${Math.random() * 50 + 30}%`;
    shootingStar.style.top = `${Math.random() * 30}%`;
    
    container.appendChild(shootingStar);
    
    // Remove after animation
    setTimeout(() => {
        shootingStar.remove();
    }, 2000);
}


// ============================================================================
// SECTION 8: SNOWFALL
// ============================================================================

function initSnowfall() {
    createSnowflakes();
}

function createSnowflakes() {
    const container = document.getElementById('snowfallLayer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const snowflakeCount = 80;
    const symbols = ['❄', '❅', '❆', '✻', '✼', '❉', '•'];
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Random position
        snowflake.style.left = `${Math.random() * 100}%`;
        
        // Random animation properties
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 10;
        const size = Math.random() * 1.2 + 0.4;
        
        snowflake.style.fontSize = `${size}rem`;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${delay}s`;
        snowflake.style.opacity = Math.random() * 0.6 + 0.4;
        
        container.appendChild(snowflake);
    }
}


// ============================================================================
// SECTION 9: CLOUDS
// ============================================================================

function initClouds() {
    createClouds();
}

function createClouds() {
    const container = document.getElementById('cloudsLayer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const cloudCount = 5;
    
    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        // Create cloud shape using multiple circles
        cloud.innerHTML = `
            <div class="cloud-part cp1"></div>
            <div class="cloud-part cp2"></div>
            <div class="cloud-part cp3"></div>
            <div class="cloud-part cp4"></div>
        `;
        
        // Random position
        cloud.style.top = `${Math.random() * 30 + 5}%`;
        
        // Random animation duration
        const duration = Math.random() * 60 + 40;
        cloud.style.animationDuration = `${duration}s`;
        cloud.style.animationDelay = `${-Math.random() * duration}s`;
        
        // Random size
        const scale = Math.random() * 0.5 + 0.5;
        cloud.style.transform = `scale(${scale})`;
        
        container.appendChild(cloud);
    }
}


// ============================================================================
// SECTION 10: CHRISTMAS LIGHTS
// ============================================================================

function initChristmasLights() {
    createChristmasLights();
}

function createChristmasLights() {
    const container = document.getElementById('lightsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const colors = ['#ff0000', '#00ff00', '#0066ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#ff0088'];
    const lightCount = 20;
    
    for (let i = 0; i < lightCount; i++) {
        const light = document.createElement('div');
        light.className = 'christmas-light';
        light.style.backgroundColor = colors[i % colors.length];
        light.style.animationDelay = `${(i * 0.1)}s`;
        light.style.left = `${(i / lightCount) * 100}%`;
        
        // Add glow
        light.style.boxShadow = `0 0 10px ${colors[i % colors.length]}, 0 0 20px ${colors[i % colors.length]}`;
        
        container.appendChild(light);
    }
}


// ============================================================================
// SECTION 11: TREES
// ============================================================================

function initMountainTrees() {
    createMountainTrees();
}

function createMountainTrees() {
    const container = document.getElementById('treesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const treeCount = 25;
    
    for (let i = 0; i < treeCount; i++) {
        const tree = document.createElement('div');
        tree.className = 'pine-tree';
        tree.textContent = '🌲';
        
        // Position along the mountain
        tree.style.left = `${Math.random() * 100}%`;
        tree.style.bottom = `${Math.random() * 20 + 10}%`;
        
        // Random size for depth effect
        const size = Math.random() * 1.5 + 0.8;
        tree.style.fontSize = `${size}rem`;
        tree.style.zIndex = Math.floor(size * 10);
        
        container.appendChild(tree);
    }
}


// ============================================================================
// SECTION 12: GROUND ANIMALS
// ============================================================================

function initGroundAnimals() {
    createGroundAnimals();
}

function createGroundAnimals() {
    const container = document.getElementById('groundAnimals');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Add rabbits
    for (let i = 0; i < 3; i++) {
        const rabbit = document.createElement('div');
        rabbit.className = 'ground-animal rabbit';
        rabbit.textContent = '🐰';
        rabbit.style.left = `${10 + Math.random() * 30}%`;
        rabbit.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(rabbit);
    }
    
    // Add foxes
    const fox = document.createElement('div');
    fox.className = 'ground-animal fox';
    fox.textContent = '🦊';
    fox.style.left = '70%';
    container.appendChild(fox);
}

function animateGroundDeer() {
    const container = document.getElementById('groundDeer');
    if (!container || !CONFIG.settings.animals) return;
    
    // Clear existing
    container.innerHTML = '';
    
    // Create a deer that walks across
    const deer = document.createElement('div');
    deer.className = 'walking-deer';
    deer.textContent = '🦌';
    
    // Random direction
    const fromLeft = Math.random() > 0.5;
    deer.classList.add(fromLeft ? 'walk-right' : 'walk-left');
    
    container.appendChild(deer);
    
    // Remove after animation
    setTimeout(() => {
        deer.remove();
    }, 15000);
}


// ============================================================================
// SECTION 13: BIRDS & FLYING ELEMENTS
// ============================================================================

function initBirds() {
    // Initial birds
    for (let i = 0; i < 3; i++) {
        setTimeout(() => spawnBird(), i * 2000);
    }
}

function spawnBird() {
    if (!CONFIG.settings.animals) return;
    
    const container = document.getElementById('birdsContainer');
    if (!container) return;
    
    const bird = document.createElement('div');
    bird.className = 'flying-bird';
    
    // Bird type
    const birdTypes = ['🐦', '🕊️', '🦅'];
    bird.textContent = birdTypes[Math.floor(Math.random() * birdTypes.length)];
    
    // Random starting position
    const startFromLeft = Math.random() > 0.5;
    bird.style.top = `${Math.random() * 40 + 10}%`;
    
    if (startFromLeft) {
        bird.classList.add('fly-right');
        bird.style.left = '-5%';
    } else {
        bird.classList.add('fly-left');
        bird.style.left = '105%';
    }
    
    // Random animation duration
    const duration = Math.random() * 10 + 15;
    bird.style.animationDuration = `${duration}s`;
    
    container.appendChild(bird);
    
    // Remove after animation
    setTimeout(() => {
        bird.remove();
    }, duration * 1000);
}

function initFlyingElements() {
    // Setup Santa's initial state
    checkSantaSeason();
}


// ============================================================================
// SECTION 14: SANTA SYSTEM
// ============================================================================

function checkSantaSeason() {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    
    // Show Santa from Dec 25 to Jan 2
    const isSantaSeason = (month === 11 && day >= 25) || (month === 0 && day <= 2);
    
    const santaSleigh = document.getElementById('santaSleigh');
    if (santaSleigh) {
        if (isSantaSeason) {
            santaSleigh.classList.add('active');
            startSantaAnimation();
        } else {
            santaSleigh.classList.remove('active');
        }
    }
}

function startSantaAnimation() {
    const santaSleigh = document.getElementById('santaSleigh');
    if (!santaSleigh) return;
    
    // Create magic trail particles
    createMagicTrail();
}

function createMagicTrail() {
    const trailContainer = document.getElementById('magicTrail');
    if (!trailContainer) return;
    
    // Create sparkle particles periodically
    setInterval(() => {
        if (!document.getElementById('santaSleigh')?.classList.contains('active')) return;
        
        const sparkle = document.createElement('div');
        sparkle.className = 'magic-sparkle';
        sparkle.textContent = '✨';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
        
        trailContainer.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1500);
    }, 200);
}


// ============================================================================
// SECTION 15: COUNTDOWN LOGIC
// ============================================================================

function getTargetDate() {
    const now = new Date();
    let targetYear = now.getFullYear();
    
    if (CONFIG.currentHoliday === 'christmas') {
        const christmas = new Date(targetYear, 11, 25, 0, 0, 0, 0);
        
        // If Christmas has passed, target next year
        if (now > christmas) {
            targetYear++;
        }
        
        return new Date(targetYear, 11, 25, 0, 0, 0, 0);
    } else {
        // New Year - always next Jan 1
        // Unless it's currently Jan 1
        if (now.getMonth() === 0 && now.getDate() === 1) {
            return new Date(targetYear, 0, 1, 0, 0, 0, 0);
        }
        return new Date(targetYear + 1, 0, 1, 0, 0, 0, 0);
    }
}

function isHolidayNow() {
    const now = new Date();
    
    if (CONFIG.currentHoliday === 'christmas') {
        return now.getMonth() === 11 && now.getDate() === 25;
    } else {
        return now.getMonth() === 0 && now.getDate() === 1;
    }
}

function updateCountdown() {
    const now = new Date();
    const target = getTargetDate();
    const diff = target - now;
    
    // Update year display
    const yearDisplay = document.getElementById('yearDisplay');
    if (yearDisplay) {
        yearDisplay.textContent = now.getFullYear();
    }
    
    // Check if it's the holiday
    if (isHolidayNow() || diff <= 0) {
        showCelebration();
        return;
    }
    
    hideCelebration();
    
    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const milliseconds = Math.floor(diff % 1000);
    
    // Update displays
    updateTimeDisplay('days', days);
    updateTimeDisplay('hours', hours);
    updateTimeDisplay('minutes', minutes);
    updateTimeDisplay('seconds', seconds, true);
    updateTimeDisplay('milliseconds', milliseconds, false, 3);
    
    // Update additional stats
    updateStats(diff, days);
    
    // Update progress
    updateProgress();
    
    // Update share preview
    updateSharePreview(days);
}

function updateTimeDisplay(id, value, animate = false, digits = 2) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const newValue = String(value).padStart(digits, '0');
    const currentValue = element.textContent;
    
    if (newValue !== currentValue) {
        element.textContent = newValue;
        
        // Update shadow element too
        const shadow = element.parentElement?.querySelector('.time-value-shadow');
        if (shadow) {
            shadow.textContent = newValue;
        }
        
        // Animate on second change
        if (animate && id === 'seconds' && value !== CONFIG.lastSecond) {
            element.classList.add('pulse');
            setTimeout(() => element.classList.remove('pulse'), 300);
            CONFIG.lastSecond = value;
        }
    }
}

function updateStats(diff, days) {
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalSeconds = Math.floor(diff / 1000);
    const weeks = Math.floor(days / 7);
    const weekends = Math.ceil(days / 7);
    const sleeps = days + 1;
    
    const stats = {
        totalHours: totalHours.toLocaleString(),
        totalMinutes: totalMinutes.toLocaleString(),
        totalSeconds: totalSeconds.toLocaleString(),
        sleeps: sleeps,
        weeks: weeks,
        weekends: weekends
    };
    
    Object.entries(stats).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element && element.textContent !== String(value)) {
            element.textContent = value;
        }
    });
}

function updateProgress() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    
    const total = endOfYear - startOfYear;
    const elapsed = now - startOfYear;
    const progress = (elapsed / total) * 100;
    
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
        progressFill.setAttribute('aria-valuenow', Math.round(progress));
    }
    
    if (progressPercent) {
        progressPercent.textContent = `${progress.toFixed(1)}%`;
    }
}

function updateSharePreview(days) {
    const text = document.getElementById('sharePreviewText');
    if (text) {
        const holiday = CONFIG.currentHoliday === 'christmas' ? 'Christmas' : 'New Year';
        text.textContent = `${days} days until ${holiday}!`;
    }
}


// ============================================================================
// SECTION 16: CELEBRATION MODE
// ============================================================================

function showCelebration() {
    const countdown = document.getElementById('countdownContainer');
    const stats = document.getElementById('statsContainer');
    const celebration = document.getElementById('celebration');
    const title = document.getElementById('celebrationTitle');
    const subtitle = document.getElementById('celebrationSubtitle');
    
    if (countdown) countdown.style.display = 'none';
    if (stats) stats.style.display = 'none';
    
    if (celebration) {
        celebration.classList.add('active');
    }
    
    if (CONFIG.currentHoliday === 'christmas') {
        if (title) title.textContent = '🎄 Merry Christmas! 🎄';
        if (subtitle) subtitle.textContent = 'Wishing you joy, peace, and happiness!';
    } else {
        if (title) title.textContent = '🎆 Happy New Year! 🎆';
        if (subtitle) subtitle.textContent = 'May this year bring you endless possibilities!';
        
        // Trigger fireworks
        createCelebrationFireworks();
    }
    
    // Continuous confetti
    if (!CONFIG.intervals.celebration) {
        CONFIG.intervals.celebration = setInterval(createConfettiAtCenter, 500);
    }
}

function hideCelebration() {
    const countdown = document.getElementById('countdownContainer');
    const stats = document.getElementById('statsContainer');
    const celebration = document.getElementById('celebration');
    
    if (countdown) countdown.style.display = '';
    if (stats) stats.style.display = '';
    
    if (celebration) {
        celebration.classList.remove('active');
    }
    
    if (CONFIG.intervals.celebration) {
        clearInterval(CONFIG.intervals.celebration);
        CONFIG.intervals.celebration = null;
    }
}

function createCelebrationFireworks() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.5
            );
        }, i * 500);
    }
}

function createFirework(x, y) {
    const colors = ['#ff0000', '#ffd700', '#00ff00', '#00ffff', '#ff00ff', '#ffffff'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }
}


// ============================================================================
// SECTION 17: CURRENT TIME DISPLAY
// ============================================================================

function updateCurrentTime() {
    const now = new Date();
    
    // Main time display
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    };
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const currentTime = document.getElementById('currentTime');
    const currentDate = document.getElementById('currentDate');
    const currentTimeSmall = document.getElementById('currentTimeSmall');
    const infoCurrentTime = document.getElementById('infoCurrentTime');
    
    const timeString = now.toLocaleTimeString(undefined, timeOptions);
    const dateString = now.toLocaleDateString(undefined, dateOptions);
    
    if (currentTime) currentTime.textContent = timeString;
    if (currentDate) currentDate.textContent = dateString;
    if (currentTimeSmall) currentTimeSmall.textContent = timeString;
    if (infoCurrentTime) infoCurrentTime.textContent = timeString;
}


// ============================================================================
// SECTION 18: HOLIDAY SWITCHING
// ============================================================================

function switchHoliday(holiday, showNotification = true) {
    if (CONFIG.currentHoliday === holiday && showNotification) return;
    
    CONFIG.currentHoliday = holiday;
    
    // Update button states
    document.querySelectorAll('.holiday-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    
    const activeBtn = document.querySelector(`.holiday-btn.${holiday}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-selected', 'true');
    }
    
    // Update body theme
    document.body.classList.remove('christmas-theme', 'newyear-theme');
    document.body.classList.add(`${holiday}-theme`);
    
    // Update title
    const titleText = document.querySelector('.title-text');
    const leftEmoji = document.querySelector('.left-emoji');
    const rightEmoji = document.querySelector('.right-emoji');
    
    if (holiday === 'christmas') {
        if (titleText) titleText.textContent = 'Countdown to Christmas';
        if (leftEmoji) leftEmoji.textContent = '🎄';
        if (rightEmoji) rightEmoji.textContent = '🎅';
    } else {
        if (titleText) titleText.textContent = 'Countdown to New Year';
        if (leftEmoji) leftEmoji.textContent = '🎆';
        if (rightEmoji) rightEmoji.textContent = '🎊';
    }
    
    // Show/hide Advent calendar
    const adventSection = document.getElementById('adventSection');
    if (adventSection) {
        adventSection.style.display = holiday === 'christmas' ? '' : 'none';
    }
    
    // Reset fact index and update
    CONFIG.currentFactIndex = 0;
    updateFunFact();
    initFactIndicators();

    // Switch music if playing
    switchMusicForHoliday();
    
    // Save and notify
    saveSettings();
    
    if (showNotification) {
        const name = holiday === 'christmas' ? 'Christmas 🎄' : 'New Year 🎆';
        showToast(`Switched to ${name} countdown!`);
        announceToSR(`Switched to ${name} countdown`);
    }
}


// ============================================================================
// SECTION 19: FUN FACTS
// ============================================================================

function initFactIndicators() {
    const container = document.getElementById('factIndicators');
    if (!container) return;
    
    const facts = FACTS[CONFIG.currentHoliday];
    container.innerHTML = '';
    
    facts.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `fact-dot ${index === CONFIG.currentFactIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => goToFact(index));
        container.appendChild(dot);
    });
    
    // Update counter
    const total = document.getElementById('factTotal');
    if (total) total.textContent = facts.length;
}

function updateFunFact() {
    const facts = FACTS[CONFIG.currentHoliday];
    const factElement = document.getElementById('funFact');
    const currentElement = document.getElementById('factCurrent');
    
    if (factElement) {
        factElement.style.opacity = '0';
        setTimeout(() => {
            factElement.textContent = facts[CONFIG.currentFactIndex];
            factElement.style.opacity = '1';
        }, 200);
    }
    
    if (currentElement) {
        currentElement.textContent = CONFIG.currentFactIndex + 1;
    }
    
    // Update indicators
    document.querySelectorAll('.fact-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === CONFIG.currentFactIndex);
    });
}

function nextFact() {
    const facts = FACTS[CONFIG.currentHoliday];
    CONFIG.currentFactIndex = (CONFIG.currentFactIndex + 1) % facts.length;
    updateFunFact();
}

function prevFact() {
    const facts = FACTS[CONFIG.currentHoliday];
    CONFIG.currentFactIndex = (CONFIG.currentFactIndex - 1 + facts.length) % facts.length;
    updateFunFact();
}

function goToFact(index) {
    CONFIG.currentFactIndex = index;
    updateFunFact();
}


// ============================================================================
// SECTION 20: ADVENT CALENDAR
// ============================================================================

function initAdventCalendar() {
    const grid = document.getElementById('adventGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const isDecember = currentMonth === 11;
    
    for (let day = 1; day <= 24; day++) {
        const doorElement = document.createElement('div');
        doorElement.className = 'advent-door';
        doorElement.dataset.day = day;
        
        const doorFront = document.createElement('div');
        doorFront.className = 'door-front';
        doorFront.textContent = day;
        
        const doorBack = document.createElement('div');
        doorBack.className = 'door-back';
        doorBack.textContent = getAdventSurprise(day);
        
        doorElement.appendChild(doorFront);
        doorElement.appendChild(doorBack);
        
        // Set states
        if (isDecember) {
            if (day < currentDay) {
                doorElement.classList.add('past');
                if (CONFIG.openedDays.includes(day)) {
                    doorElement.classList.add('opened');
                }
            } else if (day === currentDay) {
                doorElement.classList.add('today');
                if (CONFIG.openedDays.includes(day)) {
                    doorElement.classList.add('opened');
                }
            } else {
                doorElement.classList.add('future');
            }
        } else {
            doorElement.classList.add('future');
        }
        
        doorElement.addEventListener('click', () => handleAdventDoorClick(day, doorElement));
        grid.appendChild(doorElement);
    }
    
    updateAdventProgress();
}

function getAdventSurprise(day) {
    const surprises = ['🎁', '⭐', '🎄', '🦌', '☃️', '🔔', '🎅', '❄️', '🍪', '🥛', 
                       '🎶', '💝', '🧦', '🕯️', '🎀', '🌟', '🍫', '🎂', '🎪', '🎠',
                       '🧸', '🎨', '🎭', '🎯'];
    return surprises[day - 1] || '🎁';
}

function handleAdventDoorClick(day, element) {
    const now = new Date();
    
    if (now.getMonth() !== 11) {
        showToast('🎄 The Advent Calendar opens in December!');
        return;
    }
    
    if (day > now.getDate()) {
        showToast('🎁 This door isn\'t ready yet! Come back later.');
        return;
    }
    
    if (CONFIG.openedDays.includes(day)) {
        showToast(`Day ${day}: ${getAdventSurprise(day)}`);
        return;
    }
    
    // Open the door
    CONFIG.openedDays.push(day);
    element.classList.add('opened');
    saveSettings();
    updateAdventProgress();
    
    const surprise = getAdventSurprise(day);
    showToast(`🎉 Day ${day} opened: ${surprise}`);
    
    if (CONFIG.settings.sound) {
        playOpenSound();
    }
    
    // Confetti effect
    createConfettiAtElement(element);
}

function updateAdventProgress() {
    const opened = document.getElementById('adventOpened');
    if (opened) {
        opened.textContent = CONFIG.openedDays.length;
    }
}


// ============================================================================
// SECTION 21: WISH LIST
// ============================================================================

function initWishInput() {
    const input = document.getElementById('wishInput');
    const counter = document.getElementById('wishCharCount');
    
    if (input && counter) {
        input.addEventListener('input', () => {
            counter.textContent = input.value.length;
        });
    }
}

function loadWishes() {
    renderWishList();
    updateWishCount();
}

function addWish(event) {
    event.preventDefault();
    
    const input = document.getElementById('wishInput');
    const wish = input.value.trim();
    
    if (!wish) {
        showToast('⚠️ Please enter a wish!');
        return;
    }
    
    if (CONFIG.wishes.length >= 10) {
        showToast('📝 Maximum 10 wishes allowed!');
        return;
    }
    
    CONFIG.wishes.push({
        id: Date.now(),
        text: wish,
        completed: false
    });
    
    saveSettings();
    renderWishList();
    updateWishCount();
    
    input.value = '';
    document.getElementById('wishCharCount').textContent = '0';
    
    showToast('🎁 Wish added!');
    
    if (CONFIG.settings.sound) {
        playClickSound();
    }
}

function renderWishList() {
    const container = document.getElementById('wishList');
    if (!container) return;
    
    container.innerHTML = '';
    
    CONFIG.wishes.forEach((wish, index) => {
        const wishItem = document.createElement('div');
        wishItem.className = `wish-item ${wish.completed ? 'completed' : ''}`;
        wishItem.role = 'listitem';
        
        wishItem.innerHTML = `
            <button class="wish-complete-btn" 
                    onclick="toggleWishComplete(${index})" 
                    aria-label="Mark as ${wish.completed ? 'incomplete' : 'complete'}">
                ${wish.completed ? '✅' : '⬜'}
            </button>
            <span class="wish-text">${escapeHtml(wish.text)}</span>
            <button class="wish-delete-btn" 
                    onclick="deleteWish(${index})" 
                    aria-label="Delete wish">
                🗑️
            </button>
        `;
        
        container.appendChild(wishItem);
    });
}

function toggleWishComplete(index) {
    if (CONFIG.wishes[index]) {
        CONFIG.wishes[index].completed = !CONFIG.wishes[index].completed;
        saveSettings();
        renderWishList();
    }
}

function deleteWish(index) {
    CONFIG.wishes.splice(index, 1);
    saveSettings();
    renderWishList();
    updateWishCount();
    showToast('🗑️ Wish removed');
}

function clearAllWishes() {
    if (CONFIG.wishes.length === 0) {
        showToast('📝 No wishes to clear');
        return;
    }
    
    if (confirm('Are you sure you want to clear all wishes?')) {
        CONFIG.wishes = [];
        saveSettings();
        renderWishList();
        updateWishCount();
        showToast('🗑️ All wishes cleared');
    }
}

function updateWishCount() {
    const count = document.getElementById('wishCount');
    if (count) {
        count.textContent = CONFIG.wishes.length;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


// ============================================================================
// SECTION 22: EFFECTS & ANIMATIONS
// ============================================================================

function createClickEffect(x, y) {
    const emojis = EMOJIS[CONFIG.currentHoliday];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.textContent = emoji;
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    
    document.body.appendChild(effect);
    
    setTimeout(() => effect.remove(), 800);
}

function createConfetti(event) {
    const x = event ? event.clientX : window.innerWidth / 2;
    const y = event ? event.clientY : window.innerHeight / 3;
    
    createConfettiAt(x, y);
}

function createConfettiAtCenter() {
    createConfettiAt(window.innerWidth / 2, window.innerHeight / 3);
}

function createConfettiAtElement(element) {
    const rect = element.getBoundingClientRect();
    createConfettiAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

function createConfettiAt(x, y) {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffd700', '#ff00ff', '#00ffff', '#ff8800'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = (Math.random() * 10 + 5) + 'px';
        particle.style.height = (Math.random() * 10 + 5) + 'px';
        
        if (Math.random() > 0.5) {
            particle.style.borderRadius = '50%';
        }
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 150 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 150;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translate(${tx}px, ${ty + 300}px) rotate(${Math.random() * 720}deg)`, 
                opacity: 0 
            }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}


// ============================================================================
// SECTION 23: SOUND EFFECTS
// ============================================================================

function playClickSound() {
    if (!CONFIG.settings.sound) return;
    
    // Try to use the audio file first
    if (clickSoundEffect) {
        clickSoundEffect.currentTime = 0;
        clickSoundEffect.play().catch(() => {
            // Fall back to Web Audio API
            playGeneratedClickSound();
        });
    } else {
        playGeneratedClickSound();
    }
}

function playGeneratedClickSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800 + Math.random() * 200;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.05;
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Audio not supported, fail silently
    }
}

function playOpenSound() {
    if (!CONFIG.settings.sound) return;
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Play a cheerful two-note sound
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        
        notes.forEach((freq, i) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.1;
            
            const startTime = audioContext.currentTime + i * 0.1;
            oscillator.start(startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
            oscillator.stop(startTime + 0.3);
        });
    } catch (e) {
        // Audio not supported
    }
}

function playCelebrationSound() {
    if (!CONFIG.settings.sound) return;
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Play a fanfare
        const notes = [
            { freq: 523.25, time: 0 },     // C5
            { freq: 659.25, time: 0.15 },  // E5
            { freq: 783.99, time: 0.3 },   // G5
            { freq: 1046.5, time: 0.45 },  // C6
            { freq: 783.99, time: 0.6 },   // G5
            { freq: 1046.5, time: 0.75 }   // C6
        ];
        
        notes.forEach(({ freq, time }) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'triangle';
            gainNode.gain.value = 0.15;
            
            const startTime = audioContext.currentTime + time;
            oscillator.start(startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
            oscillator.stop(startTime + 0.25);
        });
    } catch (e) {
        // Audio not supported
    }
}

// ============================================================================
// SECTION 24: MUSIC PLAYER
// ============================================================================


// Audio elements (initialized after DOM loads)
let christmasMusic = null;
let newyearMusic = null;
let clickSoundEffect = null;

function initAudio() {
    christmasMusic = document.getElementById('christmasMusic');
    newyearMusic = document.getElementById('newyearMusic');
    clickSoundEffect = document.getElementById('clickSound');
    
    // Set initial volume
    if (christmasMusic) christmasMusic.volume = CONFIG.volume / 100;
    if (newyearMusic) newyearMusic.volume = CONFIG.volume / 100;
    if (clickSoundEffect) clickSoundEffect.volume = 0.3;
    
    // Add ended event listeners for seamless looping
    if (christmasMusic) {
        christmasMusic.addEventListener('ended', () => {
            christmasMusic.currentTime = 0;
            christmasMusic.play();
        });
    }
    
    if (newyearMusic) {
        newyearMusic.addEventListener('ended', () => {
            newyearMusic.currentTime = 0;
            newyearMusic.play();
        });
    }
}

function getCurrentMusic() {
    return CONFIG.currentHoliday === 'christmas' ? christmasMusic : newyearMusic;
}

function getOtherMusic() {
    return CONFIG.currentHoliday === 'christmas' ? newyearMusic : christmasMusic;
}

function toggleMusic() {
    CONFIG.isPlaying = !CONFIG.isPlaying;
    
    const button = document.getElementById('musicToggle');
    const icon = document.getElementById('musicIcon');
    const visualizer = document.getElementById('musicVisualizer');
    const settingToggle = document.getElementById('musicToggleSwitch');
    
    if (CONFIG.isPlaying) {
        if (icon) icon.textContent = '🔊';
        if (button) button.classList.add('playing');
        if (visualizer) visualizer.classList.add('active');
        if (settingToggle) settingToggle.checked = true;
        CONFIG.settings.music = true;
        startMusic();
    } else {
        if (icon) icon.textContent = '🔇';
        if (button) button.classList.remove('playing');
        if (visualizer) visualizer.classList.remove('active');
        if (settingToggle) settingToggle.checked = false;
        CONFIG.settings.music = false;
        stopMusic();
    }
    
    saveSettings();
}

function startMusic() {
    const music = getCurrentMusic();
    const otherMusic = getOtherMusic();
    
    if (otherMusic) {
        fadeOutAudio(otherMusic);
    }
    
    if (music) {
        music.volume = 0;
        music.play().then(() => {
            fadeInAudio(music, CONFIG.volume / 100);
            showToast('🎵 Now playing holiday music!');
        }).catch(error => {
            console.log('Audio autoplay prevented:', error);
            showToast('🔇 Click anywhere to enable music');
            
            // Add one-time click listener to start music
            const startOnClick = () => {
                music.play().then(() => {
                    fadeInAudio(music, CONFIG.volume / 100);
                }).catch(e => console.log('Still cannot play:', e));
                document.removeEventListener('click', startOnClick);
            };
            document.addEventListener('click', startOnClick);
        });
    }
}

function stopMusic() {
    if (christmasMusic) {
        fadeOutAudio(christmasMusic);
    }
    if (newyearMusic) {
        fadeOutAudio(newyearMusic);
    }
}

function fadeInAudio(audio, targetVolume, duration = 1000) {
    if (!audio) return;
    
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;
    
    audio.volume = 0;
    
    const fadeInterval = setInterval(() => {
        currentStep++;
        audio.volume = Math.min(volumeStep * currentStep, targetVolume);
        
        if (currentStep >= steps) {
            clearInterval(fadeInterval);
        }
    }, stepTime);
}

function fadeOutAudio(audio, duration = 500) {
    if (!audio || audio.paused) return;
    
    const steps = 10;
    const stepTime = duration / steps;
    const initialVolume = audio.volume;
    const volumeStep = initialVolume / steps;
    let currentStep = 0;
    
    const fadeInterval = setInterval(() => {
        currentStep++;
        audio.volume = Math.max(initialVolume - (volumeStep * currentStep), 0);
        
        if (currentStep >= steps) {
            clearInterval(fadeInterval);
            audio.pause();
            audio.currentTime = 0;
        }
    }, stepTime);
}

function handleVolumeChange(e) {
    CONFIG.volume = parseInt(e.target.value);
    
    const music = getCurrentMusic();
    if (music && !music.paused) {
        music.volume = CONFIG.volume / 100;
    }
    
    saveSettings();
}

// Switch music when holiday changes
function switchMusicForHoliday() {
    if (!CONFIG.isPlaying) return;
    
    const currentMusic = getCurrentMusic();
    const otherMusic = getOtherMusic();
    
    if (otherMusic && !otherMusic.paused) {
        fadeOutAudio(otherMusic);
    }
    
    if (currentMusic) {
        setTimeout(() => {
            currentMusic.volume = 0;
            currentMusic.play().then(() => {
                fadeInAudio(currentMusic, CONFIG.volume / 100);
            }).catch(e => console.log('Cannot switch music:', e));
        }, 600);
    }
}

// ============================================================================
// SECTION 25: MODALS
// ============================================================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        modal.querySelector('.modal')?.focus();
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}


// ============================================================================
// SECTION 26: FULLSCREEN
// ============================================================================

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            showToast('⚠️ Fullscreen not available');
        });
    } else {
        document.exitFullscreen();
    }
}

function updateFullscreenButton() {
    const btn = document.getElementById('fullscreenBtn');
    if (btn) {
        const icon = btn.querySelector('.btn-icon');
        if (icon) {
            icon.textContent = document.fullscreenElement ? '⛶' : '⛶';
        }
    }
}


// ============================================================================
// SECTION 27: SHARING
// ============================================================================

function getShareText() {
    const days = document.getElementById('days')?.textContent || '0';
    const holiday = CONFIG.currentHoliday === 'christmas' ? 'Christmas' : 'New Year';
    return `🎄 Only ${days} days until ${holiday}! Check out this festive countdown!`;
}

function shareTwitter() {
    const text = getShareText();
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
    closeModal('shareModal');
}

function shareFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    closeModal('shareModal');
}

function shareWhatsApp() {
    const text = getShareText();
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`, '_blank');
    closeModal('shareModal');
}

function shareTelegram() {
    const text = getShareText();
    const url = encodeURIComponent(window.location.href);
    window.open(`https://t.me/share/url?url=${url}&text=${encodeURIComponent(text)}`, '_blank');
    closeModal('shareModal');
}

function shareEmail() {
    const subject = CONFIG.currentHoliday === 'christmas' ? 'Christmas Countdown!' : 'New Year Countdown!';
    const body = getShareText() + '\n\n' + window.location.href;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    closeModal('shareModal');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('📋 Link copied to clipboard!');
        closeModal('shareModal');
    }).catch(() => {
        showToast('⚠️ Could not copy link');
    });
}


// ============================================================================
// SECTION 28: TOAST NOTIFICATIONS
// ============================================================================

function showToast(message, duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    // Remove after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}


// ============================================================================
// SECTION 29: ACCESSIBILITY
// ============================================================================

function announceToSR(message) {
    const announcer = document.getElementById('srAnnounce');
    if (announcer) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    }
}


// ============================================================================
// SECTION 30: CLEANUP
// ============================================================================

window.addEventListener('beforeunload', () => {
    // Cancel animation frame
    if (CONFIG.animationFrame) {
        cancelAnimationFrame(CONFIG.animationFrame);
    }
    
    // Clear all intervals
    Object.values(CONFIG.intervals).forEach(interval => {
        if (interval) clearInterval(interval);
    });
    
    // Clear all timeouts
    Object.values(CONFIG.timeouts).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
    });
    
    // Save settings
    saveSettings();
});


// ============================================================================
// SECTION 31: UTILITY FUNCTIONS
// ============================================================================

// Expose functions globally for HTML onclick handlers
window.switchHoliday = switchHoliday;
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleFullscreen = toggleFullscreen;
window.createConfetti = createConfetti;
window.prevFact = prevFact;
window.nextFact = nextFact;
window.addWish = addWish;
window.deleteWish = deleteWish;
window.toggleWishComplete = toggleWishComplete;
window.clearAllWishes = clearAllWishes;
window.shareTwitter = shareTwitter;
window.shareFacebook = shareFacebook;
window.shareWhatsApp = shareWhatsApp;
window.shareTelegram = shareTelegram;
window.shareEmail = shareEmail;
window.copyLink = copyLink;
window.resetSettings = resetSettings;
window.toggleMusic = toggleMusic;