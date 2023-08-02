import classNames from 'classnames/bind'
import styles from './styles/custom-button.module.css'

const CustomButton = ({ variant, children, ...attributes }) => {
  const cx = classNames.bind(styles)

  let btnClass = 'btn'
  if (variant === 'accent') {
    btnClass = cx('btn', 'accent')
  }
  if (variant === 'secondary') {
    btnClass = cx('btn', 'secondary')
  }

  return (
    <button type='button' {...attributes} className={btnClass}>
      {children}
    </button>
  )
}
export default CustomButton
