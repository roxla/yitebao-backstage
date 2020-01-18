import $time from './setTime'

export default function getAll(begin, end) {
  let arr1 = begin.split("-");
  let arr2 = end.split("-");
  let arr1_ = new Date();
  let arrTime = [];
  arr1_.setUTCFullYear(arr1[0], arr1[1] - 1, arr1[2]);
  let arr2_ = new Date();
  arr2_.setUTCFullYear(arr2[0], arr2[1] - 1, arr2[2]);
  let unixDb = arr1_.getTime();
  let unixDe = arr2_.getTime();
  for (let k = unixDb; k <= unixDe;) {
    arrTime.push($time(k, 'MM-DD'));
    k = k + 24 * 60 * 60 * 1000;
  }
  return arrTime;
}
