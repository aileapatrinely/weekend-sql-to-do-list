$(document).ready(init);

function init() {
  console.log('Jquery in da house!');
  $('.js-add-task').on('click', postTask);
  $('.js-table-body').on('click', '.js-checkbox', toggleClass);
  $('.js-table-body').on('click', '.js-delete-btn', clickDelete);
  getTasks();
}

function postTask() {
  console.log('In function postTask');
  const taskToSend = {
    task: $('.js-task').val(),
    complete: $('.js-y-n').val(),
  };

  console.log(taskToSend);

  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: taskToSend,
  })
    .then(function (response) {
      console.log(response);
      getTasks();
    })
    .catch(function (error) {
      console.log('error in task post', error);
    });
}

function getTasks() {
  $.ajax({
    method: 'GET',
    url: '/tasks',
  })
    .then(function (response) {
      const listOfTasks = response;
      $('.js-table-body').empty();
      for (let task of listOfTasks) {
        if (task.complete == 'N') {
          $('.js-table-body').append(`<tr>
                                    <td>${task.task}</td>
                                    <td>
                                    <input data-task-id="${task.id}"  class="js-checkbox" type="checkbox" id="taskdone" name="done">
                                    <label for="taskdone">Completed</label>
                                    </td>
                                    <td><button data-task-id="${task.id}" class="js-delete-btn bye-btn btn-danger">Delete</button></td>
                                    </tr>`);
        } else {
          $('.js-table-body').append(`<tr>
                                    <td>${task.task}</td>
                                    <td>
                                    <input data-task-id="${task.id}" class="js-checkbox" type="checkbox" id="taskdone" name="done" checked>
                                    <label for="taskdone">Completed</label>
                                    </td>
                                    <td><button data-task-id="${task.id}"  class="js-delete-btn bye-btn btn-danger">Delete</button></td>
                                    </tr>`);
        }
      }
    })
    .catch(function (error) {
      console.log('error in task get', error);
    });
}

function clickDelete() {
  const id = $(this).data('taskId');
  deleteTask(id);
}

function deleteTask(taskId) {
  $.ajax({
    type: 'DELETE',
    url: `/tasks/${taskId}`,
  })
    .then((response) => {
      getTasks();
    })
    .catch((err) => {
      console.log('err:', err);
      alert('Check deleteTask');
    });
}

function clickComplete() {}

function updateTask(id) {
  $.ajax({
    type: 'PUT',
    url: `tasks/${id}`,
    data: { complete: 'Y' },
  })
    .then((response) => {
      getTasks();
    })
    .catch((err) => {
      console.log('err:', err);
      alert('Check updateTask');
    });
}

function toggleClass() {
  $(this).parent().parent().toggleClass('orange');
  clickComplete();
}
