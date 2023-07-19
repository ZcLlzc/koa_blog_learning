import { ElMessage, ElMessageBox, messageType } from 'element-plus'

// 文字提示
const message = ({ message = '', type = <messageType>'warning' }) => {
  return ElMessage({ message, type })
}

// 文字提示
const messageBox = ({ title = '', message = '', type = <messageType>'warning' }) => {
  return ElMessageBox({ title, message, type })
}

export { message, messageBox }
