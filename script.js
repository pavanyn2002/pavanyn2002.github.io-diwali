// Light of My Heart - Interactive JavaScript with Enhanced Music Integration
class LightOfMyHeart {
    constructor() {
        this.userName = '';
        this.currentPage = 0;
        this.pages = ['welcomePage', 'lightDiyas', 'fireworks', 'danceOfLights', 'writeWish', 'finalConfession', 'giftCorner'];
        this.loveMessages = [
            "You light up my darkest days ✨",
            "Your smile brightens my world 😊", 
            "In you, I found my forever light 💖",
            "You are my Diwali wish come true 🙏",
            "Every moment with you sparkles ⭐",
            "You make my heart glow like these diyas 💕",
            "Your love is my guiding light 🌟",
            "Together we create the perfect illumination 💫",
            "You are the diya that never stops glowing 🔥",
            "My love for you burns eternal 💖"
        ];
        this.giftMessages = {
            sweets: "Sending you sweetness and joy! 🍬💕",
            sparkler: "May your life always sparkle! ✨🎇",
            diya: "You are my eternal light! 🪔💖",
            flowers: "Blooming with love for you! 🌸💕"
        };
        this.litDiyas = 0;
        this.fireworkCount = 0;
        this.musicPlaying = false;
        this.musicLoaded = false;
        this.audioContext = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createParticles();
        this.setupDiyas();
        this.setupFireworks();
        this.setupMusic();
        this.createFloatingDiyas();
        this.preloadMusic();
    }

    setupEventListeners() {
        // Welcome page
        document.getElementById('beginJourney').addEventListener('click', () => {
            const nameInput = document.getElementById('userName');
            this.userName = nameInput.value.trim() || 'Beautiful Soul';
            this.nextPage();
        });

        // Music toggle
        document.getElementById('musicToggle').addEventListener('click', () => {
            this.toggleMusic();
        });

        // Game 1 - Light Diyas
        document.getElementById('nextToFireworks').addEventListener('click', () => {
            this.nextPage();
        });

        // Game 2 - Fireworks  
        document.getElementById('nextToDance').addEventListener('click', () => {
            this.nextPage();
        });

        // Game 3 - Dance of Lights
        document.getElementById('makeDance').addEventListener('click', () => {
            this.makeDiyasDance();
        });
        
        document.getElementById('nextToWish').addEventListener('click', () => {
            this.nextPage();
        });

        // Write Wish
        document.getElementById('submitWish').addEventListener('click', () => {
            this.submitWish();
        });
        
        document.getElementById('nextToConfession').addEventListener('click', () => {
            this.nextPage();
        });

        // Final Confession
        document.getElementById('confessionDiya').addEventListener('click', () => {
            this.revealConfession();
        });

        // Response buttons
        document.getElementById('yesBtn').addEventListener('click', () => {
            this.handleResponse('yes');
        });
        
        document.getElementById('talkBtn').addEventListener('click', () => {
            this.handleResponse('talk');
        });
        
        document.getElementById('awwBtn').addEventListener('click', () => {
            this.handleResponse('aww');
        });

        document.getElementById('goToGifts').addEventListener('click', () => {
            this.nextPage();
        });

        // Gift Corner
        document.querySelectorAll('.gift-item').forEach(gift => {
            gift.addEventListener('click', () => {
                this.openGift(gift.dataset.gift);
            });
        });

        document.getElementById('shareWebsite').addEventListener('click', () => {
            this.shareWebsite();
        });
    }

    nextPage() {
        if (this.currentPage < this.pages.length - 1) {
            document.getElementById(this.pages[this.currentPage]).classList.remove('active');
            this.currentPage++;
            document.getElementById(this.pages[this.currentPage]).classList.add('active');
            
            // Adjust music volume based on current page
            this.adjustMusicForPage(this.currentPage);
            
            if (this.currentPage === 2) { // Fireworks page
                this.startFireworks();
            }
        }
    }

