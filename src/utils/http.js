/*
 * @description: 
 * @author: Xly
 * @lastEditors: Xly
 * @Date: 2020-08-31 15:49:05
 * @LastEditTime: 2020-09-03 10:33:20
 * @Copyright: 1.0.0
 */
import axios from 'axios'; // 引入axios
// import Qs from 'qs'; // 引入qs模块，用来序列化post类型的数据
let myAxios = axios.create({})
import VM from '../main'
myAxios.defaults.headers.post['Content-Type'] = 'application/json';

// http request 拦截器
myAxios.interceptors.request.use(async config => {
        /* const token = await getSync("token").then(res=>{
            return res.token
        }) */ 
        console.log()
        if( config.url.search('/login')!=-1||
            config.url.search('/register')!=-1||
            config.url.search('/get_phone_code')!=-1||
            config.url.search('/change_password')!=-1){
                //...
            }else{
                let token = await localStorage.getItem("Token")
                if (token) { // 判断是否存在token，如果存在的话，则T每个http header都加上token
                    config.headers.authorization = decodeURI(token)  //请求头加上token
                }else{
                    console.log('未登录')
                    return await VM.$Modal.confirm({
                        title: '未登录',
                        content: '您还未登录，是否前往登陆页面？',
                        onOk: () => {
                            VM.$router.replace('/login')
                        },
                        onCancel: () => {
                            
                        }
                    });
            }
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// http response 拦截器
myAxios.interceptors.response.use(
    response => {
        //拦截响应，做统一处理 
        console.log(response)
        if (response.data.code) {
            switch (response.data.code) {
                case 2001://注册成功
                    // router.replace({
                    //     path: '/login',
                    //     query: {
                    //             redirect: router.currentRoute.fullPath
                    //         }
                    // });
                    break;
                case 2000://登录成功
                    console.log(response.data)
                    break;
                case 404:
                    VM.$Message['error']({
                        background: true,
                        content: '请求失败，请稍后再试！'
                    });
                    break;
                    case 4040:
                        VM.$Modal.confirm({
                            title: '未登录',
                            content: '您还未登录，是否前往登陆页面？',
                            onOk: () => {
                                VM.$router.replace('/login')
                            },
                            onCancel: () => {
                                
                            }
                        });
                        break;

                }
        }
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        console.log(typeof error)
        console.log(error.toString())
        return Promise.reject(error) // 返回接口返回的错误信息
    }
)

export default function ajax(url,data={},type="GET") {
    //url:请求的路径名，data:传递的参数，type：请求的方式，GET，POST
    return new Promise((resolve, reject) => {
        let promise;
        let Str='';
        if(type.toUpperCase()==='GET'){
            Object.keys(data).forEach(key=>{
                Str += key + "=" + data[key] + "&";
            });
            if(Str!==""){
                Str = Str.substring(0,Str.lastIndexOf("&"));
                url = url+"?"+Str;
            }
            promise = myAxios.get('/vue'+url,{
                withCredentials:true
            });
        }else{
            promise = myAxios.post('/vue'+url,data,{
                withCredentials:true
            });
        }
        promise.then(response=>{
            resolve(response.data)
        })
            .catch(err=>{ 
                reject(err)
            })  
    })
}
