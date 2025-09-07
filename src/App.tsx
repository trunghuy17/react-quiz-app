import React from 'react';
import { Navigate, Route, Routes } from 'react-router'
import DrawerLayout from './layouts/DrawerLayout';

const Dashboard = React.lazy(() => import('./pages/dashboard'));
const Question = React.lazy(() => import('./pages/question'));
const Leaderboard = React.lazy(() => import('./pages/leaderboard'));
const FinalScore = React.lazy(() => import('./pages/final-score'));

function App() {

  return (
    <>
      <React.Suspense>
        <Routes>
          <Route path="" element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<DrawerLayout><Dashboard /></DrawerLayout>} />
          <Route path="question" element={<DrawerLayout><Question /></DrawerLayout>} />
          <Route path="leaderboard" element={<DrawerLayout><Leaderboard /></DrawerLayout>} />
          <Route path="final-score" element={<DrawerLayout><FinalScore /></DrawerLayout>} />
        </Routes>
      </React.Suspense>
    </>
  )
}

export default App
