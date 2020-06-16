export function convertTimeStempToSentence(timeStemp: string) {
  const date = timeStemp.split("T")[0].split("-");
  const time = timeStemp.split("T")[1].split(".")[0].split(":");

  return `${date[0]}년${date[1]}월${date[2]}일 ${time[0]}시${time[1]}분`;
}
