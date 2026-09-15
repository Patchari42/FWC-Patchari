const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('newBtn');

// โหลดรายการ TO DO จาก Cookie เมื่อเปิดหน้าเว็บ
window.onload = function() {
    loadTodoList();
};

// เมื่อกดปุ่ม 'New' ให้เด้ง prompt รับค่า
newBtn.addEventListener('click', function() {
    const todoText = prompt('Enter a new TO DO:');
    if (todoText && todoText.trim() !== '') {
        addTodo(todoText.trim());
        saveTodoList();
    }
});

// ฟังก์ชันสร้าง element TO DO และแทรกไว้ด้านบนสุด (Top of the list)
function addTodo(text) {
    const todoItem = document.createElement('div');
    todoItem.textContent = text;

    // เมื่อคลิกที่รายการ ให้เด้ง confirm ถามว่าต้องการลบหรือไม่
    todoItem.addEventListener('click', function() {
        if (confirm('Do you really want to remove this TO DO?')) {
            todoItem.remove(); // ลบออกจาก DOM
            saveTodoList();    // อัปเดตข้อมูลใน Cookie
        }
    });

    // แทรกไว้ที่ตำแหน่งบนสุดของ ft_list
    ftList.insertBefore(todoItem, ftList.firstChild);
}

// ฟังก์ชันบันทึกรายการทั้งหมดลง Cookie
function saveTodoList() {
    const todos = [];
    const items = ftList.querySelectorAll('div');
    
    // เก็บข้อความเรียงตามลำดับปัจจุบันใน DOM
    items.forEach(item => {
        todos.push(item.textContent);
    });

    // แปลงเป็น JSON string แล้วบันทึกใน Cookie (มีอายุ 7 วัน)
    const jsonString = encodeURIComponent(JSON.stringify(todos));
    const date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = `ft_list=${jsonString}; expires=${date.toUTCString()}; path=/`;
}

// ฟังก์ชันอ่าน Cookie และแสดงผล TO DO
function loadTodoList() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith('ft_list=')) {
            const jsonString = decodeURIComponent(cookie.substring('ft_list='.length));
            try {
                const todos = JSON.parse(jsonString);
                // เนื่องจาก addTodo จะใส่ไว้ด้านบนสุด ต้องวนลูปย้อนกลับเพื่อให้ลำดับตรงเดิม
                for (let i = todos.length - 1; i >= 0; i--) {
                    addTodo(todos[i]);
                }
            } catch (e) {
                console.error('Error parsing cookies', e);
            }
            break;
        }
    }
}