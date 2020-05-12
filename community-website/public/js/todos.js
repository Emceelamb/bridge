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
        <p class="todo-name" name="user" >${item.user}</p>
        <p class="todo-date" name="date">${item.date}</p>
        <form class="todo-item__form">
          <textarea id="" name="todo" cols="30" rows="10">${item.todo}</textarea>
          <label class="switch" name="status">
            <input type="checkbox" ${item.status==="complete" ? 'checked' : 'true'} class="todo-toggle">
            <span class="slider round"></span>
          </label> ${item.status}
        </form>
        <button class="todo-item__delete">delete</button> | <button class="todo-item__edit">edit</button>
      </li>
      `;
    });
    document.querySelectorAll('.todo-item').forEach(item =>{
      item.addEventListener('click', this.handleEditOrDelete.bind(this));
    });
    // document.querySelectorAll('.todo-toggle').forEach(item =>{
    //   item.addEventListener('click', this.toggleStatus.bind(this));
    // });
  }

  async toggleStatus(evt){
    let itemId = evt.target.parentElement.parentElement.parentElement.id
    let listItem = evt.target.parentElement.parentElement;
    let status;
    if (evt.target.checked){
      status="complete";
    } else {
      status="incomplete";
    }
    console.log(evt.target.checked)
    const updateData = {
      todo: listItem.children[0].value,
      status: status,
      user: listItem.children[0].innerHTML,
      date: listItem.children[1].innerHTML,
    };

    await this.updateTodo(itemId, updateData);
  }
  async handleEditOrDelete(evt) {
    {
      const $clickedButton = evt.target;
      const $listItem = evt.currentTarget;

      if($clickedButton.classList.contains('todo-item__delete')){
        await this.deleteTodo($listItem.id);
        console.log('delete', $listItem, $listItem.id);
      } else if ($clickedButton.classList.contains('todo-item__edit')) {
        const form = $listItem.children[2];
        // console.log(form, "form")
        // console.log($listItem.children[0].innerHTML, "list")
        let status;
        if (form.children[1].children[0].checked){
          status="complete";
        } else {
          status="incomplete";
        }
        const updateData = {
          todo: form.todo.value,
          status: status,
          user: $listItem.children[0].innerHTML,
          date: $listItem.children[1].innerHTML,
        };
        // console.log(updateData)
        await this.updateTodo($listItem.id, updateData);
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', async () =>{
  const todos = new Todos();
  await todos.init();
});
