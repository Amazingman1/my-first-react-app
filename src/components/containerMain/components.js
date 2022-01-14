/* 
  require.text(url, ble, eng)
  @url 文件路径
  @ble [Boolean]
  @eng 读取文件规则
*/
const files = require.context('@/views', true, /\.js$/)
const pathList = []
files.keys().forEach(key => {
  if (key.includes('/index/') || key.includes('/login/')) { return false }
  const splitFiles = key.split('.')
  const path = `/index${splitFiles[1]}`
  const component = files(key).default
  const pathObj = {
    path: path,
    component: component
  }
  pathList.push(pathObj)

})

export default pathList