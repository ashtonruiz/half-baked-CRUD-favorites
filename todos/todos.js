import {
    checkAuth,
    createTodo,
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos,
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async (e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();
    // create todo state
    const data = new FormData(todoForm);
    const todo = data.get('todo');
    await createTodo(todo);
    todoForm.reset();
    // add async complete todo handler function
    // const newTodo = await completeTodo(todo);
    // call completeTodo
    // completeTodo();
    // swap out todo in array
    // call displayTodos
    displayTodos();
});

async function displayTodos() {
    // clear the container (.innerHTML = '')
    const todos = await getTodos();
    // display the list of todos,
    todosEl.textContent = '';
    // call render function, pass in state and complete handler function!
    for (let todo of todos) {
        const todoEl = renderTodo(todo);
        // add page load function
        todoEl.addEventListener('click', async () => {
            // fetch the todos and store in state
            await completeTodo(todo.id);
            // call displayTodos
            displayTodos();
        });
        // append to .todos
        todosEl.append(todoEl);
    }
}

window.addEventListener('load', async () => {
    displayTodos();
});

deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();
    // modify state to match
    await displayTodos();
    // re displayTodos
});

logoutButton.addEventListener('click', () => {
    logout();
});
