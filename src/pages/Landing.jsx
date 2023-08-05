import { Link as RouterLink } from 'react-router-dom'
import styles from './landing.module.css'
const Landing = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <h1>Boosting Productivity & Preventing Re-Work</h1>
        <RouterLink className={styles.link}>
          See What We Have To Offer! ➡
        </RouterLink>
      </div>
    </div>
  )
}

export default Landing
