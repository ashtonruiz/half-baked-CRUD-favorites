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
const error = document.querySelector('#error');

todoForm.addEventListener('submit', async (e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();

    // create todo state
    const data = new FormData(todoForm);
    const todo = data.get('todo');
    todoForm.reset();
    // add async complete todo handler function
    const newTodo = await completeTodo(todo);
    // call completeTodo
    // swap out todo in array
    if (newTodo) {
        createTodo();
    } else {
        error.textContent = 'Something went wrong with adding your todo';
    }
    // call displayTodos
    displayTodos();

    deleteButton.addEventListener('click', async () => {
        // delete all todos
        await deleteAllTodos();
        // modify state to match
        await displayTodos();
        // re displayTodos
    });
    async function displayTodos() {
        // clear the container (.innerHTML = '')
        todosEl.textContent = '';
        // display the list of todos,
        const list = await getTodos;
        // call render function, pass in state and complete handler function!
        if (list) {
            for (let todo of list) {
                const todoListEl = renderTodo(todo);
                todoListEl.addEventListener('click', async () => {
                    await displayTodos();
                });
                if (todo.cross_out) {
                    todoListEl.classList.add('cross-out-true');
                }
                todosEl.append(todoListEl);
            }
        }
        // append to .todos
    }

    // add page load function
    // fetch the todos and store in state
    // call displayTodos
});

logoutButton.addEventListener('click', () => {
    logout();
});
