import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashSidebar from './DashSidebar'
import styles from './styles/dash-layout.module.css'

const DashLayout = () => {
  return (
    <main className={styles['dash-main']}>
      <DashSidebar />
      <Outlet />
    </main>
  )
}

export default DashLayout
