function timePost(result) {
  return `${result.getDate()}/${result.getMonth() + 1}/${result.getFullYear()}`;
}

function getRelativeTime(startDate, endDate) {
  let timeStart = new Date(startDate);
  let timeEnd = new Date(endDate);

  let diffInSeconds = Math.floor(
    (timeEnd.getTime() - timeStart.getTime()) / 1000
  );

  let diffInDays = Math.floor(diffInSeconds / (24 * 60 * 60));
  if (diffInDays < 30) {
    console.log(diffInDays, "day");
    return `Durasi : ${diffInDays} day` + (diffInDays > 1 ? `s` : ``);
  }

  let diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    console.log(diffInMonths, "month");
    return `Durasi : ${diffInMonths} month` + (diffInMonths > 1 ? "s" : "");
  }

  let diffInYears = Math.floor(diffInMonths / 12);
  console.log(diffInYears, "year");
  return `Durasi : ${diffInYears} year` + (diffInYears > 1 ? "s" : "");
}

function changeDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

module.exports = {
  getRelativeTime,
  changeDate,
};
