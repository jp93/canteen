/*
 * vue的h5适配器
 * 所有跨平台的适配器的函数定义一致，内部实现适配各个平台
 * @author aloysiousliang@gmail.com
 * @data   2019.02.22
 */
import Fly from 'flyio/dist/npm/fly'
import util from '@/utils/index'
import APIS from "@/apis"
import CONST from "@/constants"
const Request = new Fly()
Request.config.timeout = 50000
// 配置请求根域名
Request.config.baseURL = APIS.BASE_URL
function configHeader(request) {
  const sid = getStorage('sid')

  if (sid) {
    request.headers['sid'] = sid
  }
  // request.headers['Authorization'] = CONSTS.ACCESS_TOKEN
  // request.headers['x-canary'] = ' SMOOTHNESS'
  // request.headers['x-client-tag'] = CONSTS.version
  return request;
}
// 请求拦截器，如果没有token，先登录请求，再继续调用
function reqInterceptor(request) {
  const sid = getStorage('sid')
  if (sid) {
    request.headers['sid'] = sid
  }

  return configHeader(request)
}
Request.interceptors.request.use(reqInterceptor)

//相应处理fun
function responseInterceptor(response) {
  const d = response.data
  if (d.code === '0000') {
    return d
  } else if (d.code ==='0001') {
    // 未登录时，调用login流程登录后，再次调用业务接口
      console.log('登录失效')
      removeStorage('sid')
      hideLoading()
      setStorage('redirectUrl', window.location.href)
      window.location.href = CONST['LOGIN_URL'] + `?redirect_url=${window.location.href}`

   
  }else if(d.code === '0004'){
   
    return Promise.reject(d)
  }
  else{
    toast(d.message)
    return Promise.reject(d)
  }
}

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
Request.interceptors.response.use(responseInterceptor, err => err.response.data)
// 存储数据
const setStorage = (key, value) => {
  let keyArr = key.split('.')
  key = keyArr[0]
  let obj = {}
  if (keyArr.length <= 1) {
    obj = value
  } else {
    keyArr.shift()
    util.setAttr(obj, keyArr.join('.'), value)
  }

  //wx.setStorageSync(key, obj)
  if (util.isObject(obj)) {
    obj = JSON.stringify(obj)
  }
  window.localStorage.setItem(key, obj)
}

// 获取数据
const getStorage = (key) => {
  const keyArr = key.split('.')
  key = keyArr[0]
  //let v = wx.getStorageSync(key)
  let v = window.localStorage.getItem(key)

  if (v == '' || v == undefined) {
    return v
  }

  if (keyArr.length <= 1) {
    return v
  } else {
    keyArr.shift()
    let newKey = keyArr.join('.')
    try {
      v = JSON.parse(v)
    } finally {
      return util.getAttr(v, newKey)
    }
  }
}

const removeStorage = (key) => {
  //wx.removeStorageSync(key)
  window.localStorage.removeItem(key)
}

const toast = (message, duration) => {
  setTimeout(() => {
    window._vue.toast = window._vue.$createToast({
      txt: message,
      type: 'txt',
      time: duration
    })
    window._vue.toast.show()
  }, 0)
}

const showLoading = (message) => {
  setTimeout(() => {
    window._vue.toast = window._vue.$createToast({
      time: 0,
      txt: message || '加载中...'
    })
    window._vue.toast.show()
  }, 0)
}

const hideLoading = () => {
  setTimeout(() => {
    window._vue.toast.hide()
  }, 0)
}

const showModal = (message, confirmText, cb, isShowCancel) => {
  setTimeout(() => {
    window._vue.$vux.confirm.show({
      title: '提示', //提示的标题,
      content: message, //提示的内容,
      confirmText: confirmText,
      onConfirm: () => {
        if (cb && typeof cb == 'function') {
          cb()
        }

      },
      showCancelButton: isShowCancel
    })
  }, 0)
}


// 内部登录逻辑
const doAppLogin = (data, cb) => {
  //Request.post(APIS.BACKEND_DOMAIN + APIS.LOGIN, data)

  Request.get(CONST['LOGIN_URL'], data)
    .then(res => {
      var d = res.data
      if (d.sid) {
        setStorage('sid', d.sid)
        //setStorage('userId', d.userId)
        typeof cb == "function" && cb.call()
      } else {
        toast('登录失败！')
      }
    })
    .catch(rej => {
      toast('登录失败！'+rej)

    })
}
const initWxConfig = async () => {
  const url = location.href.split("#")[0]
  let result = await Request.post(APIS.GET_JSSDK_CONFIG,{url:encodeURIComponent(url)})
    .then(res => res.data.config)
    .catch(e => console.log('获取注入权限配置参数失败', e))
    console.log('参数',result)
  let { appId,timestamp, nonceStr, signature } = result
  wx.config({
    beta: true,
    debug: false,
    //debug: process.env.NODE_ENV !== 'production', 
    appId,
    timestamp,
    nonceStr,
    signature,
    jsApiList: [
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getLocation',
      'scanQRCode',
      'previewFile',
      'startRecord',
      'stopRecord',
      'uploadVoice',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'getBrandWCPayRequest',
      'downloadVoice'
    ]
  })
  wx.error(res => {
    console.log("调用微信jsapi返回的状态:" + res.errMsg)
  })
}


export default {
  initWxConfig,
  Request,
  doAppLogin,
  showLoading,
  hideLoading,
  getStorage,
  setStorage,
  removeStorage,
  toast,
  showModal

}
