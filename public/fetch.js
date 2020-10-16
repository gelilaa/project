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
    toggleOne: async function (e) {
        //debugger
        toDoToggle = e.id;
        toDoCompleted = e.checked;
        try {          
            const res = await fetch(`/todos/${toDoToggle}`,
              { method: 'PATCH',
              body: JSON.stringify({ completed: toDoCompleted }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              } 
            });
            const data = await res.json();
            console.log('Todo ID: ', toDoToggle, 'Completed: ', toDoCompleted)           
        }
        catch (err) {
            console.log(err);
        };
    },

    toggleAll: async function () {
        debugger
        try {
            this.deleteAll();
            const res = await fetch('/todos');
            const data = await res.json()
            for (let todo of data) {
                try {
                    
                    const res = await fetch(`/todos/${todo.id}`,
                      { method: 'PATCH',
                      body: JSON.stringify({ completed: true }),
                      headers: {
                        "Content-type": "application/json; charset=UTF-8"
                      } 
                    });
                    const data = await res.json();
                    console.log('new data: ', data)
                    this.renderTodo(data);
                    
                }
                catch (err) {
                    console.log(err);
                };
            };
        } catch (err) {
            console.log(err);
        };
    },

    renderTodo: function (todo){
        //debugger
        const div = document.getElementById('root');
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.className = 'checkbox';
        check.id = todo.id;
        check.checked = todo.completed;
        const label = document.createElement('label');
        label.htmlFor = todo.id;
        label.innerHTML = todo.todoText
        //li.innerHTML = `<label for="${todo.id}">${todo.todoText}</label>`;
        check.addEventListener('click',this.toggleOne.bind(this, check));
      
        li.appendChild(check);
        li.appendChild(label);
        ul.appendChild(li);
        div.appendChild(ul);
   
    
},

deleteAll: function (){
    //debugger
    const element = document.getElementById('root');

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
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
    this.deleteAll();
    const allTodos = await this.getAll();
    this.renderTodos(allTodos);

}

}
