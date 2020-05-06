
const config = {
  
  development: {
    //BASE_URL: 'http://qyh.th00.cn/fb',
   //BASE_URL: 'http://qyh.th00.cn',
   BASE_URL: '/api',
  
  },
  production: {
 
    
  }
}

export default config[process.env.NODE_ENV]