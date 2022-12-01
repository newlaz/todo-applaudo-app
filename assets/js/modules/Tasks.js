import { taskAssigneeSelect } from "./Components.js";

export class Tasks {
  constructor({
    taskAssignee,
    taskAssigneeId,
    taskDateCreated,
    taskDateEnd,
    taskId,
    taskName,
  }) {
    this._taskAssignee = taskAssignee;
    this._taskAssigneeId = taskAssigneeId;
    this._taskDateCreated = taskDateCreated;
    this._taskDateEnd = taskDateEnd;
    this._isCompleted = false;
    this._taskId = taskId;
    this._taskName = taskName;
  }

  static setAssignee(idAssignee) {
    return idAssignee === 0
      ? "No One"
      : taskAssigneeSelect.options[taskAssigneeSelect["selectedIndex"]].value;
  }

  static getTaskAssignee(taskId) {
    const tasksAssignee = Array.from(
      document.querySelectorAll("[data-assignee_id]")
    );

    const [taskAssigneeId] = tasksAssignee.filter((assigneElement) =>
      assigneElement.attributes["data-assignee_id"].value === taskId
        ? assigneElement.attributes["data-assignee_selected"].value
        : null
    );

    return taskAssigneeId.attributes["data-assignee_selected"].value;
  }

  static getTaskDate(taskId) {
    /* Creating an array of all the elements that have the data-date_id attribute. */
    const tasksDates = Array.from(document.querySelectorAll("[data-date_id]"));

    const [taskDateId] = tasksDates.filter((dateElement) =>
      dateElement.attributes["data-date_id"].value === taskId
        ? dateElement.attributes["data-date_id"].value
        : null
    );

    return taskDateId.textContent;
  }

  static getTaskName(taskId) {
    const tasksNames = Array.from(document.querySelectorAll("[data-name_id]"));

    const [taskNameId] = tasksNames.filter((nameElement) =>
      nameElement.attributes["data-name_id"].value === taskId
        ? nameElement.attributes["data-name_id"].value
        : null
    );

    return taskNameId.textContent;
  }
}
