export default function talkTime(time) {
  let getTime = time.split(" ");
  let showTime = ""
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  if (month < 10) {
    month = '0' + month;
  };
  if (date < 10) {
    date = '0' + date;
  };
  let defTime = year + "-" + month + "-" + date;
  if (getTime[0] == defTime) {
    showTime = getTime[1].split(":")[0] + ":" + getTime[1].split(":")[1];
  } else {
    showTime = getTime[0].split("-")[0].slice(2) + "/" + getTime[0].split("-")[1] + "/" + getTime[0].split("-")[2];
  }
  return showTime;
}