const months = Array.from({ length: 12 }).map((_, i) =>
  new Date(0, i).toLocaleString("fr", { month: "long" })
);

export const dateParser = (
  dateStr: string,
  mode: "string" | "date" = "string"
) => {
  const date = new Date(dateStr);

  const day = date.getDate();
  const month = months[(date.getMonth() + 1) % 12];
  const year = date.getFullYear();

  if (mode === "date")
    return `${day.toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${year}`;

  return `${day} ${month} ${year}`;
};
