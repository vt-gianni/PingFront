const months = Array.from({ length: 12 }).map((_, i) =>
  new Date(0, i).toLocaleString("fr", { month: "long" })
);

export const dateParser = (
  dateStr: string,
  mode: "string" | "date" | "datetime" = "string"
) => {
  const date = new Date(dateStr);

  const day = date.getUTCDate();
  const month = months[(date.getUTCMonth() + 1) % 12];
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  if (mode === "date")
    return `${day.toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${year}`;

  if (mode === "datetime")
    return `${day} ${month} ${year} à ${hours
      .toString()
      .padStart(2, "0")}h${minutes.toString().padStart(2, "0")}`;

  return `${day} ${month} ${year}`;
};
