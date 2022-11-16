let todayDate = new Date();
todayDate = `${todayDate.getFullYear()}-${
  todayDate.getMonth() + 1
}-${todayDate.getDate()}`;
const taskName = document.querySelector('#taskName');
const description = document.querySelector('#description');
const assignedTo = document.querySelector('#assignedTo');
const assignedDue = document.querySelector('#assignedDue');
const taskStatus = document.querySelector('#taskStatus');
const formSubmit = document.querySelector('.formSubmit');
const toDo = document.querySelector('.toDo');
const inProgress = document.querySelector('.inProgress');
const done = document.querySelector('.done');
const statusTabs = document.querySelector('.statusTab');
const contentWindow = document.querySelector('.contentWindow');
const formValue = document.querySelector('form');

// Content Window Shows Message When No Card is Added

function addMessage() {
  for (let j = 0; j < contentWindow.children.length; j++) {
    if (contentWindow.children[j].children.length == 0) {
      var message = document.createElement('li');
      message.className = 'message';
      message.innerHTML =
        '<p><i class= "fa-sharp fa-solid fa-bell"></i>No task card has been added to this list yet.</p>';
      contentWindow.children[j].appendChild(message);
    }
  }
}
addMessage();

// Add Cards to Different Categories in the Dashboard
formValue.addEventListener('submit', function (e) {
  e.preventDefault();
  const alertMessExist = document.querySelectorAll('.alertMess');
  if (
    taskName.value.trim() &&
    description.value.trim() &&
    assignedTo.value.trim() &&
    assignedDue.value &&
    taskStatus.value
  ) {
    // const alertMessExist = document.querySelectorAll('.alertMess');
    // console.log(alertMessExist);
    if (alertMessExist[0] !== undefined) {
      alertMessExist[0].remove();
    }

    if (taskStatus.value == '0') {
      addToDo();
      messageRemove();
      deleteCard();
      toInProgress();
      toDone();

      // console.log(contentWindow.children[0].children.length, contentWindow.children[0].childNodes);
      // console.log(contentWindow.children[0].children.length, contentWindow.children[0].childNodes);
      for (let i = 0; i < contentWindow.children.length; i++) {
        contentWindow.children[i].style.display = 'none';
      }
      toDo.style.display = 'block';
      statusTabs.children[1].className = 'col unShown';
      statusTabs.children[2].className = 'col unShown';
      statusTabs.children[0].className = 'col active';
    } else if (taskStatus.value == '1') {
      addInProgress();
      messageRemove();
      deleteCard();
      toDone();

      for (let i = 0; i < contentWindow.children.length; i++) {
        contentWindow.children[i].style.display = 'none';
      }
      inProgress.style.display = 'block';
      statusTabs.children[0].className = 'col unShown';
      statusTabs.children[2].className = 'col unShown';
      statusTabs.children[1].className = 'col active';
    } else if (taskStatus.value == '2') {
      addDone();
      messageRemove();
      deleteCard();

      for (let i = 0; i < contentWindow.children.length; i++) {
        contentWindow.children[i].style.display = 'none';
      }
      done.style.display = 'block';

      statusTabs.children[2].className = 'col active';
      statusTabs.children[0].className = 'col unShown';
      statusTabs.children[1].className = 'col unShown';
    }
    formValue.reset();
  } else {
    if (alertMessExist.length >= 1) {
      return;
    }
    alertMessage();
  }
});

// Remove the Message When a Card is Added
function messageRemove() {
  for (let m = 0; m < contentWindow.children.length; m++) {
    if (
      contentWindow.children[m].firstElementChild.getAttribute('class') ==
        'message' &&
      contentWindow.children[m].children.length > 1
    ) {
      contentWindow.children[m].firstElementChild.remove();
    }
  }
}

// Switch Content Windows per Status Tab
for (let n = 0; n < statusTabs.children.length; n++) {
  statusTabs.children[n].setAttribute('data-tabIndex', n);
  statusTabs.children[n].addEventListener('click', function () {
    const indexNum = this.getAttribute('data-tabIndex');
    for (let i = 0; i < contentWindow.children.length; i++) {
      contentWindow.children[i].style.display = 'none';
    }
    contentWindow.children[indexNum].style.display = 'block';
  });
}

