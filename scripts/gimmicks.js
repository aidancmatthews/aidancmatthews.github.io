let ageDisplay = document.getElementById("ageDisplay");

setInterval(() => {
    const time = (new Date() - new Date(1026398100000)) / (1000 * 60 * 60 * 24 * 365.25);
    ageDisplay.innerText = time.toString().substring(0, 12);
}, 50)