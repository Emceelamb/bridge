socket.on('connect', function() {
  socket.emit('my event', "Connected Device!")
})

socket.on('server response', function(res){
  $('#peers').empty();
  let ips = res.split(",")
  console.log(ips)
  ips.forEach((ip)=>{
    ipAdd= ip.split(":");
    $('#peers').append(
      `
      <li class="peerIp">${ipAdd[3]}</li>
      `
    )
  })
})

socket.on('chatmessage', function (data) {
    console.log(data);
    //customize-> make line break, clear input
    let otherMsg = document.getElementById('messages');
    let newOtherMsg = document.createElement('p');
    newOtherMsg.innerHTML = `${data}`;
    newOtherMsg.classList.add('newOtherMsg');
    otherMsg.appendChild(newOtherMsg);
    // document.getElementById('message').value = ` `;
  $('#messages').animate({
    scrollTop: $("#messages").offset().top
  }, 0)
});
//get topic from server
socket.on('giveTopic', function (topic) {
    console.log(topic);
})

var sendmessage = function (message) {
    console.log("chatmessage: " + message);
    socket.emit('chatmessage', message);
    //customize-> make line break, clear input
    let myMsg = document.getElementById('messages');
    let newMyMsg = document.createElement('p');
    newMyMsg.innerHTML = `${message}`;
    newMyMsg.classList.add('newMyMsg');
    myMsg.appendChild(newMyMsg);
    document.getElementById('message').value = ` `;
  $('#messages').animate({
    scrollTop: $("#messages").offset().top
  }, 0)
};
