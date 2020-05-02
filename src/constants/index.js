
const config = {
  
  development: {
    //BASE_URL: 'http://qyh.th00.cn/fb',
   //BASE_URL: 'http://qyh.th00.cn',
   BASE_URL: '/api',
    LOGIN_URL: 'http://qyh.th00.cn/fb/user/login',
    APPID: 'ww7c636a4c4040cf1e'
  },
  production: {
    BASE_URL: 'http://gxhrqyh.th00.cn',
    LOGIN_URL: 'http://gxhrqyh.th00.cn/fb/user/login',
    APPID: 'ww7c636a4c4040cf1e'
    
  }
}

export default config[process.env.NODE_ENV]