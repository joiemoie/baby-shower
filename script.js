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
    }

    rsvpBtn.addEventListener('click', openModal);

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    rsvpOptions.forEach(option => {
        option.addEventListener('click', () => {
            rsvpOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    goingOption.addEventListener('click', () => {
        rsvpForm.classList.remove('hidden');
    });

    maybeOption.addEventListener('click', () => {
        setTimeout(() => {
            alert('We hope to see you there!');
            closeModal();
        }, 300);
    });

    notGoingOption.addEventListener('click', () => {
        setTimeout(() => {
            alert('Sorry you can\'t make it!');
            closeModal();
        }, 300);
    });

    rsvpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        alert(`Thanks for RSVPing, ${name}! We've received your details.`);
        closeModal();
        rsvpForm.querySelector('form').reset();
    });

    // Parallax effect on mouse move
    const invitation = document.querySelector('.invitation');
    
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
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

        // Sun Eyes Tracking
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
    });
});
