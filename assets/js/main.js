import "./modules/EventHandlers.js";
import { mainDate } from "./modules/Components.js";
import { Dates } from "./modules/Dates.js";

(() => {
  mainDate.textContent = Dates.todayDate();
})();
