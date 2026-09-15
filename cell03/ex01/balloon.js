const balloon = document.getElementById('balloon');

// ลำดับสี (คลิก: Red -> Green -> Blue)
const colors = ['red', 'green', 'blue'];
let colorIndex = 0;
let size = 200;

function updateBalloon() {
    balloon.style.width = size + 'px';
    balloon.style.height = size + 'px';
    balloon.style.backgroundColor = colors[colorIndex];
}

// เมื่อคลิกที่ลูกโป่ง
balloon.addEventListener('click', function() {
    size += 10;
    
    // ถ้าระเบิด (เกิน 420px) ให้กลับไปขนาดเริ่มต้น 200px
    if (size > 420) {
        size = 200;
        colorIndex = 0;
    } else {
        // เปลี่ยนสีไปข้างหน้า: Red -> Green -> Blue -> Red
        colorIndex = (colorIndex + 1) % colors.length;
    }
    
    updateBalloon();
});

// เมื่อเมาส์ออกจากลูกโป่ง (mouseleave)
balloon.addEventListener('mouseleave', function() {
    // หดลง 5px แต่ต้องไม่ต่ำกว่า 200px
    if (size > 200) {
        size -= 5;
        if (size < 200) {
            size = 200;
        }
        // เปลี่ยนสีย้อนกลับ: Blue -> Green -> Red -> Blue
        colorIndex = (colorIndex - 1 + colors.length) % colors.length;
    }
    
    updateBalloon();
});