import { Validation } from "./Validate.js";
import { Storage } from "./Storage.js";
import { UI } from "./UI.js";
import {
  btnAddTask,
  taskAssigneeSelect,
  taskDateInput,
  taskNameInput,
  tasksContainer,
} from "./Components.js";
import { Dates } from "./Dates.js";

export class TaskList {
  /**
   * It takes an array of objects and creates a card for each object.
   * </code>
   * @param tasksArray - An array of objects that contains the data for each task.
   * @returns A document fragment.
   */

  static createTasks(tasksArray) {
    const templateTask = document.getElementById("template-task").content;
    const tempTasksContent = document.createDocumentFragment();

    tasksArray.forEach(
      ({
        _isCompleted,
        _taskAssignee,
        _taskAssigneeId,
        _taskDateCreated,
        _taskDateEnd,
        _taskId,
        _taskName,
      }) => {
        // Setting and identifier to each card created
        templateTask.querySelector(".tasks__card").dataset.id = _taskId;
        templateTask.querySelector(".tasks__name").dataset.name_id = _taskId;
        templateTask.querySelector(".tasks__date").dataset.date_id = _taskId;
        templateTask.querySelector(".tasks__assignee").dataset.assignee_id =
          _taskId;
        templateTask.querySelector(
          ".tasks__assignee"
        ).dataset.assignee_selected = _taskAssigneeId;

        const checkMark = templateTask.querySelector("[data-card-check]");
        _isCompleted ? UI.setCheck(checkMark) : UI.removeCheck(checkMark);

        const taskToComplete = templateTask.querySelector(".tasks__card");
        _isCompleted
          ? UI.completeTask(taskToComplete)
          : UI.uncompleteTask(taskToComplete);

        templateTask.querySelector(".tasks__name").textContent =
          _taskName || taskNameInput.value;

        templateTask.querySelector(".tasks__assignee").textContent =
          _taskAssignee || "No one";

        templateTask.querySelector(".tasks__date").textContent =
          Dates.formatDateToString(_taskDateEnd) ||
          Dates.formatDateToString(taskDateInput.value);

        templateTask.querySelector(".tasks__created_at").textContent =
          Dates.formatDateToString(_taskDateCreated) ||
          Dates.formatDateToString(Date.now());

        templateTask.querySelector(".tasks__id").innerHTML = _taskId;

        /* Cloning the templateTask and appending it to the tasksContainer. */
        const templateClone = templateTask.cloneNode(true);

        tempTasksContent.appendChild(templateClone);
      }
    );

    return tempTasksContent;
  }

  static listTasks(objTask = {}) {
    if (Validation.validateData(objTask)) {
      const tempTasksContent = this.createTasks([objTask]);
      UI.addTasksToList(tempTasksContent);
      Storage.setItems(Storage.getItems(), objTask);

      taskNameInput.value = "";
      taskDateInput.value = "";
      taskAssigneeSelect["selectedIndex"] = 0;
      return;
    }

    alert("Complete the field correctly!");
    btnAddTask.disabled = false;
    return false;
  }

  static readTasks(tasks = Storage.getItems()) {
    UI.addTasksToList(this.createTasks(tasks));
  }

  static deleteTask(taskElement) {
    Storage.deleteItem(taskElement);
    UI.deleteTaskFromList(taskElement);
  }

  static editTask(taskElement) {
    /* Getting the text from the task name and date. */
    const taskId = taskElement.attributes["data-id"].value;
    UI.editTaskFromList(taskId);
    this.deleteTask(taskElement);
  }
  static sortTasks(sortingType) {
    const tasksElements = Storage.getItems();

    const tasksSorted = tasksElements.sort((taskOne, taskTwo) =>
      sortingType === "_taskName" || sortingType === "_taskAssignee"
        ? taskOne[sortingType].localeCompare(taskTwo[sortingType])
        : taskOne[sortingType] - taskTwo[sortingType]
    );

    tasksContainer.innerHTML = "";
    this.readTasks(tasksSorted);
  }

  static searchTask(searchValue) {
    const searchValueFormatted = searchValue.trim().toLowerCase();
    const tasksElements = Storage.getItems();
    const tasksFounded = tasksElements.filter(
      (item) =>
        item["_taskName"].toLowerCase().includes(searchValueFormatted) ||
        Dates.formatDateToString(item["_taskDateEnd"]).includes(
          searchValueFormatted
        ) ||
        item["_taskAssignee"].toLowerCase().includes(searchValueFormatted) ||
        Dates.formatDateToString(item["_taskDateCreated"]).includes(
          searchValueFormatted
        )
    );

    tasksContainer.innerHTML = "";
    this.readTasks(tasksFounded);
  }

  static filterTasks(filterValue) {
    const tasksElements = Storage.getItems();
    const taskFiltered = tasksElements.filter((item) =>
      filterValue === "Completed"
        ? item["_isCompleted"]
        : item["_isCompleted"] === false
    );

    tasksContainer.innerHTML = "";
    this.readTasks(taskFiltered);
  }
}
