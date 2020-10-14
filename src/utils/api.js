import ajax from './http'
//请求登录接口
export const requireLogin = (data) =>ajax('/users/login',data,'POST')
//请求注册接口
export const requireRegister = (data) => ajax('/users/register',data,'POST')
//请求手机号接口
export const requirePhoneCode = (data) => ajax('/users/get_phone_code',data,'POST')
//修改密码
export const requireChangePassword = (data) => ajax('/users/change_password',data,'POST')

