export const generateTimeOptions = () => {
  const times = [];
  for (let hour = 7; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      times.push(time);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

export const calculateEndTime = (startTime: string, duration: number) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const startDate = new Date(0, 0, 0, hours, minutes);
  const endDate = new Date(startDate.getTime() + duration * 60000);
  return `${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`;
};

export const getFilteredTimeOptions = (previousEndTime: string) => {
  if (!previousEndTime) return timeOptions;
  return timeOptions.filter((time) => time >= previousEndTime);
};
