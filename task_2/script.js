// Get elements
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');

// Array to hold tasks
let tasks = [];

// Add task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    renderTasks();
  }
});

// Render tasks
function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  tasks
    .filter(task => filter === 'all' || 
                     (filter === 'completed' && task.completed) || 
                     (filter === 'pending' && !task.completed))
    .forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.className = `task ${task.completed ? 'completed' : ''}`;
      
      taskItem.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button onclick="toggleComplete(${index})">
            ${task.completed ? 'Undo' : 'Complete'}
          </button>
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
      taskList.appendChild(taskItem);
    });
}

// Toggle complete status
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Edit task
function editTask(index) {
  const newTaskText = prompt('Edit task:', tasks[index].text);
  if (newTaskText !== null && newTaskText.trim() !== '') {
    tasks[index].text = newTaskText.trim();
    renderTasks();
  }
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Filter tasks
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    renderTasks(button.dataset.filter);
  });
});
