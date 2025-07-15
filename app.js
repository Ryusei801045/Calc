document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // PWA: Service Worker の登録
    // GitHub Pages でリポジトリ名がパスに含まれる場合を考慮し、
    // serviceWorker.register のパスを `/sw.js` にすることで、
    // リポジトリのルート（例: https://<username>.github.io/<repository-name>/sw.js）
    // をService Workerのスコープとして登録します。
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js', { scope: '/' }) // スコープをルートに設定
                .then(registration => {
                    console.log('Service Worker 登録成功:', registration.scope);
                })
                .catch(error => {
                    console.error('Service Worker 登録失敗:', error);
                });
        });
    }

    // ToDoをローカルストレージから読み込む関数
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            addTodoToDOM(todo.text, todo.completed);
        });
    }

    // ToDoをローカルストレージに保存する関数
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('#todo-list li').forEach(listItem => {
            todos.push({
                text: listItem.querySelector('span').textContent,
                completed: listItem.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // ToDoをDOMに追加する関数
    function addTodoToDOM(todoText, isCompleted = false) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${todoText}</span>
            <div class="actions">
                <button class="complete-button">${isCompleted ? '未完了' : '完了'}</button>
                <button class="delete-button">削除</button>
            </div>
        `;

        if (isCompleted) {
            listItem.classList.add('completed');
            listItem.querySelector('.complete-button').style.backgroundColor = '#ffc107'; // 黄色
        } else {
            listItem.querySelector('.complete-button').style.backgroundColor = '#28a745'; // 緑色
        }

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
            saveTodos(); // 状態変更後に保存
        });

        // 削除ボタンのイベントリスナー
        const deleteButton = listItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(listItem);
            saveTodos(); // 削除後に保存
        });

        todoList.appendChild(listItem);
    }

    // ToDoを追加する関数
    function addTodo() {
        const todoText = todoInput.value.trim(); // 前後の空白を削除

        if (todoText === '') {
            alert('ToDoを入力してください。');
            return;
        }

        addTodoToDOM(todoText);
        saveTodos(); // 追加後に保存
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

    // ページ読み込み時にToDoを読み込む
    loadTodos();
});
