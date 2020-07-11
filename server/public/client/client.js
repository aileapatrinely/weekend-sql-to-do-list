$(document).ready(init);

function init() {
  console.log('Jquery in da house!');
  $('.js-add-task').on('click', postTask);
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
        // Append each artist to the table
        $('.js-table-body').append(`<tr>
                                            <td>${task.task}</td>
                                            <td>${task.complete}</td>
                                            <td>
                                            <input class="js-checkbox" type="checkbox" id="taskdone" name="done">
                                            <label for="taskdone">Completed</label>
                                          </td>
                                          </tr>`);
      }
    })
    .catch(function (error) {
      console.log('error in task get', error);
    });
}
