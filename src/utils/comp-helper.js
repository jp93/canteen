/*
 * 按照编辑器规范对接组件的helper方法
 */
import utils from '@/utils'
import validator from '@/utils/validator'
import bridge from '@/bridge/h5'

export default {
	getPropValue (store, prop) {
		if (!prop) {
			return null
		}
		
		if (prop.type == 0) {
			return prop.value
		} else if (prop.type == 1) {
			return utils.getAttr(store.state, prop.value)
		} else if (prop.type == 2) {
			return bridge.getStorage(prop.value)
		} else {
			return null
		}
	},

	resetUpdateValue (store, updatedValue, defaultValue) {
		if (utils.isObjectEqual(updatedValue, {})) {
			return
		}

		let stateArr = updatedValue.statePath.split('.')
		const storeName = stateArr[0]
		stateArr.shift()
		const path = stateArr.join('.')
		store.dispatch(storeName + '/setAttr', {
			path: path,
			value: defaultValue
		})
	
	},

	checkAndSetUpdatedValue (store, updatedValue, value) {
		if (utils.isObjectEqual(updatedValue, {})) {
			return
		}

		let vObj = {
			isValid: true,
			errorMsg: ''
		}
		if (typeof updatedValue.validator == 'string') {
			vObj = validator.is(value, updatedValue.validator)
		} else if (typeof updatedValue.validator == 'function') {
			vObj = updatedValue.validator(value)
		}

		if (vObj.isValid) {
			let stateArr = updatedValue.statePath.split('.')
			const storeName = stateArr[0]
			stateArr.shift()
			const path = stateArr.join('.')
			store.dispatch(storeName + '/setAttr', {
				path: path,
				value: value
			})
		}

		return vObj
	},

	checkUpdatedValue (store, updatedValue, prefix = '') {
		let vObj = {
			isValid: true,
			errorMsg: ''
		}
		if (typeof updatedValue.validator == 'string') {
			vObj = validator.is(utils.getAttr(store.state, updatedValue.statePath), updatedValue.validator, prefix)
		} else if (typeof updatedValue.validator == 'function') {
			vObj = updatedValue.validator(utils.getAttr(store.state, updatedValue.statePath), prefix)
		}

		return vObj
	},

	setUpdatedValue (store, updatedValue, value) {
		let stateArr = updatedValue.statePath.split('.')
		const storeName = stateArr[0]
		stateArr.shift()
		const path = stateArr.join('.')
		store.dispatch(storeName + '/setAttr', {
			path: path,
			value: value
		})
	},

	handleDispatch (ctx, action) {
		if (!action || utils.isObjectEqual(action, {})) {
			return
		}
		let options = {}
		for (let i in action.options) {
			const opt = action.options[i]
			let value = null
			if (opt.type == 0) {
				value = opt.value
			} else if (opt.type == 1) {
				value = bridge.getStorage(opt.value)
			} else if (opt.type == 4) {
				value = ctx.$route.query[opt.value]
			} else if (opt.type == 2) {
				value = utils.getAttr(ctx.$store.state, opt.value)
			}
			options[i] = value
		}
		return ctx.$store.dispatch(action.actionPath, options)
	}
}
