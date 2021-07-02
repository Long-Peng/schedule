const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  userimage: state => state.user.Image,
  username: state => state.user.Username,
  name: state => state.user.Username,
  userID: state => state.user.UserID,
  sex: state => state.user.Sex,
  email: state => state.user.Email,
  password: state => state.user.Password,
  age: state => state.user.Age,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
