//const _base_url = 'http://rr0490.8396048.com/h5';
const _base_url = 'http://www.sz-photography.cn';
let _api_url = '/api/';
//let _h5_url = 'http://rr0490.8396048.com/h5'
let _h5_url = 'http://www.sz-photography.cn/h5'

// #ifndef H5
_api_url = _base_url + _api_url;
// #endif


const api = {
	appid:'wx303b893a86f3e98b',
	base: _api_url,
	h5_url:_h5_url,
	login: {
		login: "login/login", //用户登录验证
		register: "register",
		jssdksign: "jssdksign",
		bind: "bind",
		code2Session: "code2Session",
		user:'user/userinfo'
	}
}

export default api;
