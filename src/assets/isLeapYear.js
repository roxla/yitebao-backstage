export default function isLeap(year, mon) {
  let day = ""
  if (mon == "04" || mon == "06" || mon == "09" || mon == "11") {
    day = "30";
  } else if (mon == "02") {
    year = Number(year);
    let cond1 = year % 4 == 0;  //条件1：年份必须要能被4整除
    let cond2 = year % 100 != 0;  //条件2：年份不能是整百数
    let cond3 = year % 400 ==0; //条件3：年份是400的倍数
    if(cond1 && cond2 || cond3){
      day = "29";
    }else{
      day = "28";
    }
  } else {
    day = "31";
  }
  return day;
}
