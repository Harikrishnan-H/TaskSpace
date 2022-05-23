document.title = 'TaskSpace';
//MVC
// Model
let todos=[];
let todosstr = localStorage.getItem('list');
let todosarr = JSON.parse(todosstr);
if (Array.isArray(todosarr)) {
    todos = todosarr;
    render();
}

//stores todos to localStorage
function store() {
    localStorage.setItem('list', JSON.stringify(todos));
}

// Creates a todo
function createtodo(title, duedate) {
    const id = new Date().getTime();
    todos.push({ title: title, duedate: duedate, id: id });
    store();

}
// Removes a todo
function removetodo(idtodelete) {
    todos = todos.filter(function (todo) {
        if (todo.id == idtodelete) {
            return false;
        }
        else {
            return true;
        }
    })
    store();

}

// View
// document.body.style.backgroundImage = 
document.body.style.fontFamily = '"Roboto Mono", monospace';
function render() {
    todolist.innerHTML = '';
    todos.forEach(function (todo) {
        const todoe = document.createElement('div');
        todoe.innerText = todo.title;
        const todoed = document.createElement('div');
        todoed.innerText = todo.duedate;
        todoe.appendChild(todoed);
        todoe.style = 'margin-top:8px';
        todoe.style.display = 'flex';
        todoe.style.justifyContent = 'space-evenly';
        todoe.style.backgroundColor = 'antiquewhite';
        todoe.style.color = 'black';
        todoed.style.color = 'black';
        todoe.style.fontWeight = 'bold';
        const deletebtn = document.createElement('button');
        deletebtn.innerText = 'Delete';
        deletebtn.style.fontSize = 'medium';
        deletebtn.style.border = '2px solid black';
        todoe.appendChild(deletebtn);
        deletebtn.id = todo.id;
        deletebtn.onclick = deletetodo;
        const todolist = document.getElementById('todolist');
        todolist.appendChild(todoe);


    });
}

// Controller   
function addtodo() {
    const textbox = document.getElementById("textbox");
    const title = textbox.value;
    textbox.value = '';
    if (title != '') {
        const date = document.getElementById("date");
        const duedate = date.value;
        createtodo(title, duedate);
        render();
    }
}
function deletetodo(event) {
    const deletebutton = event.target;
    const idtodelete = deletebutton.id;
    removetodo(idtodelete);
    render();
}