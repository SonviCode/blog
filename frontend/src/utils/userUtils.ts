export const handleDate = (date: Date) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
};
