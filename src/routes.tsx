import { lazy } from 'react'
import { Route, Routes as RRouterRoutes, useLocation } from 'react-router-dom'

import { AnimatePresence } from '@/animations'
import { AppLayout } from '@/templates/app-layout'

import ProposalCreate from './pages/proposal-create'
import ProposalDetails from './pages/proposal-details'

const GroupCreate = lazy(() => import('./pages/group-create'))
const GroupEdit = lazy(() => import('./pages/group-edit'))
const GroupDetails = lazy(() => import('./pages/group-details'))
const Groups = lazy(() => import('./pages/groups'))
const NotFound = lazy(() => import('./pages/not-found'))

export const Routes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <RRouterRoutes location={location} key={location.pathname}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Groups />} />
          <Route path="new" element={<GroupCreate />} />
          <Route path=":groupId">
            <Route path="details" element={<GroupDetails />} />
            <Route path="edit" element={<GroupEdit />} />
            <Route path="proposal/new" element={<ProposalCreate />} />
          </Route>
          <Route path="proposals">
            <Route path=":proposalId/details" element={<ProposalDetails />}></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </RRouterRoutes>
    </AnimatePresence>
  )
}