// Add Cards to To Do
let todoCards = JSON.parse(localStorage.getItem('todoCards')) || [];
function addToDo() {
  var card = document.createElement('li');
  card.classList.add('cardAdded', 'row');
  card.innerHTML = `
    <div class="col">
      <div>Name: ${taskName.value}</div>
      <div>Assigned To: ${assignedTo.value}</div>
      <div>Description: ${description.value} </div>
   </div>
   <div class="col">
      <div>Assigned Date: ${todayDate}</div>
      <div>Assigned Due: ${assignedDue.value}</div>
   </div>
   <div class="col">
      <button type="button" class="btn btn-warning">
      <i class="fa-sharp fa-solid fa-spinner"></i>
        <span>In Progress</span>
      </button>
      <button type="button" class="btn btn-success">
      <i class="fa-sharp fa-solid fa-square-check"></i>
        <span>Done</span>
      </button>
      <button type="button" class="btn btn-danger">
      <i class="fa-sharp fa-solid fa-trash"></i>
        <span>Delete</span>
      </button>
   </div>`;
  toDo.appendChild(card);
  const todocardItems = {
    taskName: taskName.value,
    assignedTo: assignedTo.value,
    description: description.value,
    todayDate: todayDate,
    assignedDue: assignedDue.value,
  };

  todoCards.push(todocardItems);
  localStorage.setItem('todoCards', JSON.stringify(todoCards));
}
// Show todo card from local storage after refresh and exit browser
function showTodo() {
  for (let m = 0; m < todoCards.length; m++) {
    var card = document.createElement('li');
    card.classList.add('cardAdded', 'row');
    card.innerHTML = `
      <div class="col">
        <div>Name: ${todoCards[m].taskName}</div>
        <div>Assigned To: ${todoCards[m].assignedTo}</div>
        <div>Description: ${todoCards[m].description} </div>
     </div>
     <div class="col">
        <div>Assigned Date: ${todoCards[m].todayDate}</div>
        <div>Assigned Due: ${todoCards[m].assignedDue}</div>
     </div>
     <div class="col">
        <button type="button" class="btn btn-warning">
        <i class="fa-sharp fa-solid fa-spinner"></i>
          <span>In Progress</span>
        </button>
        <button type="button" class="btn btn-success">
        <i class="fa-sharp fa-solid fa-square-check"></i>
          <span>Done</span>
        </button>
        <button type="button" class="btn btn-danger">
        <i class="fa-sharp fa-solid fa-trash"></i>
          <span>Delete</span>
        </button>
     </div>`;
    toDo.appendChild(card);
  }
  messageRemove();
  deleteCard();
  toInProgress();
  toDone();
}
showTodo();
// Add Cards to In Progress
let inprogressCards = JSON.parse(localStorage.getItem('inprogressCards')) || [];

