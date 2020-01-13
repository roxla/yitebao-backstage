import $axios from 'axios';
import qs from 'qs';

let HTTP = 'http://192.168.1.101:1127/'
// let HTTP = 'http://192.168.1.103:1127/'
// let HTTP = 'http://ytb.fryxy.cn/testDev'

// JSON格式
export async function originData(port, obj) {
  let url = port
  return $axios.post(url, JSON.stringify(obj), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'token': sessionStorage.getItem('token')
    }
  })
}

// 不带token
export async function postData(port, obj) {
  let url = HTTP + port
  if (!!qs.stringify(obj)) {
    return $axios.post(url, qs.stringify(obj), {
      emulateJSON: true
    }, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
}

// 带token
export async function upData(port, obj, pages) {
  let url = HTTP + port
  let header = {
    'token': sessionStorage.getItem('token')
  };
  if (!!pages) {
    header = {
      'token': sessionStorage.getItem('token'),
      'pageNum': pages.pageNum,
      'pageSize': pages.pageSize
    }
  }
  if (!!obj && JSON.stringify(obj) != "{}") {
    return $axios.post(url, qs.stringify(obj), {
      headers: header
    })
  } else {
    let data = {};
    return $axios.post(url, data, {
      headers: header
    })
  };
}

// 本地测试用
export async function testData(port, obj) {
  let url = port
  if (!!obj && JSON.stringify(obj) != "{}") {
    return $axios.post(url, qs.stringify(obj), {
      headers: {
        'token': sessionStorage.getItem('token')
      }
    })
  } else {
    let data = {};
    return $axios.post(url, data, {
      headers: {
        'token': sessionStorage.getItem('token')
      }
    })
  };
}

export async function specialData(port, obj) {
  let Data = qs.stringify(obj);
  let url = HTTP + port;
  return $axios.post(url, Data, {
    headers: {
      'token': sessionStorage.getItem('token')
    }
  });
}
