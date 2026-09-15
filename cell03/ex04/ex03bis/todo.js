$(document).ready(function() {
    loadTodoList();

    $('#newBtn').click(function() {
        const todoText = prompt('Enter a new TO DO:');
        if (todoText && $.trim(todoText) !== '') {
            addTodo($.trim(todoText));
            saveTodoList();
        }
    });

    function addTodo(text) {
        const $todoItem = $('<div></div>').text(text);

        $todoItem.click(function() {
            if (confirm('Do you really want to remove this TO DO?')) {
                $(this).remove();
                saveTodoList();
            }
        });

        // ใช้ prepend เพื่อวางไว้บนสุดของ #ft_list
        $('#ft_list').prepend($todoItem);
    }

    function saveTodoList() {
        const todos = [];
        $('#ft_list div').each(function() {
            todos.push($(this).text());
        });

        const jsonString = encodeURIComponent(JSON.stringify(todos));
        const date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = `ft_list=${jsonString}; expires=${date.toUTCString()}; path=/`;
    }

    function loadTodoList() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = $.trim(cookie);
            if (cookie.indexOf('ft_list=') === 0) {
                const jsonString = decodeURIComponent(cookie.substring('ft_list='.length));
                try {
                    const todos = JSON.parse(jsonString);
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
});