    // Enhanced music setup with better error handling
    setupMusic() {
        const music = document.getElementById('backgroundMusic');
        
        // Set initial volume and properties
        music.volume = 0.3;
        music.loop = true;
        
        // Add event listeners for music loading
        music.addEventListener('loadstart', () => {
            this.showMusicStatus('Loading Diwali music...');
        });
        
        music.addEventListener('canplaythrough', () => {
            this.musicLoaded = true;
            this.hideMusicStatus();
            console.log('🎵 Diwali music loaded successfully!');
        });
        
        music.addEventListener('error', (e) => {
            console.error('Music loading error:', e);
            this.showMusicStatus('Music unavailable - enjoy visual experience!');
            setTimeout(() => this.hideMusicStatus(), 3000);
        });
        
        music.addEventListener('ended', () => {
            if (this.musicPlaying) {
                music.currentTime = 0;
                music.play().catch(e => console.log('Music replay failed:', e));
            }
        });
    }

    preloadMusic() {
        const music = document.getElementById('backgroundMusic');
        
        // Preload music for faster playback
        music.load();
        
        // Create audio context for better control (if supported)
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    showMusicStatus(message) {
        const statusEl = document.getElementById('musicLoadingStatus');
        statusEl.textContent = message;
        statusEl.classList.remove('hidden');
    }

    hideMusicStatus() {
        const statusEl = document.getElementById('musicLoadingStatus');
        statusEl.classList.add('hidden');
    }

    toggleMusic() {
        const music = document.getElementById('backgroundMusic');
        const musicBtn = document.getElementById('musicToggle');
        
        if (this.musicPlaying) {
            // Fade out music
            this.fadeOutMusic(music, () => {
                music.pause();
                musicBtn.innerHTML = '🔇';
                musicBtn.classList.add('bg-gray-500');
                musicBtn.classList.remove('bg-yellow-500');
                this.musicPlaying = false;
            });
        } else {
            // Resume audio context if suspended
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            // Fade in music
            music.volume = 0;
            music.play().then(() => {
                this.fadeInMusic(music);
                musicBtn.innerHTML = '🔊';
                musicBtn.classList.remove('bg-gray-500');
                musicBtn.classList.add('bg-yellow-500');
                this.musicPlaying = true;
            }).catch(e => {
                console.log('Audio play failed:', e);
                this.showMusicStatus('Click to enable music after user interaction');
                setTimeout(() => this.hideMusicStatus(), 3000);
            });
        }
    }

    fadeInMusic(audioElement, duration = 1000) {
        const targetVolume = 0.3;
        const steps = 20;
        const stepTime = duration / steps;
        const volumeStep = targetVolume / steps;
        
        let currentStep = 0;
        const fadeInterval = setInterval(() => {
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                audioElement.volume = targetVolume;
                return;
            }
            
            audioElement.volume = Math.min(volumeStep * currentStep, targetVolume);
            currentStep++;
        }, stepTime);
    }

