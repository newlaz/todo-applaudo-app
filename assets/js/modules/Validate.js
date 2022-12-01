export class Validation {
  static validateData({ _taskDateEnd, _taskName, _taskAssignee }) {
    return (
      _taskName.trim() !== "" &&
      _taskDateEnd !== "" &&
      _taskName.length <= 100 &&
      _taskAssignee !== ""
    );
  }
}
