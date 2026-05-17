const app = {
    state: {
        user: {
            name: '',
            age: '',
            height: '',
            weight: '',
            goal: ''
        },
        workout: {
            caloriesBurned: 0,
            activeTimer: null,
            timeRemaining: 0,
            isPlaying: false
        }
    },

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.checkAuth();
    },

    cacheDOM() {
        this.screens = {
            auth: document.getElementById('screen-auth'),
            setup: document.getElementById('screen-setup'),
            home: document.getElementById('screen-home'),
            training: document.getElementById('screen-training'),
            stats: document.getElementById('screen-stats'),
            profile: document.getElementById('screen-profile')
        };
        this.mainBottomNav = document.getElementById('main-bottom-nav');
        
        // Profile Settings
        this.profileName = document.getElementById('profile-name');
        this.profileHeight = document.getElementById('profile-height');
        this.profileWeight = document.getElementById('profile-weight');
        this.profileGoal = document.getElementById('profile-goal');
        this.btnSaveProfile = document.getElementById('btn-save-profile');
        this.themeToggle = document.getElementById('theme-toggle');

        // Auth
        this.authName = document.getElementById('auth-name');
        this.btnContinueSetup = document.getElementById('btn-continue-setup');

        // Setup
        this.btnBackAuth = document.getElementById('btn-back-auth');
        this.setupAge = document.getElementById('setup-age');
        this.setupHeight = document.getElementById('setup-height');
        this.setupWeight = document.getElementById('setup-weight');
        this.setupGoal = document.getElementById('setup-goal');
        this.btnFinishSetup = document.getElementById('btn-finish-setup');

        // Home
        this.homeUserName = document.getElementById('home-user-name');
        this.caloriesBurned = document.getElementById('calories-burned');
        this.btnStartRecommended = document.getElementById('btn-start-recommended');

        // Training
        this.btnBackHome = document.getElementById('btn-back-home');
        this.timerDisplay = document.getElementById('workout-timer');
        this.btnPlayPause = document.getElementById('btn-play-pause');
        this.playPauseIcon = document.getElementById('play-pause-icon');
        this.modelViewer = document.getElementById('exercise-model');
        this.videoViewer = document.getElementById('exercise-video');
        this.modelTips = document.getElementById('model-tips');
    },

    bindEvents() {
        this.btnContinueSetup.addEventListener('click', () => {
            if (this.authName.value.trim()) {
                this.state.user.name = this.authName.value.trim();
                this.switchScreen('setup');
            } else {
                alert('Please enter your name');
            }
        });

        this.btnBackAuth.addEventListener('click', () => this.switchScreen('auth'));

        this.btnFinishSetup.addEventListener('click', () => {
            if (this.setupAge.value && this.setupHeight.value && this.setupWeight.value) {
                this.state.user.age = this.setupAge.value;
                this.state.user.height = this.setupHeight.value;
                this.state.user.weight = this.setupWeight.value;
                this.state.user.goal = this.setupGoal.value;
                
                // Save to local storage
                localStorage.setItem('fitmotion_user', JSON.stringify(this.state.user));
                
                this.updateHomeUI();
                this.switchScreen('home');
            } else {
                alert('Please fill out all fields to personalize your experience.');
            }
        });

        this.btnStartRecommended.addEventListener('click', () => this.openWorkout('full-body'));
        this.btnBackHome.addEventListener('click', () => {
            this.stopTimer();
            this.switchScreen('home');
        });

        this.btnPlayPause.addEventListener('click', () => this.toggleWorkoutPlay());

        if(this.btnSaveProfile) {
            this.btnSaveProfile.addEventListener('click', () => {
                this.state.user.name = this.profileName.value;
                this.state.user.height = this.profileHeight.value;
                this.state.user.weight = this.profileWeight.value;
                this.state.user.goal = this.profileGoal.value;
                localStorage.setItem('fitmotion_user', JSON.stringify(this.state.user));
                this.updateHomeUI();
                alert('Profile saved!');
            });
        }

        if(this.themeToggle) {
            this.themeToggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    document.body.setAttribute('data-theme', 'dark');
                    localStorage.setItem('fitmotion_theme', 'dark');
                } else {
                    document.body.removeAttribute('data-theme');
                    localStorage.setItem('fitmotion_theme', 'light');
                }
            });
        }
    },

    checkAuth() {
        const savedTheme = localStorage.getItem('fitmotion_theme');
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            if(this.themeToggle) this.themeToggle.checked = true;
        }

        const savedUser = localStorage.getItem('fitmotion_user');
        if (savedUser) {
            this.state.user = JSON.parse(savedUser);
            this.updateHomeUI();
            this.switchScreen('home');
        } else {
            this.switchScreen('auth');
        }
    },

    switchScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            if(screen) screen.classList.remove('active');
        });
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
        }
        
        // Show/hide bottom nav based on screen
        if (['home', 'stats', 'profile'].includes(screenName)) {
            if(this.mainBottomNav) this.mainBottomNav.style.display = 'flex';
        } else {
            if(this.mainBottomNav) this.mainBottomNav.style.display = 'none';
        }
    },

    updateHomeUI() {
        this.homeUserName.textContent = this.state.user.name;
        this.caloriesBurned.textContent = this.state.workout.caloriesBurned;
        
        // Update progress ring (demo visualization)
        const ring = document.querySelector('.ring-progress');
        const circumference = 213; // 2 * pi * r (34)
        const progress = Math.min(this.state.workout.caloriesBurned / 500, 1);
        ring.style.strokeDashoffset = circumference - (progress * circumference);
    },

    navTo(tab) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        const activeItem = document.querySelector(`.nav-item[data-tab="${tab}"]`);
        if (activeItem) activeItem.classList.add('active');
        
        this.switchScreen(tab);
        if (tab === 'stats') {
            this.initChart();
            this.updateStatsUI();
        }
        if (tab === 'profile') {
            this.updateProfileUI();
        }
    },

    openWorkout(workoutId) {
        let title, exerciseName, time, animationName, modelSrc, videoSrc;
        
        if (workoutId === 'squats') {
            title = 'Leg Day';
            exerciseName = 'Barbell Squats';
            time = 60; // 60 seconds
            animationName = 'Running'; // Proxy animation for squats model
            modelSrc = 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb';
            videoSrc = null;
        } else if (workoutId === 'pushups') {
            title = 'Chest Day';
            exerciseName = 'Push Ups';
            time = 45;
            modelSrc = null;
            videoSrc = 'assets/videos/pushups.mp4';
        } else {
            title = 'Full Body Blast';
            exerciseName = 'Custom Exercise';
            time = 30;
            animationName = 'Idle';
            modelSrc = 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb';
            videoSrc = null;
        }

        document.getElementById('training-title').textContent = title;
        document.getElementById('current-exercise-name').textContent = exerciseName;
        
        // Reset timer
        this.state.workout.timeRemaining = time;
        this.updateTimerDisplay();
        
        // Set Model or Video
        if (videoSrc) {
            if(this.modelViewer) this.modelViewer.style.display = 'none';
            if(this.modelTips) this.modelTips.style.display = 'none';
            if(this.videoViewer) {
                this.videoViewer.src = videoSrc;
                this.videoViewer.style.display = 'block';
                this.videoViewer.play();
            }
        } else {
            if(this.videoViewer) this.videoViewer.style.display = 'none';
            if(this.modelViewer) {
                this.modelViewer.src = modelSrc;
                this.modelViewer.animationName = animationName;
                this.modelViewer.style.display = 'block';
                this.modelViewer.play();
            }
            if(this.modelTips) this.modelTips.style.display = 'flex';
        }

        this.state.workout.isPlaying = true;
        this.playPauseIcon.textContent = 'pause';
        this.startTimer();
        
        this.switchScreen('training');
    },

    toggleWorkoutPlay() {
        this.state.workout.isPlaying = !this.state.workout.isPlaying;
        
        if (this.state.workout.isPlaying) {
            this.playPauseIcon.textContent = 'pause';
            if(this.modelViewer && this.modelViewer.style.display !== 'none') this.modelViewer.play();
            if(this.videoViewer && this.videoViewer.style.display !== 'none') this.videoViewer.play();
            this.startTimer();
        } else {
            this.playPauseIcon.textContent = 'play_arrow';
            if(this.modelViewer && this.modelViewer.style.display !== 'none') this.modelViewer.pause();
            if(this.videoViewer && this.videoViewer.style.display !== 'none') this.videoViewer.pause();
            this.stopTimer();
        }
    },

    startTimer() {
        this.stopTimer(); // Ensure no duplicates
        this.state.workout.activeTimer = setInterval(() => {
            if (this.state.workout.timeRemaining > 0) {
                this.state.workout.timeRemaining--;
                this.updateTimerDisplay();
                
                // Add calories over time (mock logic)
                if (this.state.workout.timeRemaining % 5 === 0) {
                    this.state.workout.caloriesBurned += 2;
                    this.updateHomeUI(); // Keeps dashboard in sync
                }
            } else {
                this.stopTimer();
                this.workoutComplete();
            }
        }, 1000);
    },

    stopTimer() {
        if (this.state.workout.activeTimer) {
            clearInterval(this.state.workout.activeTimer);
        }
    },

    updateTimerDisplay() {
        const mins = Math.floor(this.state.workout.timeRemaining / 60);
        const secs = this.state.workout.timeRemaining % 60;
        this.timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    workoutComplete() {
        this.playPauseIcon.textContent = 'play_arrow';
        this.state.workout.isPlaying = false;
        if(this.modelViewer) this.modelViewer.pause();
        if(this.videoViewer) this.videoViewer.pause();
        alert('Set Complete! Great job. Taking a 30 second rest.');
        // In full app, transition to rest timer
    },

    updateStatsUI() {
        document.getElementById('stats-total-calories').textContent = this.state.workout.caloriesBurned + ' kcal';
        document.getElementById('stats-total-time').textContent = '45 min'; // mock
        document.getElementById('stats-total-workouts').textContent = '3'; // mock
    },

    updateProfileUI() {
        if(this.profileName) this.profileName.value = this.state.user.name || '';
        if(this.profileHeight) this.profileHeight.value = this.state.user.height || '';
        if(this.profileWeight) this.profileWeight.value = this.state.user.weight || '';
        if(this.profileGoal) this.profileGoal.value = this.state.user.goal || 'weight-loss';
    },

    initChart() {
        if (this.chartInitialized) return;
        
        const ctx = document.getElementById('activityChart');
        if (!ctx) return;
        
        this.chartInitialized = true;
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Calories Burned',
                    data: [300, 450, 0, 500, 600, 200, this.state.workout.caloriesBurned || 150],
                    backgroundColor: '#007AFF',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }
};

// Expose to window for inline onclick handlers
window.app = app;

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
