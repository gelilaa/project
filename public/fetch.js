const fetchtodo ={
    postTodo:async function(newTodo){
    try {
        const res = await fetch('/todos', {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return await res.json();
    } catch(err) {
        console.log(err);
    };

},
    getAll: async function () {
        try {
            const res = await fetch('/todos');
            return await res.json();
        } catch (err) {
            console.log(err);
        };
    },
    renderTodo: function (todo){
        return `<input class= 'checkbox' id =${todo.id} type = 'checkbox' onclick = 'handlers.toggleCompleted()'>` + todo.todoText + "</input>";

},
renderTodos: function(todos){
   
   return  ` <ul>${todos
   .map(todo=>`<li>${this.renderTodo(todo)}</li>`)
   .reduce((first,second)=> first + second,'')}</ul>`

   
},
handelAddtodo: async function(e){
    debugger;
    
    const newTodo={
        todoText: e.form.add.value,
        completed: false,

    };
    
    const todorender = await this.postTodo(newTodo);
   document.getElementById('root').innerHTML = this.renderTodo(todorender);
    e.preventDefault();
},
displayAll: async function(){
    debugger;
    const allTodos = await this.getAll();
    document.getElementById('root').innerHTML = this.renderTodos(allTodos);

}

}