function addInProgress() {
  var card = document.createElement('li');

  card.classList.add('cardAdded', 'row');
  card.innerHTML = `
    <div class="col">
      <div>Name: ${taskName.value}</div>
      <div>Assigned To: ${assignedTo.value}</div>
      <div>Description: ${description.value} </div>
   </div>
   <div class="col">
      <div>Assigned Date: ${todayDate}</div>
      <div>Assigned Due: ${assignedDue.value}</div>
   </div>
   <div class="col">
      <button type="button" class="btn btn-success">
      <i class="fa-sharp fa-solid fa-square-check"></i>
        <span>Done</span>
      </button>
      <button type="button" class="btn btn-danger">
      <i class="fa-sharp fa-solid fa-trash"></i>
       <span>Delete</span>
      </button>
   </div>`;
  inProgress.appendChild(card);
  const inprogresscardItems = {
    taskName: taskName.value,
    assignedTo: assignedTo.value,
    description: description.value,
    todayDate: todayDate,
    assignedDue: assignedDue.value,
  };

  inprogressCards.push(inprogresscardItems);
  localStorage.setItem('inprogressCards', JSON.stringify(inprogressCards));
}
// Show inprogress card from local storage after refresh and exit browser
function showinProgress() {
  for (let m = 0; m < inprogressCards.length; m++) {
    var card = document.createElement('li');
    card.classList.add('cardAdded', 'row');
    card.innerHTML = `
      <div class="col">
        <div>Name: ${inprogressCards[m].taskName}</div>
        <div>Assigned To: ${inprogressCards[m].assignedTo}</div>
        <div>Description: ${inprogressCards[m].description} </div>
     </div>
     <div class="col">
        <div>Assigned Date: ${inprogressCards[m].todayDate}</div>
        <div>Assigned Due: ${inprogressCards[m].assignedDue}</div>
     </div>
     <div class="col">
        <button type="button" class="btn btn-success">
        <i class="fa-sharp fa-solid fa-square-check"></i>
          <span>Done</span>
        </button>
        <button type="button" class="btn btn-danger">
        <i class="fa-sharp fa-solid fa-trash"></i>
          <span>Delete</span>
        </button>
     </div>`;
    inProgress.appendChild(card);
  }

  messageRemove();
  deleteCard();
  toDone();
}
showinProgress();
// Add Cards to Done
let doneCards = JSON.parse(localStorage.getItem('doneCards')) || [];
function addDone() {
  var card = document.createElement('li');
  card.classList.add('cardAdded', 'row');
  card.innerHTML = `
    <div class="col">
      <div>Name: ${taskName.value}</div>
      <div>Assigned To: ${assignedTo.value}</div>
      <div>Description: ${description.value} </div>
   </div>
   <div class="col">
      <div>Assigned Date: ${todayDate}</div>
      <div>Assigned Due: ${assignedDue.value}</div>
   </div>
   <div class="col">
      <button type="button" class="btn btn-danger">
      <i class="fa-sharp fa-solid fa-trash"></i>
        <span>Delete</span>
      </button>
   </div>`;
  done.appendChild(card);

  const donecardItems = {
    taskName: taskName.value,
    assignedTo: assignedTo.value,
    description: description.value,
    todayDate: todayDate,
    assignedDue: assignedDue.value,
  };
  // console.log(cardItems);
  doneCards.push(donecardItems);
  localStorage.setItem('doneCards', JSON.stringify(doneCards));
  // console.log(doneCards);
}
// Show done card from local storage after refresh and exit browser
function showdone() {
  for (let m = 0; m < doneCards.length; m++) {
    var card = document.createElement('li');
    card.classList.add('cardAdded', 'row');
    card.innerHTML = `
      <div class="col">
        <div>Name: ${doneCards[m].taskName}</div>
        <div>Assigned To: ${doneCards[m].assignedTo}</div>
        <div>Description: ${doneCards[m].description} </div>
     </div>
     <div class="col">
        <div>Assigned Date: ${doneCards[m].todayDate}</div>
        <div>Assigned Due: ${doneCards[m].assignedDue}</div>
     </div>
     <div class="col">
        <button type="button" class="btn btn-danger">
        <i class="fa-sharp fa-solid fa-trash"></i>
          <span>Delete</span>
        </button>
     </div>`;
    done.appendChild(card);
  }

  messageRemove();
  deleteCard();
}
showdone();
// Delete a Card
function deleteCard() {
  let btnDanger = document.querySelectorAll('.btn-danger');
  // console.log(btnDanger);
  for (let s = 0; s < btnDanger.length; s++) {
    btnDanger[s].addEventListener('click', function () {
      removeLocalStorageData(this);
      this.parentNode.parentNode.parentNode.removeChild(
        this.parentNode.parentNode
      );
      addMessage();
    });
  }
}
// Switch a card to In Progress Tab
let clonetodoCardObj;
function toInProgress() {
  let btnWarning = document.querySelectorAll('.btn-warning');
  for (let s = 0; s < btnWarning.length; s++) {
    btnWarning[s].addEventListener('click', function () {
      let cloneToDoCard = this.parentNode.parentNode.cloneNode(true);
      if (this.parentNode.parentNode.parentNode.className == 'col toDo') {
        cloneToDoCard.children[2].children[0].remove();
        inProgress.appendChild(cloneToDoCard);
        // console.log(cloneToDoCard);
        removeLocalStorageData(this);
        // push copied object from local storage array of todoCards to local storage array of inprogressCards
        clonetodoCardObj = copiedtodoObj[0];
        inprogressCards.push(clonetodoCardObj);
        localStorage.setItem(
          'inprogressCards',
          JSON.stringify(inprogressCards)
        );
        messageRemove();
        this.parentNode.parentNode.parentNode.removeChild(
          this.parentNode.parentNode
        );
        deleteCard();
        addMessage();
        toDone();
      }
    });
  }
}

