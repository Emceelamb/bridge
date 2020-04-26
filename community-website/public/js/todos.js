class Todos {
  constructor() {
    this.baseurl = '/api/v1/todos';
    this.todos = [];
    this.$todos = document.querySelector('.todo-list');
    this.$form = document.querySelector('.todo-form')
  }

  async init() {
    await this.updateTodos();
    this.$form.addEventListener('submit', async evt => {
      evt.preventDefault();
      await this.createTodo();
    });
  }

  async getTodos() {
    let data = await fetch (this.baseurl);
    data = await data.json();
    this.todos = data;
    let incomplete =[];
    let complete =[];
    let toDoList=[];

    this.todos.forEach((item)=>{
      if(item.status=="incomplete"){incomplete.push(item)}
      if(item.status=="complete"){complete.push(item)}
    })

    if(incomplete.length!=0){
      incomplete.sort((a,b)=>{
        return a.date.localeCompare(b.date);
      });
      for(let i = 0; i < incomplete.length;i++){
        toDoList.push(incomplete[i])
      }
    }

    if(complete.length!=0){
      console.log(complete)
      complete.sort((a,b)=>{
        return a.date.localeCompare(b.date);
      });
      for(let i = 0; i < complete.length;i++){
        toDoList.push(complete[i])
      }
    }

    this.todos=toDoList;
    console.log(this.todos, "getTodos")
    await this.renderTodos();
  }

  async createTodo(){
    try {
      const newData = {
        todo: this.$form.todo.value,
        status: 'incomplete',
        date: new Date().toLocaleString()
      };

      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      };
      let data = await fetch(this.baseurl,options);
      data = await data.json();
      await this.updateTodos();
    } catch(error){
      console.error(error);
    }
  }

  async updateTodo(id, newData) {
    try {
      const options = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      };
      let data = await fetch(this.baseurl + `/${id}`, options);
      data = await data.json();
      await this.updateTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteTodo(id) {
    try {
      const options = {
        method: 'DELETE'
      };
      let data = await fetch(this.baseurl + `/${id}`, options);
      data = await data.json();
      this.updateTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async updateTodos() {
    await this.getTodos();
    this.renderTodos();
  }

  renderTodos() {
    this.$todos.innerHTML ='';
    this.todos.forEach(item =>{
      this.$todos.innerHTML += `
      <li class="todo-item" id="${item._id}">
        <form class="todo-item__form">
          <input type="text" name="todo" value="${item.todo}">
          <select name="status">
            <option value="incomplete" ${item.status === "incomplete" ? 'selected' : ''}>incomplete</option>
            <option value="complete" ${item.status === "complete" ? 'selected' : ''}>complete</option>
          </select>
        <p name="user" >${item.user}</p>
        <p name="date">${item.date}</p>
        </form>
        <button class="todo-item__delete">delete</button> | <button class="todo-item__edit">edit</button>
      </li>
      `;
    });
    document.querySelectorAll('.todo-item').forEach(item =>{
      item.addEventListener('click', this.handleEditOrDelete.bind(this));
    });
  }


  async handleEditOrDelete(evt) {
    {
      const $clickedButton = evt.target;
      const $listItem = evt.currentTarget;

      if($clickedButton.classList.contains('todo-item__delete')){
        await this.deleteTodo($listItem.id);
        console.log('delete', $listItem, $listItem.id);
      } else if ($clickedButton.classList.contains('todo-item__edit')) {
        const form = $listItem.firstElementChild;

        const updateData = {
          todo: form.todo.value,
          status: form.status.value,
          user: form.children[2].innerHTML,
          date: form.children[3].innerHTML,
        };
        await this.updateTodo($listItem.id, updateData);
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', async () =>{
  const todos = new Todos();
  await todos.init();
});
