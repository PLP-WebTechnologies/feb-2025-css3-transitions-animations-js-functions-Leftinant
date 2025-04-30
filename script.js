document.addEventListener('DOMContentLoaded', () => {
    const animatedButton = document.getElementById('animatedButton');
    const animatedImage = document.getElementById('animatedImage');
    const animationSpeedInput = document.getElementById('animationSpeed');
    const speedValueDisplay = document.getElementById('speedValue');
    const resetPreferencesButton = document.getElementById('resetPreferences');

    const PREFERENCE_KEY = 'animationPreferences';

    // Function to store user preferences in localStorage
    function storePreferences(speed) {
        const preferences = { animationSpeed: speed };
        localStorage.setItem(PREFERENCE_KEY, JSON.stringify(preferences));
    }

    // Function to retrieve user preferences from localStorage
    function getPreferences() {
        const storedPreferences = localStorage.getItem(PREFERENCE_KEY);
        return storedPreferences ? JSON.parse(storedPreferences) : { animationSpeed: 1 };
    }

    // Apply stored preferences
    const initialPreferences = getPreferences();
    animationSpeedInput.value = initialPreferences.animationSpeed;
    speedValueDisplay.textContent = `${parseFloat(initialPreferences.animationSpeed).toFixed(1)}x`;
    document.documentElement.style.setProperty('--animation-speed', initialPreferences.animationSpeed);

    // Update speed display and store preference on input change
    animationSpeedInput.addEventListener('input', (event) => {
        const currentSpeed = event.target.value;
        speedValueDisplay.textContent = `${parseFloat(currentSpeed).toFixed(1)}x`;
        document.documentElement.style.setProperty('--animation-speed', currentSpeed);
        storePreferences(currentSpeed);
    });

    // CSS Animation on Button Click
    animatedButton.addEventListener('click', () => {
        animatedButton.classList.add('pulse');
        setTimeout(() => {
            animatedButton.classList.remove('pulse');
        }, 1000 * parseFloat(animationSpeedInput.value)); // Adjust duration with speed
    });

    // CSS Transition on Image Hover (using JavaScript to toggle a class)
    animatedImage.addEventListener('mouseover', () => {
        animatedImage.classList.add('fade-out');
    });

    animatedImage.addEventListener('mouseout', () => {
        animatedImage.classList.remove('fade-out');
    });

    // Reset Preferences
    resetPreferencesButton.addEventListener('click', () => {
        localStorage.removeItem(PREFERENCE_KEY);
        animationSpeedInput.value = 1;
        speedValueDisplay.textContent = '1.0x';
        document.documentElement.style.setProperty('--animation-speed', 1);
    });
});