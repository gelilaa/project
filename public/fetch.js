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
        
        const div = document.getElementById('root');
        const ul = document.createElement('ul');
        const li = document.createElement('li');

        li.innerHTML = `<input class='checkbox' id =${todo.id} type = 'checkbox'>` + todo.todoText + "</input>";
        let checkBoxEl = li.children[0];
        checkBoxEl.addEventListener('click',this.handlePatchTodo);
      
     
        ul.appendChild(li);
        div.appendChild(ul);
   
    
},

renderTodos: function(todos){
   
   todos
   .map(todo=>this.renderTodo(todo))
   .reduce((first,second)=> first + second,'')

   
},
handelAddtodo: async function(e){
    debugger;
   e = e || window.event;
   e.preventDefault();
    const newTodo={
        todoText: e.target.form.add.value,
        completed: false,

    };
    
   const todorender = await this.postTodo(newTodo);
    this.renderTodo(todorender)
    document.getElementById("add").value = "";
},
displayAll: async function(){
    debugger;
    const allTodos = await this.getAll();
   this.renderTodos(allTodos);

}

}
