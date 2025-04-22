// Fake Database for Users (LocalStorage)
const users = JSON.parse(localStorage.getItem('users')) || {};

// Function to Sign Up
function signup() {
    const username = document.getElementById('authUsername').value.trim();
    const password = document.getElementById('authPassword').value.trim();

    if (users[username]) {
        document.getElementById('authMessage').innerText = "Username already exists!";
        return;
    }

    if (username && password) {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('authMessage').innerText = "Sign Up Successful! Please login.";
    } else {
        document.getElementById('authMessage').innerText = "Fill all fields!";
    }
}

// Function to Log In
function login() {
    const username = document.getElementById('authUsername').value.trim();
    const password = document.getElementById('authPassword').value.trim();

    if (users[username] && users[username] === password) {
        localStorage.setItem('loggedInUser', username);
        document.getElementById('authContainer').classList.add('hidden');
        document.getElementById('taskContainer').classList.remove('hidden');
    } else {
        document.getElementById('authMessage').innerText = "Invalid username or password!";
    }
}

// Logout Function
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.reload();
}

// Function to Check if User is Logged In
window.onload = function () {
    if (localStorage.getItem('loggedInUser')) {
        document.getElementById('authContainer').classList.add('hidden');
        document.getElementById('taskContainer').classList.remove('hidden');
    }
};

// ========== TASK MANAGEMENT FUNCTIONS ==========

// Function to Add Task
function addTask() {
    const taskTitle = document.getElementById('taskTitle').value.trim();
    const taskAssignee = document.getElementById('taskAssignee').value.trim();
    const taskDeadline = document.getElementById('taskDeadline').value;

    if (taskTitle === '' || taskAssignee === '' || taskDeadline === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Create a task element
    const taskElement = document.createElement('li');
    taskElement.innerHTML = `
        <span>${taskTitle} (Assigned to: ${taskAssignee}, Deadline: ${taskDeadline})</span>
        <button onclick="moveToInProgress(this)">Move to In Progress</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    // Add task to the To Do column
    document.getElementById('todoList').appendChild(taskElement);

    // Clear the input fields
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskAssignee').value = '';
    document.getElementById('taskDeadline').value = '';
}

// Function to Move Task to In Progress
function moveToInProgress(button) {
    const taskElement = button.parentElement;
    const inProgressList = document.getElementById('inProgressList');
    taskElement.innerHTML = `
        <span>${taskElement.innerText}</span>
        <button onclick="moveToDone(this)">Move to Done</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    inProgressList.appendChild(taskElement);
}

// Function to Move Task to Done
function moveToDone(button) {
    const taskElement = button.parentElement;
    const doneList = document.getElementById('doneList');
    taskElement.innerHTML = `
        <span>${taskElement.innerText}</span>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    doneList.appendChild(taskElement);
}

// Function to Delete Task
function deleteTask(button) {
    button.parentElement.remove();
}
