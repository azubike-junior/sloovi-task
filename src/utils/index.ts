export const baseUrl: string = `https://stage.api.sloovi.com`;

export const convertTimeToSeconds = (time: string) => {
  const [hours, minutes] = time.split(":");
  const totalSeconds = +hours * 60 * 60 + +minutes * 60;
  return totalSeconds;
};

export const convertTimeZoneSeconds = (dt: string) => {
  const [year, month, day] = dt.split("-");

  const newDate = new Date(Number(year), Number(month), Number(day));
  return -newDate.getTimezoneOffset() * 60;
};

export const company_id = `company_413ef22b6237417fb1fba7917f0f69e7`

export const convertSecondsToTimeFormat = (seconds: number) => {
 // Some arbitrary value
  var date = new Date(seconds * 1000); // multiply by 1000 because Date() requires miliseconds
  return date.toTimeString().split(" ")[0];
}
