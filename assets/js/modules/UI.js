/**
 * Create a method to add a task in the table.
 * Create a method to edit a task in the table.
 * Create a method to remove a task from the table.
 */

import { Storage } from "./Storage.js";
import { Tasks } from "./Tasks.js";
import {
  taskDateInput,
  taskAssigneeSelect,
  taskNameInput,
} from "./Components.js";

export class UI {
  static addTasksToList(taskElements) {
    const tasksList = document.getElementById("tasks-list");
    tasksList.appendChild(taskElements);
  }

  static editTaskFromList(taskId) {
    taskNameInput.value = Tasks.getTaskName(taskId);
    taskDateInput.value = Tasks.getTaskDate(taskId);
    taskAssigneeSelect["selectedIndex"] = Tasks.getTaskAssignee(taskId);
  }

  static deleteTaskFromList(taskElement) {
    taskElement.remove();
  }

  static checkTask(taskCheck) {
    const taskCard = taskCheck.parentElement.parentElement;
    const tasksArray = Storage.getItems();

    const index = tasksArray.findIndex(
      (task) => task._taskId === parseInt(taskCard.dataset.id)
    );

    tasksArray[index]["_isCompleted"] = !tasksArray[index]["_isCompleted"];
    Storage.setItems(tasksArray);
  }

  static setCheck(taskItem) {
    taskItem.setAttribute("checked", "");
  }

  static removeCheck(taskItem) {
    taskItem.removeAttribute("checked");
  }

  static completeTask(taskToComplete) {
    taskToComplete.classList.add("task__completed");
  }

  static uncompleteTask(taskToComplete) {
    taskToComplete.classList.remove("task__completed");
  }
}
