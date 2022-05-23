document.title = 'TaskSpace';
//MVC

// Model
let todos = [];
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
document.body.style.fontFamily = '"Roboto Mono", monospace';
function render() {
    todolist.innerHTML = '';
    todos.forEach(function (todo) {
        const todoe = document.createElement('div');
        todoe.innerText = todo.title;
        const todoed = document.createElement('div');
        todoed.innerText = todo.duedate;
        todoe.style = 'margin-top:8px';
        todoe.style.display = 'flex';
        todoe.style.flexWrap = 'wrap';
        todoe.style.backgroundColor = 'antiquewhite';
        todoe.style.color = 'black';
        todoe.style.paddingLeft = '0.5vw';
        todoed.style.color = 'black';
        todoed.style.marginLeft = 'auto';
        todoed.style.marginRight = 'auto';
        todoed.style.marginTop = '0';
        todoed.style.marginBottom = '0';
        todoe.style.fontWeight = 'bold';
        todoe.appendChild(todoed);
        const deletebtn = document.createElement('button');
        deletebtn.innerText = 'Delete';
        deletebtn.style.fontSize = 'medium';
        deletebtn.style.border = '2px solid black';
        deletebtn.style.marginRight = '3vw';
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