export class Storage {
  /**
   * It gets the tasks from local storage and returns them as an array.
   * @returns An array of tasks.
   */
  static getItems() {
    const tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasksArray;
  }

  /**
   * This function takes an array and an object as arguments,
   * pushes the object into the array, and
   * then stores the array in local storage.
   *
   * @param tasksArray - The array of tasks that you want to add the new task to.
   * @param taskObj - The object that you want to add to the array.
   */
  static setItems(tasksArray, taskObj = {}) {
    const tasksToSave =
      Object.keys(taskObj).length === 0
        ? [...tasksArray]
        : [...tasksArray, taskObj];

    localStorage.setItem("tasks", JSON.stringify(tasksToSave));
  }

  /**
   * It takes an array and an index, and returns a new array with the item at the index removed.
   * @param tasksArray - The array of tasks that you want to delete from.
   * @param taskIndex - The index of the task to be deleted.
   * @returns The splice method returns an array containing the deleted elements. If only one element
   * is removed, an array of one element is returned. If no elements are removed, an empty array is
   * returned.
   */
  static deleteItem(taskElement) {
    const tasksArray = this.getItems();
    const taskIndex = tasksArray.findIndex(
      (taskItem) => taskItem.taskId === parseInt(taskElement.dataset.id)
    );

    tasksArray.splice(taskIndex, 41);
    this.setItems(tasksArray);
  }
}
