document.addEventListener('DOMContentLoaded', () => {
    const rsvpBtn = document.getElementById('rsvp-btn');
    const modal = document.getElementById('rsvp-modal');
    const modalContent = document.querySelector('.modal-content');
    const closeBtn = document.querySelector('.close-btn');
    const rsvpOptions = document.querySelectorAll('.option');
    const goingOption = document.getElementById('going');
    const maybeOption = document.getElementById('maybe');
    const notGoingOption = document.getElementById('not-going');
    const rsvpForm = document.getElementById('rsvp-form');
    const cloudsContainer = document.querySelector('.clouds');
    const extraFields = document.getElementById('extra-fields');
    const formTitle = document.getElementById('form-title');
    let currentSelection = '';

    function createCloud(index, totalClouds) {
        const cloud = document.createElement('img');
        cloud.src = 'clouds.png';
        cloud.alt = 'cloud';
        cloud.classList.add('cloud');

        // Distribute vertically
        const sectionHeight = 100 / totalClouds;
        const randomOffset = Math.random() * sectionHeight;
        cloud.style.top = (index * sectionHeight + randomOffset) + 'vh';

        cloud.style.width = (Math.random() * 20 + 30) + 'vw'; // slightly smaller for better fit
        
        // Start off-screen left
        cloud.style.left = '-50vw'; 
        
        // Randomize opacity
        cloud.style.opacity = Math.random() * 0.4 + 0.3; 

        // Slower movement
        const duration = Math.random() * 50 + 80; // 80s to 130s
        cloud.style.animationDuration = duration + 's';
        
        // Negative delay to scatter across screen
        cloud.style.animationDelay = '-' + (Math.random() * duration) + 's';

        cloudsContainer.appendChild(cloud);
    }

    // Initial cloud generation
    const totalClouds = 15;
    for (let i = 0; i < totalClouds; i++) {
        createCloud(i, totalClouds);
    }

    function openModal() {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
        rsvpForm.classList.add('hidden');
        rsvpOptions.forEach(opt => opt.classList.remove('selected'));
        rsvpForm.querySelector('form').reset();
    }

    rsvpBtn.addEventListener('click', openModal);

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    function showForm(selection) {
        currentSelection = selection;
        rsvpForm.classList.remove('hidden');
        
        const attendeesInput = document.getElementById('attendees');

        if (selection === 'going') {
            formTitle.textContent = "Wonderful! Can't wait to see you.";
            extraFields.classList.remove('hidden');
            attendeesInput.required = true;
        } else if (selection === 'maybe') {
            formTitle.textContent = "Fingers crossed you can join us!";
            extraFields.classList.add('hidden');
            attendeesInput.required = false;
        } else {
            formTitle.textContent = "You will be missed!";
            extraFields.classList.add('hidden');
            attendeesInput.required = false;
        }
    }

    function showEmojiPopup(emoji, element) {
        const popup = document.createElement('div');
        popup.textContent = emoji;
        popup.classList.add('emoji-popup');
        
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        popup.style.left = `${centerX}px`;
        popup.style.top = `${centerY}px`;
        
        document.body.appendChild(popup);
        
        popup.addEventListener('animationend', () => {
            popup.remove();
        });
    }

    function triggerConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const confettiCount = 100;
        const animations = ['tumble-1', 'tumble-2', 'tumble-3'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Varied length for "ribbon" look
            const height = Math.random() * 10 + 10; // 10px to 20px
            confetti.style.height = height + 'px';
            
            // Randomly select one of the 3 tumble animations
            confetti.style.animationName = animations[Math.floor(Math.random() * animations.length)];
            confetti.style.animationDuration = Math.random() * 2 + 2.5 + 's'; // 2.5s to 4.5s
            confetti.style.top = '-50px';
            
            document.body.appendChild(confetti);
            
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    rsvpOptions.forEach(option => {
        option.addEventListener('click', () => {
            rsvpOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    goingOption.addEventListener('click', () => {
        showEmojiPopup('🎉', goingOption);
        triggerConfetti();
        showForm('going');
    });

    maybeOption.addEventListener('click', () => {
        showEmojiPopup('🤔', maybeOption);
        showForm('maybe');
    });

    notGoingOption.addEventListener('click', () => {
        showEmojiPopup('😢', notGoingOption);
        showForm('not-going');
    });

    const successMessageDiv = document.getElementById('success-message');
    const successText = document.getElementById('success-text');

    rsvpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // 1. Prepare Data
        const form = event.target;
        const formData = new FormData(form);
        const name = document.getElementById('name').value;
        const messageText = document.getElementById('message').value;
        
        // Update status in both DOM and FormData
        const statusInput = document.getElementById('rsvp-status');
        statusInput.value = currentSelection;
        formData.set('rsvp-status', currentSelection);
        
        // 2. Submit to Netlify (AJAX)
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            // 3. Handle Success
            let displayMessage = '';
            
            if (currentSelection === 'going') {
                displayMessage = `Thanks for RSVPing, ${name}! We've saved your spot.`;
            } else if (currentSelection === 'maybe') {
                displayMessage = `No worries, ${name}! We'll check in later.`;
            } else {
                displayMessage = `We'll miss you, ${name}! Thanks for letting us know.`;
            }
            
            if (messageText.trim()) {
                displayMessage += " (And thanks for the sweet note! 💌)";
            }
            
            // Hide form, show success
            rsvpForm.classList.add('hidden');
            successMessageDiv.classList.remove('hidden');
            successText.textContent = displayMessage;
            
            // 4. Auto-Close
            setTimeout(() => {
                closeModal();
                // Reset state after close animation (approx)
                setTimeout(() => {
                    successMessageDiv.classList.add('hidden');
                    form.reset();
                }, 300);
            }, 3000); // 3 seconds delay
        })
        .catch((error) => {
            alert('Oops! Something went wrong. Please try again.');
            console.error('Submission error:', error);
        });
    });

    const calendarBtn = document.getElementById('calendar-btn');
    const copyBtn = document.getElementById('copy-address');

    copyBtn.addEventListener('click', () => {
        const address = "4200 Cheeney St., Santa Clara, CA, 95054";
        const copyIcon = copyBtn.querySelector('.copy-icon');
        const checkIcon = copyBtn.querySelector('.check-icon');

        function showSuccess() {
            copyIcon.classList.add('hidden');
            checkIcon.classList.remove('hidden');
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyIcon.classList.remove('hidden');
                checkIcon.classList.add('hidden');
                copyBtn.classList.remove('copied');
            }, 2000);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(address).then(showSuccess).catch(err => {
                console.error('Failed to copy via Clipboard API: ', err);
                fallbackCopy(address);
            });
        } else {
            fallbackCopy(address);
        }

        function fallbackCopy(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            
            // Ensure textarea is not visible but part of the DOM
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
            document.body.appendChild(textArea);
            
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showSuccess();
                } else {
                    console.error('Fallback copy failed.');
                    alert('Could not copy address automatically. Please copy it manually.');
                }
            } catch (err) {
                console.error('Fallback copy error: ', err);
                alert('Could not copy address automatically. Please copy it manually.');
            }
            
            document.body.removeChild(textArea);
        }
    });

    calendarBtn.addEventListener('click', () => {
        const event = {
            title: 'Baby Shower for Baby Liba',
            start: '20260221T130000',
            end: '20260221T160000',
            location: '4200 Cheeney St, Santa Clara, CA, 95054',
            description: 'Join us to celebrate the upcoming arrival of Baby Liba!'
        };

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Baby Shower Invitation//EN
BEGIN:VEVENT
UID:${Date.now()}@babyshower.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
LOCATION:${event.location}
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'Baby_Liba_Shower.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Parallax effect on mouse move
    const invitation = document.querySelector('.invitation');
    
    function handleMove(clientX, clientY) {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        
        // Sun Eyes Tracking (Always active)
        const pupils = document.querySelectorAll('.pupil');
        pupils.forEach((pupil) => {
            const eye = pupil.parentElement;
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;

            const angle = Math.atan2(clientY - eyeCenterY, clientX - eyeCenterX);
            const maxDistance = eyeRect.width / 4;
            // Calculate distance but clamp it to keep pupil inside eye
            const rawDistance = Math.hypot(clientX - eyeCenterX, clientY - eyeCenterY);
            const distance = Math.min(maxDistance, rawDistance);
            
            const pupilX = Math.cos(angle) * distance;
            const pupilY = Math.sin(angle) * distance;
            
            pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
        });

        if (isMobile) return;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calculate rotation based on cursor position relative to center
        // Limit rotation to ~5 degrees
        const rotateY = ((clientX - centerX) / centerX) * 5; 
        const rotateX = -((clientY - centerY) / centerY) * 5; // Invert Y for natural feel

        // Update CSS variables for reflection (relative to card)
        const rect = invitation.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        invitation.style.setProperty('--x', `${x}px`);
        invitation.style.setProperty('--y', `${y}px`);

        // Apply 3D rotation
        if (modal.style.display === 'flex') {
            invitation.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        } else {
            invitation.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        // Apply to bear (existing parallax)
        const xNorm = (clientX / window.innerWidth) * 2 - 1;
        const yNorm = (clientY / window.innerHeight) * 2 - 1;
        const bear = document.querySelector('.bear');
        const bearSpeed = 15; // Increased speed for visibility
        const bearXOffset = xNorm * bearSpeed;
        const bearYOffset = yNorm * bearSpeed;
        bear.style.transform = `translateX(${bearXOffset}px) translateY(${bearYOffset}px)`;

        // Apply to clouds (background parallax)
        const clouds = document.querySelector('.clouds');
        const cloudsSpeed = 10;
        const cloudsXOffset = -xNorm * cloudsSpeed;
        const cloudsYOffset = -yNorm * cloudsSpeed;
        clouds.style.transform = `translateX(${cloudsXOffset}px) translateY(${cloudsYOffset}px)`;
    }

    document.addEventListener('mousemove', (e) => {
        handleMove(e.clientX, e.clientY);
    });

    document.addEventListener('touchmove', (e) => {
        // Prevent scrolling while interacting if necessary, but might block page scroll
        // e.preventDefault(); 
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
    }, { passive: true });

    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
    }, { passive: true });
});
