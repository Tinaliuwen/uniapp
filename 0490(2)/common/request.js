/* 
	封装请求接口
 */

// 引入配置文件
import {webUrl} from "./config.js";
import Common from "./common.js";
import lib from "./lib.js"
export default{
	config:{  
		baseUrl: webUrl,
		// baseUrl:"/"
		header:{
			'Content-Type':'application/json;charset=UTF-8',
			'Content-Type':'application/x-www-form-urlencoded',
      'Content-Type':'application/json'
		},
		data: {},
		method: "GET",
		dataType: "json",
		
	},
	
	// 不需要token验证的接口
	urlList: ['user/register_step1','user/register_step2','user/login','user/keywordLogin','api/user/forget_pwd','api/index/index'],
	
	async request(options = {}){
		options.header = options.header || this.config.header;
		options.method = options.method || this.config.method;
		options.dataType = options.dataType || this.config.dataType;
		options.url = this.config.baseUrl + options.url;
    
    lib.NetWork.On();

		// 返回不需要token验证的接口
		const isToken = this.urlList.find(item => options.url.includes(item));
		
		if(!isToken){
      const {token} =  JSON.parse(uni.getStorageSync('vuex')) ;
      options.data.token = token;
      
			// 验证用户是否登录
			if (!this.checkToken(options.data.token)) return;
		}
		
    try{
      const [err,res] = await uni.request(options)
      
      return this.errorCheck(res.data,err) && res.data;
    }catch(e){
      console.log(e)
    }
		
		
	},
	get(url,data={},options={}){
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return this.request(options);
	},
	post(url,data={},options={}){
		options.url = url;		
		options.data = data;
		options.method = 'POST';
		return this.request(options);
	},
	// 错误处理
	errorCheck(res,err=null){
		if (err) {		
			Common.showToast('加载失败')
			return false;
		}
    
		if (res.code == 111 || res.code == 111 || res.code == 220 ) {
			Common.showToast('账号过期，请重新登录')
			const timer = setTimeout(()=>{
				clearTimeout(timer)
				uni.reLaunch({
					url: '/pages/login/Login'
				})
			},1000)
			return false;
		}
    if (res.code != 0) {
    	Common.showToast(res.message)
    	return false;
    }
		return true;
	},
	// 验证用户是否登录
	checkToken(checkToken){
		if (!checkToken) {
			// uni.showToast({ title: '请先登录', icon:"none" })
			Common.showToast('请先登录')
			uni.reLaunch({
				url: '/pages/login/Login'
			})
			return false;
		}
		return true;
	}
	
}