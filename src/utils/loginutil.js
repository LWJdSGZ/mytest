import Util from './util'

function getUserFromSession() {
  const userInfo = sessionStorage.getItem('citicUser')
  if (!Util.isNull(userInfo)) {
    return JSON.parse(userInfo)
  }
  return null
}

export default {
  async getUser(baseApi)
  {
    /*const user = getUserFromSession()
   if (!Util.isNull(user)) {
     console.log('getUserId from session:', user)
     return user
   }
   const res = await Http.get(baseApi + '/currentUser.do', {})
   if (res && res.data && !Util.isNull(res.data.userId)) {
     /*sessStorage.setItem('citicUser', JSON.stringify(res.data))
     console.log('getUserId from currentUser.do:', res.data.userId)

    }
    window.location.href = baseApi + '/login.do'*/
    // const user = '{"userName": "王丽薇","userId": "6056f21d-a021-461f-a69f-794600cecd0a","orgId": "b11647e8-0e36-44fd-84fa-262c4fcfbe43","tenantId": null,"tenantName": "中信云测试租户3","email": "wanglw3@citic.com","mobile": "13161089190","roles": "[{\"role_id\":\"2\",\"role_name\":\"运营管理员\"},{\"role_id\":\"3\",\"role_name\":\"租户管理员\"},{\"role_id\":\"5\",\"role_name\":\"代金券审批\"},{\"role_id\":\"4\",\"role_name\":\"普通用户\"}]"}';
    const userToObj = {
      userId: '6056f21d-a021-461f-a69f-794600cecd0a',
      userName: '王丽薇',
      tenantId: 'b11647e8-0e36-44fd-84fa-262c4fcfbe43',
      roles: ''
    };
    return userToObj
  }
  ,
  async
  getUserId(baseApi)
  {
    /*  const user = await this.getUser(baseApi)
  if (!Util.isNull(user)) {
    return user.userId
  }*/
    return '6056f21d-a021-461f-a69f-794600cecd0a'
  }
  ,
  isTenantAdmin(rolesStr)
  {
    // if (Util.isNull(rolesStr)) {
    //   console.log('rolesStr null')
    //   return false;
    // }
    // const roles = JSON.parse(rolesStr)
    // if (roles === null || roles.size === 0) {
    //   console.log('roles null')
    //   return false;
    // }
    // console.log('roles')
    // console.log(roles)
    // for (const index in roles) {
    //   console.log(index)
    //   if (roles[index].role_id === '3') {
    //     return true;
    //   }
    // }
    return true;
  }
}