    fadeOutMusic(audioElement, callback, duration = 1000) {
        const initialVolume = audioElement.volume;
        const steps = 20;
        const stepTime = duration / steps;
        const volumeStep = initialVolume / steps;
        
        let currentStep = 0;
        const fadeInterval = setInterval(() => {
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                audioElement.volume = 0;
                if (callback) callback();
                return;
            }
            
            audioElement.volume = Math.max(initialVolume - (volumeStep * currentStep), 0);
            currentStep++;
        }, stepTime);
    }

    adjustMusicForPage(pageIndex) {
        const music = document.getElementById('backgroundMusic');
        if (!this.musicPlaying || !music) return;
        
        // Adjust volume based on page content
        let targetVolume = 0.3;
        
        switch(pageIndex) {
            case 0: // Welcome - normal volume
                targetVolume = 0.3;
                break;
            case 1: // Light Diyas - slightly lower for focus
                targetVolume = 0.25;
                break;
            case 2: // Fireworks - lower for sound effects
                targetVolume = 0.2;
                break;
            case 3: // Dance - normal volume
                targetVolume = 0.3;
                break;
            case 4: // Wish - lower for concentration
                targetVolume = 0.25;
                break;
            case 5: // Confession - dramatic volume
                targetVolume = 0.35;
                break;
            case 6: // Gifts - celebratory volume
                targetVolume = 0.3;
                break;
        }
        
        // Smooth volume transition
        const currentVolume = music.volume;
        const volumeDiff = targetVolume - currentVolume;
        const steps = 10;
        const stepTime = 50;
        const volumeStep = volumeDiff / steps;
        
        let step = 0;
        const volumeInterval = setInterval(() => {
            if (step >= steps) {
                clearInterval(volumeInterval);
                music.volume = targetVolume;
                return;
            }
            
            music.volume = currentVolume + (volumeStep * step);
            step++;
        }, stepTime);
    }

    createParticles() {
        const particleContainer = document.getElementById('particles-welcome');
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 3 + 's';
                particleContainer.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 3000);
            }, i * 100);
        }
        
        // Recreate particles every 5 seconds
        setTimeout(() => {
            if (this.currentPage === 0) {
                this.createParticles();
            }
        }, 5000);
    }

    createFloatingDiyas() {
        const container = document.querySelector('.floating-diyas');
        
        setInterval(() => {
            if (this.currentPage === 0 && container) {
                const diya = document.createElement('div');
                diya.className = 'diya-float';
                diya.style.left = Math.random() * 100 + '%';
                diya.style.animationDelay = Math.random() * 2 + 's';
                container.appendChild(diya);
                
                setTimeout(() => {
                    diya.remove();
                }, 6000);
            }
        }, 2000);
    }

    setupDiyas() {
        const container = document.querySelector('.diyas-container');
        
        for (let i = 0; i < 10; i++) {
            const diya = document.createElement('div');
            diya.className = 'diya';
            diya.innerHTML = `
                <div class="diya-body"></div>
                <div class="diya-flame"></div>
            `;
            
            diya.addEventListener('click', () => {
                if (!diya.classList.contains('lit')) {
                    this.lightDiya(diya, i);
                }
            });
            
            container.appendChild(diya);
        }
    }

    lightDiya(diya, index) {
        diya.classList.add('lit');
        this.litDiyas++;
        
        // Show love message
        const messageEl = document.getElementById('loveMessage');
        messageEl.textContent = this.loveMessages[index];
        messageEl.style.animation = 'fadeInUp 0.5s ease-out';
        
        // Update progress
        const progress = document.getElementById('diyaProgress');
        const count = document.getElementById('litCount');
        progress.style.width = (this.litDiyas / 10) * 100 + '%';
        count.textContent = this.litDiyas;
        
        // Show next button when all lit
        if (this.litDiyas === 10) {
            setTimeout(() => {
                document.getElementById('nextToFireworks').classList.remove('hidden');
            }, 1000);
        }
        
        // Add sparkle effect
        this.addSparkleEffect(diya);
    }

    addSparkleEffect(element) {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'particle';
                sparkle.style.position = 'absolute';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                element.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1000);
            }, i * 50);
        }
    }

    // Fireworks System
    setupFireworks() {
        this.canvas = document.getElementById('fireworksCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.fireworks = [];
        this.particles = [];
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    startFireworks() {
        this.canvas.addEventListener('click', (e) => {
            this.createFirework(e.clientX, e.clientY);
        });
        
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.createFirework(touch.clientX, touch.clientY);
        });
        
        this.animateFireworks();
        
        // Auto-launch some fireworks
        setInterval(() => {
            if (this.currentPage === 2) {
                this.createFirework(
                    Math.random() * this.canvas.width,
                    this.canvas.height - Math.random() * 200
                );
            }
        }, 2000);
    }

    createFirework(x, y) {
        this.fireworkCount++;
        document.getElementById('fireworkCount').textContent = this.fireworkCount;
        
        // Create particles
        const colors = ['#ff6b35', '#ffd700', '#ff1493', '#9932cc', '#ffffff'];
        
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 60,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
        
        // Show love declaration after 10 fireworks
        if (this.fireworkCount >= 10) {
            document.getElementById('loveDeclaration').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('nextToDance').classList.remove('hidden');
            }, 2000);
        }
    }

    animateFireworks() {
        if (this.currentPage !== 2) return;
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.life--;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            this.ctx.save();
            this.ctx.globalAlpha = p.life / 60;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
        
        requestAnimationFrame(() => this.animateFireworks());
    }

    makeDiyasDance() {
        const diyas = document.querySelectorAll('.dancing-diya');
        
        // Temporarily increase music volume for dance
        const music = document.getElementById('backgroundMusic');
        if (this.musicPlaying && music) {
            const originalVolume = music.volume;
            this.fadeInMusic(music, 500); // Quick fade to highlight dance
            
            setTimeout(() => {
                music.volume = originalVolume;
            }, 3000);
        }
        
        diyas.forEach((diya, index) => {
            setTimeout(() => {
                diya.classList.add('dancing');
                
                setTimeout(() => {
                    diya.classList.remove('dancing');
                }, 2000);
            }, index * 200);
        });
        
        setTimeout(() => {
            document.getElementById('nextToWish').classList.remove('hidden');
        }, 3000);
        
        // Add heart particles
        this.createHeartParticles();
    }

    createHeartParticles() {
        const container = document.querySelector('.dancing-diyas-container');
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.position = 'absolute';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = '100%';
                heart.style.fontSize = '2rem';
                heart.style.animation = 'floatUp 3s ease-out forwards';
                heart.style.pointerEvents = 'none';
                container.appendChild(heart);
                
                setTimeout(() => heart.remove(), 3000);
            }, i * 100);
        }
    }

    submitWish() {
        const wishText = document.getElementById('wishText').value.trim();
        
        if (!wishText) {
            alert('Please write a wish first! 💕');
            return;
        }
        
        const floating = document.getElementById('floatingWishes');
        const wish = document.createElement('div');
        wish.className = 'floating-wish';
        wish.textContent = wishText;
        wish.style.left = Math.random() * 80 + 10 + '%';
        floating.appendChild(wish);
        
        // Clear the textarea
        document.getElementById('wishText').value = '';
        
        setTimeout(() => {
            wish.remove();
        }, 4000);
        
        // Show next button after first wish
        setTimeout(() => {
            document.getElementById('nextToConfession').classList.remove('hidden');
        }, 2000);
    }

    revealConfession() {
        const diya = document.getElementById('confessionDiya');
        const message = document.getElementById('confessionMessage');
        const buttons = document.getElementById('responseButtons');
        
        diya.classList.add('clicked');
        
        // Dramatic music volume increase for confession
        const music = document.getElementById('backgroundMusic');
        if (this.musicPlaying && music) {
            music.volume = Math.min(music.volume + 0.1, 0.4);
        }
        
        setTimeout(() => {
            message.classList.remove('hidden');
            
            setTimeout(() => {
                buttons.classList.remove('hidden');
            }, 4000);
        }, 1000);
        
        // Create light spread effect
        this.createLightSpread();
    }

    createLightSpread() {
        const container = document.getElementById('finalConfession');
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const light = document.createElement('div');
                light.className = 'particle';
                light.style.position = 'absolute';
                light.style.left = '50%';
                light.style.top = '50%';
                light.style.width = '6px';
                light.style.height = '6px';
                light.style.background = '#ffd700';
                light.style.borderRadius = '50%';
                light.style.animation = 'none';
                
                const angle = (i / 50) * Math.PI * 2;
                const distance = i * 10;
                light.style.transform = `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                light.style.opacity = 1 - (i / 50);
                
                container.appendChild(light);
                
                setTimeout(() => light.remove(), 2000);
            }, i * 50);
        }
    }

    handleResponse(response) {
        const buttons = document.getElementById('responseButtons');
        buttons.style.display = 'none';
        
        let celebrationMessage = '';
        
        switch(response) {
            case 'yes':
                celebrationMessage = '🎉 You made my heart burst with joy! 💖✨';
                this.createHeartFireworks();
                break;
            case 'talk':
                celebrationMessage = '😊 I can\'t wait to hear your thoughts! 💕';
                this.createGentleGlow();
                break;
            case 'aww':
                celebrationMessage = '🥰 You\'re absolutely adorable! 💖';
                this.createSparkleCascade();
                break;
        }
        
        // Show celebration message
        const messageEl = document.createElement('div');
        messageEl.className = 'text-2xl text-yellow-100 mb-6 animate-pulse';
        messageEl.textContent = celebrationMessage;
        document.getElementById('responseButtons').parentNode.insertBefore(messageEl, document.getElementById('responseButtons'));
        
        setTimeout(() => {
            document.getElementById('goToGifts').classList.remove('hidden');
        }, 3000);
    }

    createHeartFireworks() {
        const container = document.getElementById('finalConfession');
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.position = 'absolute';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = '100%';
                heart.style.fontSize = Math.random() * 2 + 1 + 'rem';
                heart.style.animation = 'floatUp 4s ease-out forwards';
                heart.style.pointerEvents = 'none';
                container.appendChild(heart);
                
                setTimeout(() => heart.remove(), 4000);
            }, i * 50);
        }
    }

    createGentleGlow() {
        const container = document.getElementById('finalConfession');
        container.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(26, 16, 43, 1) 70%)';
        
        setTimeout(() => {
            container.style.background = '';
        }, 3000);
    }

    createSparkleCascade() {
        const container = document.getElementById('finalConfession');
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = '0%';
                sparkle.style.fontSize = Math.random() * 1.5 + 0.5 + 'rem';
                sparkle.style.animation = 'floatUp 3s ease-out forwards reverse';
                sparkle.style.pointerEvents = 'none';
                container.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 3000);
            }, i * 100);
        }
    }

    openGift(giftType) {
        const messageEl = document.getElementById('giftMessage');
        messageEl.textContent = this.giftMessages[giftType];
        messageEl.style.animation = 'fadeInUp 0.5s ease-out';
        
        // Add gift opening animation
        const giftEl = document.querySelector(`[data-gift="${giftType}"]`);
        giftEl.style.animation = 'bounce 0.5s ease-out';
        
        setTimeout(() => {
            giftEl.style.animation = '';
        }, 500);
        
        // Create gift particles
        this.createGiftParticles(giftEl);
    }

    createGiftParticles(giftElement) {
        const rect = giftElement.getBoundingClientRect();
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.innerHTML = '⭐';
                particle.style.position = 'fixed';
                particle.style.left = rect.left + rect.width / 2 + 'px';
                particle.style.top = rect.top + rect.height / 2 + 'px';
                particle.style.fontSize = '1rem';
                particle.style.animation = 'sparkle 2s ease-out forwards';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '1000';
                document.body.appendChild(particle);
                
                // Random direction
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 100 + 50;
                particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                
                setTimeout(() => particle.remove(), 2000);
            }, i * 50);
        }
    }

    shareWebsite() {
        if (navigator.share) {
            navigator.share({
                title: 'Light of My Heart - Diwali Love Story',
                text: 'Experience this beautiful Diwali love confession with music and lights!',
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Website link copied to clipboard! Share the love! 💕');
            });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LightOfMyHeart();
});

// Add some utility functions for animations
function createRandomParticle(container, emoji, count = 10) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.innerHTML = emoji;
            particle.style.position = 'absolute';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.fontSize = Math.random() * 2 + 1 + 'rem';
            particle.style.animation = 'sparkle 3s ease-out forwards';
            particle.style.pointerEvents = 'none';
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 3000);
        }, i * 100);
    }
}

// Add CSS animation classes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-30px); }
        60% { transform: translateY(-15px); }
    }
`;
document.head.appendChild(style);