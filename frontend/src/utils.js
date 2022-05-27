export function formatNumber(value) {
  if (typeof value != "number") {
    return 0;
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDurationToMinutes(durationMs) {
  const date = new Date(durationMs);
  return `${date.getMinutes()}:${date.getSeconds()}`;
}
