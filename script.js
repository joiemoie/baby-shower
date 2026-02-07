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

    function createCloud() {
        const cloud = document.createElement('img');
        cloud.src = 'clouds.png';
        cloud.alt = 'cloud';
        cloud.classList.add('cloud');

        // Randomize properties
        cloud.style.top = Math.random() * 100 + 'vh';
        cloud.style.width = (Math.random() * 20 + 40) + 'vw'; // 40vw to 60vw
        cloud.style.left = Math.random() * 200 - 100 + 'vw'; // Start from -100vw to 100vw (wider range)
        cloud.style.opacity = Math.random() * 0.4 + 0.3; // 0.3 to 0.7 for transparency (more visible)

        // Randomize animation duration and delay for slower movement
        const duration = Math.random() * 100 + 100; // 100s to 200s
        cloud.style.animationDuration = duration + 's';
        cloud.style.animationDelay = Math.random() * -duration + 's'; // Start at various points in animation cycle

        cloudsContainer.appendChild(cloud);

        // Remove cloud when it's off-screen and create a new one
        cloud.addEventListener('animationiteration', () => {
            cloud.remove();
            createCloud();
        });
    }

    // Initial cloud generation
    for (let i = 0; i < 15; i++) {
        createCloud();
    }

    function openModal() {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }

    function closeModal() {
        modalContent.style.animation = 'scaleDown 0.4s ease-out forwards';
        modal.style.animation = 'fadeOut 0.4s ease-out forwards';
        setTimeout(() => {
            modal.style.display = 'none';
            rsvpForm.classList.add('hidden');
            modalContent.style.animation = '';
            modal.style.animation = '';
            rsvpOptions.forEach(opt => opt.classList.remove('selected'));
        }, 400);
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
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) * 2 - 1;
        const y = (clientY / window.innerHeight) * 2 - 1;

        // Apply to bear
        const bear = document.querySelector('.bear');
        const bearSpeed = 5;
        const bearXOffset = x * bearSpeed;
        const bearYOffset = y * bearSpeed;
        bear.style.transform = `translateX(${bearXOffset}px) translateY(${bearYOffset}px)`;
    });
});
