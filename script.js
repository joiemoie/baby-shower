document.addEventListener('DOMContentLoaded', () => {
    const rsvpBtn = document.getElementById('rsvp-btn');
    const modal = document.getElementById('rsvp-modal');
    const closeBtn = document.querySelector('.close-btn');
    const goingOption = document.getElementById('going');
    const maybeOption = document.getElementById('maybe');
    const notGoingOption = document.getElementById('not-going');
    const rsvpForm = document.getElementById('rsvp-form');

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
