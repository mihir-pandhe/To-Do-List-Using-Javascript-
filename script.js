document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const clearCompletedButton = document.getElementById('clearCompleted');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    renderTasks();

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const task = todoInput.value.trim();
        if (task !== '') {
            addTask(task);
            todoInput.value = '';
        }
    });

    function addTask(taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach(function (task) {
            const li = document.createElement('li');
            li.setAttribute('data-task-id', task.id);
            li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
        <button class="delete-btn">Delete</button>`;
            const checkbox = li.querySelector('input[type="checkbox"]');
            const deleteButton = li.querySelector('.delete-btn');

            checkbox.addEventListener('change', function () {
                toggleTaskCompletion(task.id);
            });

            deleteButton.addEventListener('click', function () {
                deleteTask(task.id);
            });

            todoList.appendChild(li);
        });
    }

    function toggleTaskCompletion(id) {
        tasks = tasks.map(function (task) {
            if (task.id === id) {
                return {
                    ...task,
                    completed: !task.completed
                };
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(id) {
        tasks = tasks.filter(function (task) {
            return task.id !== id;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    clearCompletedButton.addEventListener('click', function () {
        tasks = tasks.filter(function (task) {
            return !task.completed;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    });
});
