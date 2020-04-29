function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year,month, day].map(formatNumber).join('-') 
 

}

function getQueryVariable (variable) {
  var query = window.location.search.substring(1)
	var vars = query.split("&")
	for (var i=0; i < vars.length; i++) {
		var pair = vars[i].split("=")
		if (pair[0] == variable) {
			return pair[1]
		}
	}
	return ''
}
function getNowFormatDate() {
	let date = new Date();
	let seperator1 = "-";
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	let currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
  }

function getDates(days, todate) {
    var dateArry = [];
    for (var i = 0; i < days; i++) {
      var dateObj = dateLater(todate, i);
      dateArry.push(dateObj)
    }
    return dateArry;
}

function dateLater(dates, later) {
    let dateObj = {};
    let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    let date = new Date(dates);
    date.setDate(date.getDate() + later);
    let day = date.getDay();
    let yearDate = date.getFullYear();
    let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
    let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    dateObj.time =  yearDate+'-'+ month + '-' + dayFormate;
    dateObj.week = show_day[day];
    return dateObj;
  }

export function getYear (timeStr) {
	let ymd = timeStr.split(' ')[0]
	return ymd.split('-')[0]
}
export function getMonth (timeStr) {
	let ymd = timeStr.split(' ')[0]
	return ymd.split('-')[1]
}
export function getDay (timeStr) {
	let ymd = timeStr.split(' ')[0]
	return ymd.split('-')[2]
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export function debounce(func, delay) {
    let timer
    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
  export function findIndex(ary, fn) {
    if (ary.findIndex) {
      return ary.findIndex(fn)
    }
    /* istanbul ignore next */
    let index = -1
    /* istanbul ignore next */
    ary.some(function (item, i, ary) {
      const ret = fn.call(this, item, i, ary)
      if (ret) {
        index = i
        return ret
      }
    })
    /* istanbul ignore next */
    return index
  }

export function trim (str) {
  return str.replace(/^\s+|\s+$/gm,'')
}
export function  dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bStr = atob(arr[1]);
    let n = bStr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bStr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

export default {
  findIndex,
  debounce,
  formatNumber,
  formatTime,
  formatDate,
  getDates,
  dateLater,
  getYear,
  getNowFormatDate,
	getMonth,
	getDay,
	getQueryVariable,
	trim,
	dataURLtoBlob,
		
	/*
	 * 判断两个对象是否相同
	 */
	isObjectEqual (x, y) {
		var i, l, leftChain, rightChain;

		function compare2Objects(x, y) {
			var p;

			// remember that NaN === NaN returns false
			// and isNaN(undefined) returns true
			if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
				return true;
			}

			// Compare primitives and functions.
			// Check if both arguments link to the same object.
			// Especially useful on the step where we compare prototypes
			if (x === y) {
				return true;
			}

			// Works in case when functions are created in constructor.
			// Comparing dates is a common scenario. Another built-ins?
			// We can even handle functions passed across iframes
			if ((typeof x === 'function' && typeof y === 'function') ||
					(x instanceof Date && y instanceof Date) ||
						(x instanceof RegExp && y instanceof RegExp) ||
							(x instanceof String && y instanceof String) ||
								(x instanceof Number && y instanceof Number)) {
				return x.toString() === y.toString();
			}

			// At last checking prototypes as good as we can
			if (!(x instanceof Object && y instanceof Object)) {
				return false;
			}

			if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
				return false;
			}

			if (x.constructor !== y.constructor) {
				return false;
			}

			if (x.prototype !== y.prototype) {
				return false;
			}

			// Check for infinitive linking loops
			if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
				return false;
			}

			// Quick checking of one object being a subset of another.
			// todo: cache the structure of arguments[0] for performance
			for (p in y) {
				if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
					return false;
				} else if (typeof y[p] !== typeof x[p]) {
					return false;
				}
			}

			for (p in x) {
				if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
					return false;
				} else if (typeof y[p] !== typeof x[p]) {
					return false;
				}

				switch (typeof(x[p])) {
					case 'object':
						case 'function':

					leftChain.push(x);
					rightChain.push(y);

					if (!compare2Objects(x[p], y[p])) {
						return false;
					}

					leftChain.pop();
					rightChain.pop();
					break;

					default:
						if (x[p] !== y[p]) {
						return false;
					}
					break;
				}
			}

			return true;
		}

		if (arguments.length < 1) {
			return true; //Die silently? Don't know how to handle such case, please help...
			// throw "Need two or more arguments to compare";
		}

		for (i = 1, l = arguments.length; i < l; i++) {

			leftChain = []; //Todo: this can be cached
			rightChain = [];

			if (!compare2Objects(arguments[0], arguments[i])) {
				return false;
			}
		}

		return true;
	},

	/*
	 * 通过链式结构获取复杂对象的属性
	 */
	getAttr (object, chain) {
		chain = chain.replace(/\[(\w+)\]/g, '.$1')  // convert indexes to properties
    chain = chain.replace(/^\./, '')            // strip a leading dot
    const a = chain.split('.')
    if (a.length == 1 && a[0] === '') {
			return object
		}
		for (let i = 0, n = a.length; i < n; ++i) {
        let k = a[i];
        if (k in object) {
            object = object[k];
        } else {
            return;
        }
    }
    return object
	},

	isObject (val) {
		return val != null && typeof val === 'object' && Array.isArray(val) === false
	},

	/*
	 * 通过链式结构设置复杂对象的属性
	 */
	setAttr(object, chain, value) {
		chain = chain.replace(/\[(\w+)\]/g, '.$1')  // convert indexes to properties
    chain = chain.replace(/^\./, '')            // strip a leading dot
		let propChain = chain.split('.')
    if (propChain.length === 1) {
			// 深度赋值，对象的引用地址也改变
				if (this.isObject(value)) {
				object[propChain[0]] = Object.assign({}, value)
			} else {
        object[propChain[0]] = value
			}
      return
    }
    let first = propChain.shift()
		let second = propChain[0]
		if (!isNaN(+first)) {
			first = +first
		}
    if (!object[first]) {
			if (!isNaN(second)) {
    		object[first] = []
			} else {
				object[first] = {}
			}
    }
    this.setAttr(object[first], propChain.join('.'), value)
	},

	fixDistanceFormat (dis) {
		if (dis < 100) {
			return '<100米'
		} else if (dis >= 100 && dis < 1000){
			return Math.round(dis) + '米'
		} else {
			return (dis / 1000).toFixed(1) + '公里'
		}
	},

	// 当前时间是否在给定的时间段内
	isInTimeRange (startDate, endDate) {
		//如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    const dateBegin = new Date(startDate.replace(/-/g, "/"))    //将-转化为/，使用new Date
    const dateEnd = new Date(endDate.replace(/-/g, "/"))      //将-转化为/，使用new Date
    const dateNow = new Date()       //获取当前时间

    const beginDiff = dateNow.getTime() - dateBegin.getTime()          //时间差的毫秒数
    const beginDayDiff = Math.floor(beginDiff / (24 * 3600 * 1000))    //计算出相差天数

    const endDiff = dateEnd.getTime() - dateNow.getTime()              //时间差的毫秒数
    const endDayDiff = Math.floor(endDiff / (24 * 3600 * 1000))        //计算出相差天数
    if (endDayDiff < 0) {//已过期
        return 1
    }
    if (beginDayDiff < 0) {//没到开始时间
        return -1
    }
    return 0
	},

	// 对象数组深复制
	objDeepCopy (source) {
    let sourceCopy = source instanceof Array ? [] : {}
    for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? this.objDeepCopy(source[item]) : source[item]
    }
    return sourceCopy
	},

	// 类似于微博的时间显示
	getDateDiff (dateTimeStamp) {
		const minute = 1000 * 60
		const hour = minute * 60
		const day = hour * 24
		const halfamonth = day * 15
		const month = day * 30

		const idata = Date.parse(dateTimeStamp.replace(/-/gi,"/"))  //js函数代码：字符串转换为时间
		const now = new Date().getTime()
		const diffValue = now - idata
		if (diffValue < 0) {

			//若日期不符则弹出窗口告之
			//alert("结束日期不能小于开始日期！");
		}
		const monthC = diffValue / month
		const weekC = diffValue / (7 * day)
		const dayC = diffValue / day
		const hourC = diffValue / hour
		const minC = diffValue / minute
		let result = ''
		if (monthC >= 1) {
			result = parseInt(monthC) + "个月前"
		}
		else if (weekC >= 1) {
			result = parseInt(weekC) + "周前"
		}
		else if (dayC >= 1) {
			result = parseInt(dayC) + "天前"
		}
		else if (hourC >= 1) {
			result = parseInt(hourC) + "小时前"
		}
		else if (minC >= 1) {
			result = parseInt(minC) + "分钟前"
		} else {
			result = "刚刚"
		}
		return result
	},
	/**
	 * 
	 * @param {*} datetimeStr 格式：yyyy-MM-dd hh:mm:ss 
	 */
	parseDate(datetimeStr) {
		if(!datetimeStr) {
			return
		} else {
			// ios上不支持new Date('yyyy-MM-dd hh:mm:ss'),只支持new Date('yyyy/MM/dd hh:mm:ss'),安卓上都支持
			const tmp = datetimeStr.replace(/-/g, '/')
			return new Date(tmp)
		}
		
	},

	hasPrevPage () {
		const pages = getCurrentPages()
		console.log(pages)
		if (pages.length <= 1) {
			return false
		} else {
			return true
		}
	},

	isMobile (value) {
		const reg = /^1[34578]\d{9}$/
		if (!reg.test(value)) {
			return false 
		} else {
			return true
		}
	},
	isUrl (value) {
        if(!value){
            return false
        }
		const reg=/^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/;
		if(!reg.test(value)) {
			return false
		} else {
			return true
		}
	}
	
}
