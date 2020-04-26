class Members {
  constructor() {
    this.baseurl = '/api/v1/members';
    this.members = [];
    this.$membersList = document.querySelector('.members-list');
  }

  async init() {
    await this.updateMembers();
  }

  async getMembers() {
    let data = await fetch (this.baseurl);
    data = await data.json();
    this.members = data;
    await this.renderMembers();
  }

  async createTodo(){
    try {
      const newData = {
        todo: this.$form.todo.value,
        status: 'incomplete'
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

  async updateMembers() {
    await this.getMembers();
    this.renderMembers();
  }

  renderMembers() {
    let tempHTML ='<div class="divTable"><div class="divTableBody"><div class="divTableRow"><div class="divTableCell"><b>Name</b></div><div class="divTableCell"><b>Affiliation</b></div></div>'
    // this.$membersList.innerHTML ='<div class="divTable"><div class="divTableBody"><div class="divTableRow"><div class="divTableCell">Name</div><div class="divTableCell">Affiliation</div></div>'
    this.members.forEach(member =>{
      tempHTML += `
       <div class="divTableRow">
        <div class="divTableCell">${member.name}</div>
        <div class="divTableCell">${member.id}</div>
        </div>
      `;
    });
   tempHTML += '</div></div>' 
   this.$membersList.innerHTML = tempHTML
   console.log(this.$membersList.innerHTML)
    // document.querySelectorAll('.todo-item').forEach(item =>{
    //   item.addEventListener('click', this.handleEditOrDelete.bind(this));
    // });
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
          status: form.status.value
        };
        console.log(updateData);
        await this.updateTodo($listItem.id, updateData);
        console.log('edit', $listItem.id);
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', async () =>{
  const members = new Members();
  await members.init();
});
