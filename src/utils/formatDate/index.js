export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("T")[0].split("-");
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};