// Switch a card to Done Tab
let cloneinprogressCardObj;
function toDone() {
  let btnSuccess = document.querySelectorAll('.btn-success');
  for (let s = 0; s < btnSuccess.length; s++) {
    btnSuccess[s].addEventListener('click', function () {
      var cloneCards = this.parentNode.parentNode.cloneNode(true);
      // console.log(this.parentNode.parentNode.parentNode.className);
      if (this.parentNode.parentNode.parentNode.className == 'col toDo') {
        // console.log(cloneCards.children[2].children[0], cloneCards.children[2].children[1]);
        cloneCards.children[2].children[0].remove();
        cloneCards.children[2].children[0].remove();
        done.appendChild(cloneCards);
        removeLocalStorageData(this);
        // push copied object from local storage array of todoCards to local storage array of inprogressCards
        clonetodoCardObj = copiedtodoObj[0];
        doneCards.push(clonetodoCardObj);
        localStorage.setItem('doneCards', JSON.stringify(doneCards));
        messageRemove();
        this.parentNode.parentNode.parentNode.removeChild(
          this.parentNode.parentNode
        );
        deleteCard();
        addMessage();
      } else if (
        this.parentNode.parentNode.parentNode.className == 'col inProgress'
      ) {
        cloneCards.children[2].children[0].remove();
        done.appendChild(cloneCards);
        removeLocalStorageData(this);
        // push copied object from local storage array of todoCards to local storage array of inprogressCards
        cloneinprogressCardObj = copiedinprogressObj[0];
        doneCards.push(cloneinprogressCardObj);
        localStorage.setItem('doneCards', JSON.stringify(doneCards));
        messageRemove();
        this.parentNode.parentNode.parentNode.removeChild(
          this.parentNode.parentNode
        );
        deleteCard();
        addMessage();
      }
    });
  }
}
// Click tab to Switch between tabs
function clickSwitch() {
  const eachStatus = statusTabs.children;
  for (let m = 0; m < eachStatus.length; m++) {
    eachStatus[m].addEventListener('click', function () {
      for (let n = 0; n < eachStatus.length; n++) {
        eachStatus[n].className = 'col unshown';
      }
      this.className = 'col active';
    });
  }
}
clickSwitch();
// Form Alert Message
function alertMessage() {
  const newTask = document.querySelector('#newTask');
  const alertMess = document.createElement('div');
  alertMess.className =
    'alertMess row justify-content-center align-items-center';
  alertMess.innerHTML =
    '<p class=\'col-sm-9\'><i class="fa-sharp fa-solid fa-comment"></i>Please fill out all fields before submitting the form!</p>';
  newTask.appendChild(alertMess);
}

// Remove Local storage function
let copiedtodoObj;
let copiedinprogressObj;
let copieddoneObj;
function removeLocalStorageData(element) {
  // console.log(element);
  if (element.parentNode.parentNode.parentNode.className == 'col toDo') {
    // console.log(element.parentNode.parentNode);
    // get the index of the childnode of that deleted card
    let startIndex = Array.from(
      element.parentElement.parentElement.parentElement.children
    ).indexOf(element.parentElement.parentElement);
    // console.log(startIndex);
    // copy the object going to be deleted to an array with one object copiedtodoObj[0]
    copiedtodoObj = todoCards.slice(startIndex, startIndex + 1);
    // console.log(copiedtodoObj);
    todoCards.splice(startIndex, 1);
    // console.log(todoCards);
    // convert most updated todoCards array to string using JSON.stringify and then set it again to the local storage which will then overrides the previous local storage data
    localStorage.setItem('todoCards', JSON.stringify(todoCards));
  } else if (
    element.parentNode.parentNode.parentNode.className == 'col inProgress'
  ) {
    // get the index of the childnode of that deleted card
    let startIndex = Array.from(
      element.parentElement.parentElement.parentElement.children
    ).indexOf(element.parentElement.parentElement);
    // copy the object going to be deleted to an array with one object copiedinprogressObj[0]
    copiedinprogressObj = inprogressCards.slice(startIndex, startIndex + 1);
    inprogressCards.splice(startIndex, 1);
    // console.log(inprogressCards);
    // convert most updated inprogressCards array to string using JSON.stringify and then set it again to the local storage which will then overrides the previous local storage data
    localStorage.setItem('inprogressCards', JSON.stringify(inprogressCards));
  } else if (element.parentNode.parentNode.parentNode.className == 'col done') {
    // get the index of the childnode of that deleted card
    let startIndex = Array.from(
      element.parentElement.parentElement.parentElement.children
    ).indexOf(element.parentElement.parentElement);
    // copy the object going to be deleted to an array with one object copieddoneObj[0]
    copieddoneObj = doneCards.slice(startIndex, startIndex + 1);
    doneCards.splice(startIndex, 1);
    // console.log(doneCards);
    // convert most updated doneCards array to string using JSON.stringify and then set it again to the local storage which will then overrides the previous local storage data
    localStorage.setItem('doneCards', JSON.stringify(doneCards));
  }
}
