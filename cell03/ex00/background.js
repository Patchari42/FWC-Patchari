document.getElementById('btn').addEventListener('click', function() {
    // สุ่มค่าสี HEX เช่น #4A90E2
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    
    // เปลี่ยนสีพื้นหลังของ body
    document.body.style.backgroundColor = randomColor;
});