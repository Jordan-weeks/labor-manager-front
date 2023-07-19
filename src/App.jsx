import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import CheckAuth from './features/auth/CheckAuth'
import CreateAccount from './features/auth/CreateAccount'
import Login from './features/auth/Login'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import DashHome from './features/dash/DashHome'
import DashLayout from './features/dash/DashLayout'
import DashSettings from './features/dash/DashSettings'
import InvitePage from './features/invites/InvitePage'
import Join from './features/invites/Join'
import EditJob from './features/jobs/EditJob'
import JobOutlook from './features/jobs/JobOutlook'
import JobsHome from './features/jobs/JobsHome.jsx'
import NewJob from './features/jobs/NewJob'
import NewTask from './features/jobs/tasks/NewTask'
import TaskDetail from './features/jobs/tasks/TaskDetail'
import Landing from './pages/Landing'

function App() {
  return (
    <Routes>
      {/* public routes */}

      <Route element={<CheckAuth />}>
        {/* <Route path='/' element={<Layout />}> */}
        <Route index element={<Landing />} />
        <Route path='login' element={<Login />} />
        <Route path='create' element={<CreateAccount />} />
      </Route>

      {/* private routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path='/dash' element={<DashLayout />}>
            <Route index element={<DashHome />} />
            <Route path='settings' element={<DashSettings />} />
          </Route>
          <Route path='/join/:inviteId' element={<Join />} />
          <Route path='/jobs' element={<DashLayout />}>
            <Route index element={<JobsHome />} />
            <Route path='new-job' element={<NewJob />} />

            <Route path=':jobId'>
              <Route index element={<JobOutlook />} />
              <Route path='invite' element={<InvitePage />} />
              <Route path=':new-task' element={<NewTask />} />
              <Route path=':edit-job' element={<EditJob />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
