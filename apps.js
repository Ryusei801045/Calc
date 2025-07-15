document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // ToDoを追加する関数
    function addTodo() {
        const todoText = todoInput.value.trim(); // 前後の空白を削除

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

        // 完了ボタンのイベントリスナー
        const completeButton = listItem.querySelector('.complete-button');
        completeButton.addEventListener('click', () => {
            listItem.classList.toggle('completed'); // 'completed'クラスをトグル
            if (listItem.classList.contains('completed')) {
                completeButton.textContent = '未完了';
                completeButton.style.backgroundColor = '#ffc107'; // 黄色
            } else {
                completeButton.textContent = '完了';
                completeButton.style.backgroundColor = '#28a745'; // 緑色
            }
        });

        // 削除ボタンのイベントリスナー
        const deleteButton = listItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(listItem);
        });

        todoList.appendChild(listItem);
        todoInput.value = ''; // 入力フィールドをクリア
    }

    // 「追加」ボタンがクリックされた時の処理
    addButton.addEventListener('click', addTodo);

    // Enterキーが押された時の処理
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });
});
