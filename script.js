function updateTime() {
    const currentTimeElement = document.querySelector('[data-testid="test-user-time"]');
    currentTimeElement.textContent = Date.now()
}

updateTime();
setInterval(updateTime, 1000);