export const addMinutes = (date: Date, minutes: number) => {
  date.setMinutes(date.getMinutes() + minutes);
  return date;
};
export const subMinutes = (date: Date, minutes: number) => {
  date.setMinutes(date.getMinutes() - minutes);
  return date;
};
