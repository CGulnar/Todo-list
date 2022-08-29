const form = document.querySelector(".todo-form")
const inputAdd = document.querySelector(".input-add")
const todoList = document.querySelector(".todo-list")
const firstPart = document.querySelectorAll(".part")[0]
const secondPart = document.querySelectorAll(".part")[1]
const inputSearch = document.querySelector(".input-search")
const clearButton = document.querySelector(".button-remove")

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    secondPart.addEventListener("click", deleteTodo)
    inputSearch.addEventListener("keydown", inputTodos)
    clearButton.addEventListener("click", clearAllTodos)

}
function clearAllTodos(e){
    if(confirm("Bütün todoları silməyə əminsiz?")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild)
        }
        localStorage.removeItem("todos")
    }
}
function deleteTodo(e){
    if(e.target.className === "fa-solid fa-xmark"){
        e.target.parentElement.parentElement.remove()
        deleteFromStorage(e.target.parentElement.parentElement.textContent)

    }
}
function inputTodos(e){
const searchValue = e.target.toLowerCase() 
const listItems = document.querySelectorAll("li")
listItems.forEach(function(listItem){
    const text = listItem.textContent.toLowerCase()
    if(text.indexOf(searchValue)=== -1){
        listItem.setAttribute("style","display: none")
    }
    else{
        listItem.setAttribute("style", "display: block")
    }
})
}
function deleteFromStorage(deleteTodo){
    let todos = getTodoFromStorage()

    todos.forEach(function(todo,index){
        if(todo===deleteTodo){
            todos.splice(index,1)
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos))

}
function loadAllTodosToUI(){
    let todos = getTodoFromStorage();
    todos.forEach(todo => {
        addTodoToUI(todo)
    });
}
function addTodo(e){
    const newTodo = inputAdd.value.trim()
    
    if(newTodo=== ""){
        showAlert("Xana boşdur..!")
    }
    else{
        addTodoToUI(newTodo)
        addTodoToStorage(newTodo)
    }
    e.preventDefault();
}

function getTodoFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))

    }
    return todos;
}

function addTodoToStorage(newTodo){
   let todos = getTodoFromStorage()
   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos))
}
function showAlert(message){
    const alert = document.createElement("div")
    alert.className = "alert-message"
    alert.textContent = message;
    firstPart.appendChild(alert)
    setTimeout(function(){
        alert.remove()
    },1000)
}

function addTodoToUI(newTodo){
    const listItem = document.createElement("li")
    const divList = document.createElement("div")
    divList.className = "list-item";
    divList.innerHTML = "<i class='fa-solid fa-xmark'></i>"
    listItem.appendChild(document.createTextNode(newTodo))
    listItem.appendChild(divList)
    todoList.appendChild(listItem)
    inputAdd.value = "";
}