import { Outlet } from 'react-router-dom'
import DashHeader from '../features/dash/DashHeader.jsx'
import Header from './Header'
const LoggedInLayout = () => {
  return (
    <>
      <DashHeader />

      <Outlet />
    </>
  )
}
export default LoggedInLayout
