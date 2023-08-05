import { Link } from 'react-router-dom'
import styles from './styles/footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link>Blog</Link>
      <Link>Contact</Link>
      <Link>About</Link>
    </footer>
  )
}
export default Footer
