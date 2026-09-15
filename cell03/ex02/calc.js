// ฟังก์ชันตรวจสอบว่าเป็นจำนวนเต็มบวก (Positive Integer >= 0) หรือไม่
function isPositiveInteger(value) {
    // ต้องเป็นตัวเลขล้วน และไม่ติดลบ (ไม่มีจุดทศนิยม)
    return /^\d+$/.test(value);
}

document.getElementById('calcForm').addEventListener('submit', function(e) {
    e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บรีเฟรชเมื่อกด submit

    const leftStr = document.getElementById('leftNum').value.trim();
    const rightStr = document.getElementById('rightNum').value.trim();
    const op = document.getElementById('operator').value;

    // 1. ตรวจสอบเงื่อนไข ต้องเป็นจำนวนเต็มบวก (>= 0) เท่านั้น
    if (!isPositiveInteger(leftStr) || !isPositiveInteger(rightStr)) {
        alert('Error :(');
        return;
    }

    const leftNum = parseInt(leftStr, 10);
    const rightNum = parseInt(rightStr, 10);

    // 2. ตรวจสอบกรณีหารหรือหาเศษด้วย 0 (Divide or Modulo by Zero)
    if ((op === '/' || op === '%') && rightNum === 0) {
        alert("It's over 9000!");
        console.log("It's over 9000!");
        return;
    }

    // 3. คำนวณผลลัพธ์
    let result = 0;
    switch (op) {
        case '+':
            result = leftNum + rightNum;
            break;
        case '-':
            result = leftNum - rightNum;
            break;
        case '*':
            result = leftNum * rightNum;
            break;
        case '/':
            result = leftNum / rightNum;
            break;
        case '%':
            result = leftNum % rightNum;
            break;
    }

    // แสดงผลลัพธ์ผ่าน alert และ console.log
    alert(result);
    console.log(result);
});

// 4. แสดง alert ทุกๆ 30 วินาที
setInterval(function() {
    alert('Please, use me...');
}, 30000);