export function formatDateToIndonesian(dateStr: string) {
  const date = new Date(dateStr);

  const formatter = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(date);
}
