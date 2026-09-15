const button = document.getElementById('change-btn');


button.addEventListener('click', function() {
    
    const r = Math.floor(Math.random() * 256); 
    const g = Math.floor(Math.random() * 256); 
    const b = Math.floor(Math.random() * 256); 

    const randomColor = `rgb(${r}, ${g}, ${b})`;

    document.body.style.backgroundColor = randomColor;
});