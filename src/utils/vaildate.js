// 正则
export const valiPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/

// 验证密码
export function validPassword(value) {
  return valiPassword.test(value)
}