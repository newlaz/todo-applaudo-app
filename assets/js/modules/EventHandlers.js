import {
  btnAddTask,
  handleTasksInput,
  searchTaskInput,
  taskAssigneeSelect,
  taskDateInput,
  taskNameInput,
  tasksContainer,
} from "./Components.js";
import { TaskList } from "./TasksList.js";
import { Tasks } from "./Tasks.js";
import { UI } from "./UI.js";

export default (() => {
  window.addEventListener("beforeunload", (event) => {
    const task = new Tasks({
      taskAssignee: Tasks.setAssignee(taskAssigneeSelect["selectedIndex"]),
      taskAssigneeId: taskAssigneeSelect["selectedIndex"],
      taskDateCreated: Date.now(),
      taskDateEnd: taskDateInput.value,
      taskId: Date.now(),
      taskName: taskNameInput.value,
    });

    if (!TaskList.listTasks(task)) {
      event.returnValue = "Data Wrong!";
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    TaskList.readTasks();
  });

  btnAddTask.addEventListener("click", (e) => {
    e.preventDefault();

    const task = new Tasks({
      taskAssignee: Tasks.setAssignee(taskAssigneeSelect["selectedIndex"]),
      taskAssigneeId: taskAssigneeSelect["selectedIndex"],
      taskDateCreated: Date.now(),
      taskDateEnd: taskDateInput.value,
      taskId: Date.now(),
      taskName: taskNameInput.value,
    });

    btnAddTask.disabled = true;

    setTimeout(() => {
      TaskList.listTasks(task);
      btnAddTask.disabled = false;
    }, 800);
  });

  tasksContainer.addEventListener("click", (event) => {
    if (event.target.attributes["data-card-check"]) {
      UI.checkTask(event.target);

      !event.target.attributes["checked"]
        ? UI.setCheck(event.target)
        : UI.removeCheck(event.target);

      event.target.attributes["checked"]
        ? UI.completeTask(event.target.parentElement.parentElement)
        : UI.uncompleteTask(event.target.parentElement.parentElement);
    } else if (event.target.attributes["data-btn-delete"]) {
      if (confirm("You sure, you want to delete this task?")) {
        /* Getting the parent element of the element that was clicked. */
        TaskList.deleteTask(event.target.parentElement.parentElement);
      }
    } else if (event.target.attributes["data-btn-edit"]) {
      TaskList.editTask(event.target.parentElement.parentElement);
    }

    event.stopPropagation();
  });

  handleTasksInput.addEventListener("input", (event) => {
    /* Getting the value of the selected option in the select element. */
    const handlingValue =
      handleTasksInput.options[handleTasksInput["selectedIndex"]].value;

    if (handlingValue !== "Pending" && handlingValue !== "Completed") {
      TaskList.sortTasks(handlingValue);
    } else {
      TaskList.filterTasks(handlingValue);
    }
  });

  searchTaskInput.addEventListener("input", (event) => {
    TaskList.searchTask(event.target.value);
  });
})();
