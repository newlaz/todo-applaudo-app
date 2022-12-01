export class Dates {
  static todayDate() {
    const dateConfig = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const date = new Date();
    return date.toLocaleDateString([], dateConfig);
  }

  static formatDateToString(dateUnformatted) {
    const dateFormatted = new Date(
      typeof dateUnformatted === "number"
        ? dateUnformatted
        : dateUnformatted.replaceAll("-", "/")
    );

    let dd = new Date(dateFormatted).getDate();
    let mm = new Date(dateFormatted).getMonth() + 1;
    let yy = new Date(dateFormatted).getFullYear();

    dd < 10 ? (dd = `0${dd}`) : dd;
    mm < 10 ? (mm = `0${mm}`) : mm;
    yy < 10 ? (yy = `0${yy}`) : yy;

    return `${yy}-${mm}-${dd}`;
  }

  static formatStorageDate(dateUnformatted = "0000-00-00") {
    const dateFormatted = new Date(dateUnformatted.replaceAll("-", "/"));

    // We must declare the hour to get a more precise date result
    const hourOfDay = 12;

    return Date.UTC(
      dateFormatted.getFullYear(),
      dateFormatted.getMonth(),
      dateFormatted.getDate(),
      hourOfDay
    );
  }
}
