import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'

import home from './home'


Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
	plugins: debug ? [createLogger()] : [],
	modules: {
		home,
		
	}
})
export default store
