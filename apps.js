// 以前の script.js の内容そのまま
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') {
            alert('ToDoを入力してください。');
            return;
        }

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${todoText}</span>
            <div class="actions">
                <button class="complete-button">完了</button>
                <button class="delete-button">削除</button>
            </div>
        `;

        const completeButton = listItem.querySelector('.complete-button');
        completeButton.addEventListener('click', () => {
            listItem.classList.toggle('completed');
            if (listItem.classList.contains('completed')) {
                completeButton.textContent = '未完了';
                completeButton.style.backgroundColor = '#ffc107';
            } else {
                completeButton.textContent = '完了';
                completeButton.style.backgroundColor = '#28a745';
            }
        });

        const deleteButton = listItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(listItem);
        });

        todoList.appendChild(listItem);
        todoInput.value = '';
    }

    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });
});
