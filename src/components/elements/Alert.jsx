import classNames from 'classnames/bind'
import { useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import styles from './styles/alert.module.css'

const Alert = ({ variant, children, alertOpen }) => {
  const cx = classNames.bind(styles)
  const [displayAlert, setDisplayAlert] = useState(alertOpen)
  let alertClass
  if (variant === 'error') {
    alertClass = cx('error-wrapper')
  }

  console.log(displayAlert)
  if (displayAlert) {
    return (
      <div className={alertClass}>
        <div className={cx('icon-container')}>
          <FiAlertCircle className={styles.icon} />
        </div>

        <div className={cx('notification')}>
          <h2>Error</h2>
          <div>{children}</div>
        </div>
        <button onClick={() => setDisplayAlert(false)}> Close</button>
      </div>
    )
  } else return null
}
export default Alert
