import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let self = this;

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
	this.message = message;
}
InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

// encoder
// [https://gist.github.com/999166] by [https://github.com/nignag]
function btoa(input) {
	var str = String(input);
	for (
		// initialize result and counter
		var block, charCode, idx = 0, map = chars, output = '';
		// if the next str index does not exist:
		//   change the mapping table to "="
		//   check if d has no fractional digits
		str.charAt(idx | 0) || (map = '=', idx % 1);
		// "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
		output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	) {
		charCode = str.charCodeAt(idx += 3 / 4);
		if (charCode > 0xFF) {
			throw new InvalidCharacterError(
				"'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
		}
		block = block << 8 | charCode;
	}
	return output;
}

// decoder
// [https://gist.github.com/1020396] by [https://github.com/atk]
function atob(input) {
	var str = (String(input)).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
	if (str.length % 4 === 1) {
		throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
	}
	for (
		// initialize result and counters
		var bc = 0, bs, buffer, idx = 0, output = '';
		// get next character
		buffer = str.charAt(idx++); // eslint-disable-line no-cond-assign
		// character found in table? initialize bit storage and add its ascii value;
		~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
			// and if not first of each 4 characters,
			// convert the first 8 bits to one ascii character
			bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
	) {
		// try to find character in table (0-63, not found => -1)
		buffer = chars.indexOf(buffer);
	}
	return output;
}

const store = new Vuex.Store({
	state: {
		login: null,
		id: 0,
		authorization: '',
		avatar: '',
		nickname: ''
	},
	getters: {
		authorization: state => {
			if (state.authorization == '') {
				let authorization = uni.getStorageSync('authorization')
				if (authorization) {
					return store.getters.setAuthorization(authorization)
				}
			}
			return state.authorization
		},
		setAuthorization: (state) => (authorization) => {
			if (authorization != null) {
				let payload = decodeURIComponent(escape(atob(authorization.split('.')[1])));
				let info = JSON.parse(payload);
				state.id = info.id;
				state.nickname = info.nickname;
				state.avatar = info.avatar;
				state.login = info.login;
				state.authorization = authorization;
				uni.setStorage({
					key: 'authorization',
					data: authorization,
				});
				return {
					id: info.id,
					login: info.login,
					nickname: info.nickname,
					avatar: info.avatar,
					authorization: authorization
				}
			} else {
				state.login = null;
				state.id = 0;
				state.authorization = '';
				state.nickname = '';
				state.avatar = '';
				uni.removeStorage({
					key: 'authorization'
				});
				return {
					id: state.id,
					login: state.login,
					nickname: state.nickname,
					avatar: state.avatar,
					authorization: state.authorization
				}
			}

		},
		info: (state, getters) => {
			if (state.login == null) {
				let authorization = uni.getStorageSync('authorization')
				if (authorization) {
					getters.setAuthorization(authorization)
				}
			}
			return {
				id: state.id,
				login: state.login,
				nickname: state.nickname,
				avatar: state.avatar,
				authorization: state.authorization
			}
		}

	},
	mutations: {
		login(state, authorization) {
			this.getters.setAuthorization(authorization)
		},
		logout(state) {
			this.getters.setAuthorization(null)
		}
	},
	actions: {

	}
})

export default store
