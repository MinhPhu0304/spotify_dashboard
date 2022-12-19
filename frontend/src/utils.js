import startCase from "lodash/startCase";

export function formatNumber(value) {
  if (typeof value != "number") {
    return 0;
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDurationToMinutes(durationMs) {
  const date = new Date(durationMs);
  return `${date.getMinutes()}:${
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  }`;
}

export function convertAllToStartCases(stringArrays) {
  return stringArrays.map((value) => startCase(value));
}
