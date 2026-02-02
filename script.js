document.addEventListener('DOMContentLoaded', () => {
    // Generate Leaves
    const backgroundElements = document.getElementById('background-elements');
    const leafCount = 30;
    const colors = ['#9CAF88', '#7A8B69', '#C4D7B2']; // Different sage shades

    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('i');
        leaf.classList.add('fa-solid', 'fa-leaf', 'leaf');
        
        const startX = Math.random() * 100;
        const size = Math.random() * 20 + 15; 
        const fallDuration = Math.random() * 10 + 10; 
        const swayDuration = Math.random() * 3 + 2; 
        const delay = Math.random() * -20; 

        const color = colors[Math.floor(Math.random() * colors.length)];

        leaf.style.left = `${startX}%`;
        leaf.style.fontSize = `${size}px`;
        leaf.style.color = color;
        leaf.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
        leaf.style.animationDelay = `${delay}s, 0s`;
        leaf.style.opacity = Math.random() * 0.4 + 0.2;

        backgroundElements.appendChild(leaf);
    }

    // RSVP Modal Logic
    const rsvpBtn = document.getElementById('rsvp-btn');
    const modal = document.getElementById('rsvp-modal');
    const closeBtn = document.querySelector('.close-btn');
    const rsvpForm = document.getElementById('rsvp-form');

    rsvpBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('visible');
        }, 10);
    });

    const closeModal = () => {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = rsvpForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Sent!';
        btn.style.background = '#9CAF88';
        
        setTimeout(() => {
            closeModal();
            btn.innerText = originalText;
            btn.style.background = '';
            rsvpForm.reset();
            alert("Thank you for RSVPing! We're excited for the safari adventure.");
        }, 1000);
    });
});