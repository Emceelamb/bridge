class Signup {
  constructor() {
    this.members = [];
    this.$membersList = document.querySelector('.members-list');
    this.baseurl = '/api/v1/members';
    this.$form = document.querySelector('.signup-form')
  }

  async init() {
    this.$form.addEventListener('submit', async evt => {
      evt.preventDefault();
      console.log("click")
      await this.createMember();
    });
  }

  async getMembers() {
    let data = await fetch (this.baseurl);
    data = await data.json();
    this.members = data;
    await this.renderMembers();
  }

  async createMember(){
    try {
      const newData = {
        username: this.$form.username.value.trim(),
        name: this.$form.name.value,
        id: this.$form.id.value,
        password: this.$form.password.value,
      };
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      };

      console.log(newData, "createmem");

      let data = await fetch(this.baseurl,options);
      data = await data.json();
    } catch(error){
      console.error(error);
    }
  }


  renderMembers() {
    this.$membersList.innerHTML ='';
    this.members.forEach(item =>{
      this.$membersList.innerHTML += `
      <li class="todo-item" id="${item._id}">
        <p>${item.user}</p>
        <form class="todo-item__form">
          <input type="text" name="todo" value="${item.todo}">
          <select name="status">
            <option value="incomplete" ${item.status === "incomplete" ? 'selected' : ''}>incomplete</option>
            <option value="complete" ${item.status === "complete" ? 'selected' : ''}>complete</option>
          </select>
        </form>
        <button class="todo-item__delete">delete</button> | <button class="todo-item__edit">edit</button>
      </li>
      `;
    });
    document.querySelectorAll('.todo-item').forEach(item =>{
      item.addEventListener('click', this.handleEditOrDelete.bind(this));
    });
  }
}

window.addEventListener('DOMContentLoaded', async () =>{
  const signup = new Signup();
  await signup.init();
});
