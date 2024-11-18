import ReactDOM from 'react-dom/client'
import Loading from './loading'
let count = 0
export const showLoading = () => {
  if (count === 0) {
    const dom = document.createElement('div')
    dom.setAttribute('id', 'loading')
    ReactDOM.createRoot(dom).render(<Loading />)
  }
  count++
}

export const hideLoading = () => {
  count--
  if (count < 0) return
  if (count === 0) {
    const dom = document.getElementById('loading') as HTMLDivElement
    document.removeChild(dom)
  }
}
