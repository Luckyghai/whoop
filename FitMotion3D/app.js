const app = {
    state: {
        user: {
            name: '',
            age: '',
            height: '',
            weight: '',
            goal: '',
            healthCondition: 'none',
            dietaryPreference: 'non-veg'
        },
        workout: {
            caloriesBurned: 0,
            activeTimer: null,
            timeRemaining: 0,
            isPlaying: false
        },
        consultations: []
    },

    workouts: [
        {
            id: 'squats',
            name: 'Barbell Squats',
            title: 'Leg Day',
            categories: ['Muscle Gain'],
            target: 'Quads, Glutes',
            sets: '3',
            reps: '12',
            time: 60,
            icon: 'fitness_center',
            modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
            videoSrc: null,
            animationName: 'Running'
        },
        {
            id: 'pushups',
            name: 'Push Ups',
            title: 'Chest Day',
            categories: ['Muscle Gain', 'Weight Loss', 'HIIT'],
            target: 'Chest, Triceps',
            sets: '4',
            reps: '15',
            time: 45,
            icon: 'sports_gymnastics',
            modelSrc: null,
            videoSrc: 'assets/videos/pushups.mp4',
            animationName: null
        },
        {
            id: 'dhanuasana',
            name: 'Dhanuasana',
            title: 'Yoga Session',
            categories: ['Yoga'],
            target: 'Spine, Chest, Core',
            sets: '3',
            reps: 'Hold 20s',
            time: 60,
            icon: 'self_improvement',
            modelSrc: null,
            videoSrc: 'assets/videos/dhanuasana.mov',
            animationName: null
        },
        {
            id: 'mayurasana',
            name: 'Mayurasana',
            title: 'Yoga Session',
            categories: ['Yoga'],
            target: 'Wrists, Core, Balance',
            sets: '3',
            reps: 'Hold 15s',
            time: 45,
            icon: 'self_improvement',
            modelSrc: null,
            videoSrc: 'assets/videos/mayurasana.mov',
            animationName: null
        }
    ],

    dietDatabase: {
        none: {
            strategy: "A standard balanced diet designed to optimize energy levels, support metabolic function, and improve body composition.",
            emphasize: [
                "Lean proteins (chicken, turkey, tofu, fish)",
                "Fresh fruits and vegetables",
                "Whole grains (brown rice, oats, quinoa)",
                "Healthy fats (avocados, olive oil)"
            ],
            avoid: [
                "Refined sugars & carbonated drinks",
                "Deep-fried & processed junk foods",
                "Excessive sodium & fast food",
                "Highly refined carbohydrates"
            ],
            breakfast: "Greek yogurt bowl with mixed berries, a drizzle of honey, and sliced almonds.",
            lunch: "Turkey and spinach wrap with whole wheat tortilla, cucumber, and hummus.",
            snack: "A handful of mixed nuts (almonds, walnuts) and a banana.",
            dinner: "Grilled salmon with a side of steamed broccoli and sweet potato.",
            hydration: "Drink at least 2.5 - 3 liters of water daily. Hydration keeps energy levels high and aids digestion.",
            generalTip: "Ensure a balance of macronutrients (protein, carbs, fats) in every meal to keep energy levels stable.",
            veg: {
                lunch: "Hummus and roasted vegetable wrap (bell peppers, zucchini, spinach) in a whole wheat tortilla.",
                dinner: "Grilled tofu steak with a side of steamed broccoli and sweet potato.",
                emphasize: [
                    "Plant-based proteins (tofu, tempeh, lentils, beans, edamame)",
                    "Fresh fruits and vegetables",
                    "Whole grains (brown rice, oats, quinoa)",
                    "Healthy fats (avocados, olive oil)"
                ]
            }
        },
        diabetes: {
            strategy: "Focused on low-glycemic index foods and fiber-rich complex carbohydrates to maintain stable blood glucose levels while optimizing insulin sensitivity.",
            emphasize: [
                "Non-starchy vegetables (spinach, broccoli, cauliflower)",
                "High-fiber complex carbs (lentils, chickpeas, quinoa)",
                "Lean proteins to stabilize sugars (chicken, fish, eggs)",
                "Healthy fats (walnuts, chia seeds, extra virgin olive oil)"
            ],
            avoid: [
                "Refined carbohydrates (white bread, white rice, pasta)",
                "Added sugars, sweets, and high-fructose syrups",
                "Fruit juices and sugary energy drinks",
                "Trans fats and heavily processed packaged snacks"
            ],
            breakfast: "Scrambled eggs with spinach, tomatoes, and half an avocado.",
            lunch: "Quinoa salad with grilled chicken breast, cucumbers, bell peppers, and olive oil dressing.",
            snack: "Celery sticks with all-natural peanut butter.",
            dinner: "Baked cod filet with roasted asparagus and a side of cauliflower mash.",
            hydration: "Drink at least 3 liters of water daily. Proper hydration helps the kidneys flush out excess glucose.",
            generalTip: "Space meals evenly throughout the day and avoid skipping meals to prevent blood sugar spikes and crashes.",
            veg: {
                breakfast: "Scrambled tofu with spinach, mushrooms, tomatoes, and half an avocado.",
                lunch: "Quinoa salad with roasted chickpeas, cucumbers, bell peppers, crumbled feta, and olive oil dressing.",
                dinner: "Baked tempeh cutlets with roasted asparagus and a side of cauliflower mash.",
                emphasize: [
                    "Non-starchy vegetables (spinach, broccoli, cauliflower)",
                    "High-fiber complex carbs (lentils, chickpeas, quinoa)",
                    "Plant-based proteins to stabilize sugars (tofu, tempeh, edamame)",
                    "Healthy fats (walnuts, chia seeds, extra virgin olive oil)"
                ]
            }
        },
        hypertension: {
            strategy: "Emphasizes the DASH (Dietary Approaches to Stop Hypertension) diet principles: high potassium, magnesium, and calcium, while restricting sodium to manage blood pressure.",
            emphasize: [
                "Leafy greens & celery (helps relax blood vessels)",
                "Potassium-rich foods (bananas, sweet potatoes, spinach)",
                "Whole grains and unsalted seeds/nuts",
                "Lean fish rich in Omega-3 fatty acids (salmon, mackerel)"
            ],
            avoid: [
                "Canned soups, processed meats & pickles (extremely high sodium)",
                "Table salt and salty seasoning mixes",
                "Processed cheeses and frozen pre-packaged meals",
                "Excessive caffeine and alcohol"
            ],
            breakfast: "Oatmeal topped with fresh sliced banana, blueberries, and ground flaxseeds.",
            lunch: "Lentil soup served with a fresh garden salad dressed in lemon juice and olive oil.",
            snack: "Unsalted pumpkin seeds and an orange.",
            dinner: "Grilled chicken breast with roasted Brussels sprouts and brown rice.",
            hydration: "Maintain steady fluid intake of 2.5 - 3 liters of water. Limit high-sodium sports drinks.",
            generalTip: "Use herbs, spices, garlic, and citrus juices to flavor foods instead of adding table salt.",
            veg: {
                dinner: "Stir-fried tofu with roasted Brussels sprouts and brown rice.",
                emphasize: [
                    "Leafy greens & celery (helps relax blood vessels)",
                    "Potassium-rich foods (bananas, sweet potatoes, spinach)",
                    "Whole grains and unsalted seeds/nuts",
                    "Omega-3 rich plant sources (chia seeds, walnuts, flaxseeds)"
                ]
            }
        },
        'gluten-free': {
            strategy: "Strict elimination of gluten (wheat, barley, rye) with a focus on naturally gluten-free whole foods to prevent gut inflammation and support nutrient absorption.",
            emphasize: [
                "Naturally gluten-free grains (quinoa, wild rice, buckwheat)",
                "Fresh lean meats, poultry, and wild-caught seafood",
                "All fresh fruits and vegetables",
                "Gut-soothing foods (bone broth, fermented foods, ginger)"
            ],
            avoid: [
                "Traditional wheat products (pasta, bread, cereals, flour)",
                "Processed foods with hidden gluten (soy sauce, beer, malt)",
                "Processed gluten-free breads (often high in sugar/binders)",
                "Fried foods with wheat-based batter"
            ],
            breakfast: "Chia seed pudding made with coconut milk, topped with raspberries and pumpkin seeds.",
            lunch: "Tuna salad salad cups using large romaine lettuce leaves, cucumbers, and olive oil.",
            snack: "Sliced apples with almond butter.",
            dinner: "Pan-seared chicken breast with roasted carrots and baked sweet potato.",
            hydration: "Drink 2.5 - 3 liters of water daily. Herbal teas like peppermint or ginger can help soothe digestion.",
            generalTip: "Always read labels carefully; gluten is frequently used as a thickener or stabilizer in sauces and dressings.",
            veg: {
                lunch: "Chickpea and avocado salad cups using large romaine lettuce leaves and cucumbers.",
                dinner: "Pan-seared tofu cubes with roasted carrots and baked sweet potato.",
                emphasize: [
                    "Naturally gluten-free grains (quinoa, wild rice, buckwheat)",
                    "Fresh plant proteins (tofu, beans, lentils, peas)",
                    "All fresh fruits and vegetables",
                    "Gut-soothing foods (bone broth, fermented foods, ginger)"
                ]
            }
        },
        'high-cholesterol': {
            strategy: "Focused on reducing saturated and trans fats, while emphasizing soluble fiber and plant sterols which actively bind to and lower LDL cholesterol.",
            emphasize: [
                "Foods high in soluble fiber (oats, barley, beans, lentils)",
                "Omega-3 rich fatty fish (salmon, tuna)",
                "Healthy fats containing sterols (avocados, almonds, olive oil)",
                "Soy products (edamame, tofu)"
            ],
            avoid: [
                "Saturated fats (butter, lard, high-fat red meats, cheese)",
                "Trans fats (partially hydrogenated oils, commercial baked goods)",
                "Processed meats (sausages, bacon)",
                "Palm and coconut oil"
            ],
            breakfast: "Oat bran porridge topped with walnuts and a handful of strawberries.",
            lunch: "Black bean and corn salad with grilled salmon, avocado, and lime-cilantro dressing.",
            snack: "A cup of edamame with a pinch of sea salt.",
            dinner: "Stir-fried tofu with broccoli, bell peppers, carrots, and sesame oil served over quinoa.",
            hydration: "Drink 2.5 - 3 liters of water daily. Green tea is rich in antioxidants that support arterial health.",
            generalTip: "Opt for grilling, baking, or steaming instead of frying to minimize dietary fat intake.",
            veg: {
                lunch: "Black bean and corn salad with grilled tofu, avocado, and lime-cilantro dressing.",
                dinner: "Stir-fried tempeh with broccoli, bell peppers, carrots, and sesame oil served over quinoa.",
                emphasize: [
                    "Foods high in soluble fiber (oats, barley, beans, lentils)",
                    "Omega-3 rich plant sources (flaxseeds, walnuts, chia seeds)",
                    "Healthy fats containing sterols (avocados, almonds, olive oil)",
                    "Soy products (edamame, tofu)"
                ]
            }
        }
    },

    doctors: [
        {
            id: 'dr-sarah',
            name: 'Dr. Sarah Jenkins',
            specialty: 'Sports Cardiologist',
            rating: '4.9',
            experience: '12 Years',
            bio: 'Expert in sports cardiology, cardiovascular endurance, and athletic performance diagnostics.',
            availability: 'Mon, Wed, Fri (09:00 AM - 05:00 PM)',
            avatar: 'doctor_1'
        },
        {
            id: 'dr-amit',
            name: 'Dr. Amit Patel',
            specialty: 'Sports Medicine Specialist',
            rating: '4.8',
            experience: '9 Years',
            bio: 'Specializes in injury recovery, muscle strains, joint mobility, and rehabilitation.',
            availability: 'Tue, Thu (10:00 AM - 04:00 PM)',
            avatar: 'doctor_2'
        },
        {
            id: 'dr-elena',
            name: 'Dr. Elena Rostova',
            specialty: 'Dietitian & Clinical Nutritionist',
            rating: '4.9',
            experience: '10 Years',
            bio: 'Specializes in metabolic health, ketogenic plans, diabetic diets, and performance nutrition.',
            availability: 'Mon, Tue, Thu (08:00 AM - 03:00 PM)',
            avatar: 'doctor_3'
        },
        {
            id: 'dr-marcus',
            name: 'Dr. Marcus Vance',
            specialty: 'Physical Therapist',
            rating: '4.7',
            experience: '8 Years',
            bio: 'Focuses on posture adjustment, core strengthening, spine alignment, and mobility therapy.',
            availability: 'Wed, Fri (11:00 AM - 06:00 PM)',
            avatar: 'doctor_4'
        }
    ],

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.checkAuth();
        this.renderWorkouts('All');
    },

    cacheDOM() {
        this.screens = {
            auth: document.getElementById('screen-auth'),
            setup: document.getElementById('screen-setup'),
            home: document.getElementById('screen-home'),
            training: document.getElementById('screen-training'),
            stats: document.getElementById('screen-stats'),
            profile: document.getElementById('screen-profile'),
            diet: document.getElementById('screen-diet'),
            consult: document.getElementById('screen-consult')
        };
        this.mainBottomNav = document.getElementById('main-bottom-nav');
        
        // Profile Settings
        this.profileName = document.getElementById('profile-name');
        this.profileHeight = document.getElementById('profile-height');
        this.profileWeight = document.getElementById('profile-weight');
        this.profileGoal = document.getElementById('profile-goal');
        this.profileHealth = document.getElementById('profile-health');
        this.profileDietary = document.getElementById('profile-dietary');
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
        this.setupHealth = document.getElementById('setup-health');
        this.setupDietary = document.getElementById('setup-dietary');
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

        // Consultation & Booking Modal
        this.bookingModal = document.getElementById('booking-modal');
        this.btnCloseBooking = document.getElementById('btn-close-booking');
        this.bookingForm = document.getElementById('booking-form');
        this.bookingDoctorId = document.getElementById('booking-doctor-id');
        this.bookingDoctorName = document.getElementById('booking-doctor-name');
        this.bookingDate = document.getElementById('booking-date');
        this.bookingMedium = document.getElementById('booking-medium');
        this.bookingNotes = document.getElementById('booking-notes');
        
        this.upcomingConsultationsList = document.getElementById('upcoming-consultations-list');
        this.specialistsDirectory = document.getElementById('specialists-directory');
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
                this.state.user.healthCondition = this.setupHealth.value;
                this.state.user.dietaryPreference = this.setupDietary.value;
                
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
                this.state.user.healthCondition = this.profileHealth.value;
                this.state.user.dietaryPreference = this.profileDietary.value;
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

        // Category Pills Filtering
        const categoryPills = document.querySelectorAll('.category-pill');
        categoryPills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                categoryPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                const category = pill.textContent.trim();
                this.renderWorkouts(category);
            });
        });

        // Booking Modal Bindings
        if (this.btnCloseBooking) {
            this.btnCloseBooking.addEventListener('click', () => this.closeBookingModal());
        }
        
        if (this.bookingModal) {
            this.bookingModal.addEventListener('click', (e) => {
                if (e.target === this.bookingModal) {
                    this.closeBookingModal();
                }
            });
        }

        if (this.bookingForm) {
            this.bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const doctorId = this.bookingDoctorId.value;
                const date = this.bookingDate.value;
                const slot = document.querySelector('input[name="booking-slot"]:checked').value;
                const medium = this.bookingMedium.value;
                const notes = this.bookingNotes.value.trim();
                
                const newBooking = {
                    id: 'appt_' + Date.now(),
                    doctorId,
                    date,
                    slot,
                    medium,
                    notes
                };
                
                this.state.consultations.push(newBooking);
                localStorage.setItem('fitmotion_consultations', JSON.stringify(this.state.consultations));
                
                this.closeBookingModal();
                this.updateConsultUI();
                
                alert('Your consultation has been successfully booked!');
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
        if (['home', 'diet', 'consult', 'stats', 'profile'].includes(screenName)) {
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
        if (tab === 'diet') {
            this.updateDietUI();
        }
        if (tab === 'consult') {
            this.updateConsultUI();
        }
        if (tab === 'stats') {
            this.initChart();
            this.updateStatsUI();
        }
        if (tab === 'profile') {
            this.updateProfileUI();
        }
    },

    openWorkout(workoutId) {
        let workout = this.workouts.find(w => w.id === workoutId);
        
        if (!workout) {
            // Fallback for custom or recommended workout
            workout = {
                id: 'custom',
                name: 'Custom Exercise',
                title: 'Full Body Blast',
                target: 'Full Body',
                sets: '3',
                reps: '15',
                time: 30,
                modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
                videoSrc: null,
                animationName: 'Idle'
            };
        }

        document.getElementById('training-title').textContent = workout.title;
        document.getElementById('current-exercise-name').textContent = workout.name;

        // Update target, sets, reps dynamically
        const targetEl = document.querySelector('.target-muscle');
        if (targetEl) targetEl.textContent = `Target: ${workout.target}`;
        
        const setEl = document.getElementById('current-set');
        if (setEl) setEl.textContent = `1/${workout.sets}`;
        
        const repsEl = document.getElementById('current-reps');
        if (repsEl) repsEl.textContent = workout.reps;
        
        // Reset timer
        this.state.workout.timeRemaining = workout.time;
        this.updateTimerDisplay();
        
        // Set Model or Video
        if (workout.videoSrc) {
            if(this.modelViewer) this.modelViewer.style.display = 'none';
            if(this.modelTips) this.modelTips.style.display = 'none';
            if(this.videoViewer) {
                this.videoViewer.src = workout.videoSrc;
                this.videoViewer.style.display = 'block';
                this.videoViewer.play();
            }
        } else {
            if(this.videoViewer) this.videoViewer.style.display = 'none';
            if(this.modelViewer) {
                this.modelViewer.src = workout.modelSrc;
                this.modelViewer.animationName = workout.animationName || 'Idle';
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

    renderWorkouts(category = 'All') {
        const workoutListContainer = document.querySelector('.workout-list');
        if (!workoutListContainer) return;
        
        workoutListContainer.innerHTML = '';
        
        const filteredWorkouts = this.workouts.filter(workout => 
            category === 'All' || workout.categories.includes(category)
        );
        
        filteredWorkouts.forEach(workout => {
            const workoutItem = document.createElement('div');
            workoutItem.className = 'workout-item glass-card';
            workoutItem.onclick = () => this.openWorkout(workout.id);
            
            workoutItem.innerHTML = `
                <div class="workout-icon">
                    <span class="material-icons-round">${workout.icon || 'fitness_center'}</span>
                </div>
                <div class="workout-details">
                    <h4>${workout.name}</h4>
                    <p>${workout.target} • ${workout.sets} Sets x ${workout.reps}</p>
                </div>
                <span class="material-icons-round chevron">chevron_right</span>
            `;
            
            workoutListContainer.appendChild(workoutItem);
        });
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
        if(this.profileHealth) this.profileHealth.value = this.state.user.healthCondition || 'none';
        if(this.profileDietary) this.profileDietary.value = this.state.user.dietaryPreference || 'non-veg';
    },

    updateDietUI() {
        const condition = this.state.user.healthCondition || 'none';
        const goal = this.state.user.goal || 'weight-loss';
        const dietary = this.state.user.dietaryPreference || 'non-veg';
        
        const details = this.dietDatabase[condition] || this.dietDatabase['none'];
        
        const conditionLabelMap = {
            'none': 'None / General Health',
            'diabetes': 'Diabetes Management',
            'hypertension': 'Hypertension / Heart Health',
            'gluten-free': 'Gluten-Free & Gut Health',
            'high-cholesterol': 'Cholesterol Control'
        };
        
        const goalLabelMap = {
            'weight-loss': 'Weight Loss',
            'muscle-gain': 'Muscle Gain',
            'endurance': 'Endurance',
            'flexibility': 'Flexibility'
        };

        const dietaryLabelMap = {
            'non-veg': 'Non-Vegetarian',
            'veg': 'Vegetarian'
        };

        document.getElementById('diet-active-condition').textContent = conditionLabelMap[condition];
        document.getElementById('diet-active-goal').textContent = `Goal: ${goalLabelMap[goal]} • ${dietaryLabelMap[dietary]}`;

        let strategy = details.strategy;
        if (goal === 'weight-loss') {
            strategy += " Portion control, calorie deficit, and fiber intake are prioritized to assist with body fat reduction.";
        } else if (goal === 'muscle-gain') {
            strategy += " Caloric surplus and high-quality protein building blocks are emphasized to support muscle hypertrophy and repair.";
        } else if (goal === 'endurance') {
            strategy += " Glycogen replenishment via clean complex carbohydrates is highlighted to sustain prolonged athletic performance.";
        } else if (goal === 'flexibility') {
            strategy += " Joint-lubricating healthy fats and micronutrient-dense anti-inflammatory foods are highlighted to support recovery and elasticity.";
        }
        document.getElementById('diet-strategy-text').textContent = strategy;

        let baseCalories = { breakfast: 350, lunch: 480, snack: 160, dinner: 520 };
        let baseProtein = { breakfast: 15, lunch: 30, snack: 5, dinner: 35 };

        let calMult = 1.0;
        let protMult = 1.0;

        if (goal === 'weight-loss') {
            calMult = 0.85;
            protMult = 1.1;
        } else if (goal === 'muscle-gain') {
            calMult = 1.25;
            protMult = 1.35;
        } else if (goal === 'endurance') {
            calMult = 1.15;
            protMult = 1.05;
        } else if (goal === 'flexibility') {
            calMult = 0.95;
            protMult = 1.0;
        }

        let breakfast = details.breakfast;
        let lunch = details.lunch;
        let snack = details.snack;
        let dinner = details.dinner;
        let emphasize = [...details.emphasize];

        if (dietary === 'veg' && details.veg) {
            if (details.veg.breakfast) breakfast = details.veg.breakfast;
            if (details.veg.lunch) lunch = details.veg.lunch;
            if (details.veg.snack) snack = details.veg.snack;
            if (details.veg.dinner) dinner = details.veg.dinner;
            if (details.veg.emphasize) emphasize = [...details.veg.emphasize];
        }

        const mealsMap = { breakfast, lunch, snack, dinner };

        const meals = ['breakfast', 'lunch', 'snack', 'dinner'];
        meals.forEach(meal => {
            const calVal = Math.round(baseCalories[meal] * calMult);
            const protVal = Math.round(baseProtein[meal] * protMult);
            
            document.getElementById(`diet-${meal}-desc`).textContent = mealsMap[meal];
            document.getElementById(`diet-${meal}-macros`).textContent = `${calVal} kcal • ${protVal}g Protein`;
        });

        const emphasizeList = document.getElementById('diet-emphasize-list');
        const avoidList = document.getElementById('diet-avoid-list');

        emphasizeList.innerHTML = '';
        avoidList.innerHTML = '';

        emphasize.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            emphasizeList.appendChild(li);
        });

        details.avoid.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            avoidList.appendChild(li);
        });

        document.getElementById('diet-hydration-tip').textContent = details.hydration;
        document.getElementById('diet-general-tip').textContent = details.generalTip;
    },

    updateConsultUI() {
        if (this.specialistsDirectory) {
            this.specialistsDirectory.innerHTML = '';
            
            this.doctors.forEach(doc => {
                const docCard = document.createElement('div');
                docCard.className = 'workout-item glass-card specialist-card';
                docCard.style.display = 'flex';
                docCard.style.flexDirection = 'column';
                docCard.style.alignItems = 'stretch';
                docCard.style.padding = '20px';
                docCard.style.gap = '12px';
                docCard.style.cursor = 'default';
                docCard.style.transform = 'none';
                
                docCard.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div class="profile-avatar" style="width: 56px; height: 56px; border-radius: 18px; flex-shrink: 0;">
                            <span class="material-icons-round" style="font-size: 2rem;">health_and_safety</span>
                        </div>
                        <div style="flex: 1;">
                            <h4 style="margin: 0; font-size: 1.1rem; color: var(--text-main);">${doc.name}</h4>
                            <p style="margin: 2px 0 0; font-size: 0.85rem; color: var(--primary); font-weight: 500;">${doc.specialty}</p>
                            <div style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
                                <span class="material-icons-round" style="font-size: 1rem; color: #FFCC00;">star</span>
                                <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-main);">${doc.rating}</span>
                                <span style="font-size: 0.85rem; color: var(--text-muted);">(${doc.experience})</span>
                            </div>
                        </div>
                    </div>
                    <p style="font-size: 0.85rem; line-height: 1.5; color: var(--text-muted); margin: 0;">${doc.bio}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; gap: 8px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 4px; color: var(--text-muted); font-size: 0.8rem;">
                            <span class="material-icons-round" style="font-size: 1rem;">event</span>
                            <span>${doc.availability}</span>
                        </div>
                        <button class="primary-btn book-btn" style="padding: 10px 16px; border-radius: 12px; font-size: 0.85rem; width: auto; font-weight: 600; box-shadow: none; margin: 0;" onclick="app.openBookingModal('${doc.id}')">Book Consultation</button>
                    </div>
                `;
                
                this.specialistsDirectory.appendChild(docCard);
            });
        }

        if (this.upcomingConsultationsList) {
            this.upcomingConsultationsList.innerHTML = '';
            
            if (this.state.consultations.length === 0) {
                this.upcomingConsultationsList.innerHTML = `
                    <div class="glass-card" style="text-align: center; padding: 32px 16px; color: var(--text-muted);">
                        <span class="material-icons-round" style="font-size: 3rem; margin-bottom: 8px; color: var(--text-muted); opacity: 0.5;">event_busy</span>
                        <p style="font-size: 0.95rem; margin: 0;">No consultations booked yet.</p>
                        <p style="font-size: 0.85rem; margin: 4px 0 0;">Select a specialist below to schedule a telehealth session.</p>
                    </div>
                `;
                return;
            }

            this.state.consultations.forEach(appt => {
                const doc = this.doctors.find(d => d.id === appt.doctorId);
                if (!doc) return;

                const apptCard = document.createElement('div');
                apptCard.className = 'glass-card appointment-card';
                apptCard.style.padding = '20px';
                apptCard.style.marginBottom = '16px';
                apptCard.style.border = '1px solid rgba(0, 122, 255, 0.2)';

                const mediumLabels = {
                    video: 'Video Consultation',
                    audio: 'Voice Consultation',
                    chat: 'Text Chat Session'
                };

                const mediumIcons = {
                    video: 'videocam',
                    audio: 'call',
                    chat: 'chat'
                };

                apptCard.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                        <span class="meal-nutrients" style="background: rgba(0, 122, 255, 0.1); color: var(--primary); padding: 4px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 600; display: flex; align-items: center; gap: 4px; align-self: flex-start;">
                            <span class="material-icons-round" style="font-size: 0.9rem;">${mediumIcons[appt.medium]}</span>
                            <span>${mediumLabels[appt.medium]}</span>
                        </span>
                        <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">Scheduled</span>
                    </div>
                    <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
                        <div class="profile-avatar" style="width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;">
                            <span class="material-icons-round" style="font-size: 1.8rem;">person</span>
                        </div>
                        <div>
                            <h4 style="margin: 0; font-size: 1rem; color: var(--text-main);">${doc.name}</h4>
                            <p style="margin: 2px 0 0; font-size: 0.8rem; color: var(--text-muted);">${doc.specialty}</p>
                        </div>
                    </div>
                    <div class="appt-details-box" style="border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
                        <div style="display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--text-main);">
                            <span class="material-icons-round" style="font-size: 1.1rem; color: var(--primary);">calendar_today</span>
                            <strong>Date:</strong> <span>${appt.date}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--text-main);">
                            <span class="material-icons-round" style="font-size: 1.1rem; color: var(--primary);">schedule</span>
                            <strong>Time:</strong> <span>${appt.slot}</span>
                        </div>
                        ${appt.notes ? `
                        <div style="display: flex; align-items: flex-start; gap: 6px; font-size: 0.8rem; color: var(--text-muted); border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 8px; margin-top: 4px;">
                            <span class="material-icons-round" style="font-size: 1rem;">description</span>
                            <span>"${appt.notes}"</span>
                        </div>` : ''}
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <button class="primary-btn join-btn" style="flex: 1; padding: 12px; border-radius: 12px; font-size: 0.85rem; font-weight: 600; box-shadow: none;" onclick="app.startConsultation('${appt.id}')">Join Session</button>
                        <button class="secondary-btn" style="flex: 1; padding: 12px; border-radius: 12px; font-size: 0.85rem; font-weight: 600; border-color: rgba(255, 59, 48, 0.3); color: var(--danger); background: transparent;" onclick="app.cancelConsultation('${appt.id}')">Cancel</button>
                    </div>
                `;

                this.upcomingConsultationsList.appendChild(apptCard);
            });
        }
    },

    openBookingModal(docId) {
        const doc = this.doctors.find(d => d.id === docId);
        if (!doc) return;
        
        if (this.bookingDoctorId) this.bookingDoctorId.value = doc.id;
        if (this.bookingDoctorName) this.bookingDoctorName.value = doc.name;
        
        if (this.bookingDate) {
            const today = new Date().toISOString().split('T')[0];
            this.bookingDate.value = today;
            this.bookingDate.min = today;
        }
        
        if (this.bookingNotes) this.bookingNotes.value = '';
        
        if (this.bookingModal) {
            this.bookingModal.style.display = 'flex';
        }
    },

    closeBookingModal() {
        if (this.bookingModal) {
            this.bookingModal.style.display = 'none';
        }
    },

    cancelConsultation(apptId) {
        if (confirm('Are you sure you want to cancel this consultation?')) {
            this.state.consultations = this.state.consultations.filter(c => c.id !== apptId);
            localStorage.setItem('fitmotion_consultations', JSON.stringify(this.state.consultations));
            this.updateConsultUI();
        }
    },

    startConsultation(apptId) {
        const appt = this.state.consultations.find(c => c.id === apptId);
        const doc = this.doctors.find(d => d.id === appt.doctorId);
        alert(`Connecting you to ${doc.name} for your ${appt.medium === 'video' ? 'Video Call' : appt.medium === 'audio' ? 'Voice Call' : 'Chat Session'}...\n\n(This is a mock telehealth connection demo.)`);
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
