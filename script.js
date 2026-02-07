document.addEventListener('DOMContentLoaded', () => {
    const rsvpBtn = document.getElementById('rsvp-btn');
    const modal = document.getElementById('rsvp-modal');
    const closeBtn = document.querySelector('.close-btn');
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


    rsvpBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        rsvpForm.classList.add('hidden');
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            rsvpForm.classList.add('hidden');
        }
    });

    goingOption.addEventListener('click', () => {
        rsvpForm.classList.remove('hidden');
    });

    maybeOption.addEventListener('click', () => {
        alert('We hope to see you there!');
        modal.style.display = 'none';
    });

    notGoingOption.addEventListener('click', () => {
        alert('Sorry you can\'t make it!');
        modal.style.display = 'none';
    });

    rsvpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        alert(`Thanks for RSVPing, ${name}! We've received your details.`);
        modal.style.display = 'none';
        rsvpForm.classList.add('hidden');
        rsvpForm.querySelector('form').reset();
    });
});
