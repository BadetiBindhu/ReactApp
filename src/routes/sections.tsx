

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from 'src/pages/LoginPage';
import Dashboard from 'src/pages/Dashboard';
import StudentPage from 'src/pages/StudentPage';
import StudentForm from 'src/pages/StudentForm';
import ViewStudentForm from 'src/pages/ViewStudentForm';
import EditStudentForm from 'src/pages/EditStudentForm';

// ----------------------------------------------------------------------

// export const HomePage = lazy(() => import('src/pages/home'));
// export const BlogPage = lazy(() => import('src/pages/blog'));
// export const UserPage = lazy(() => import('src/pages/user'));
// export const SignInPage = lazy(() => import('src/pages/sign-in'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
// export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function AppRouter() {
  return(
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard/studentpage" element={<StudentPage />} />
        <Route path="/dashboard/studentpage/studentform" element={<StudentForm/>}/>
        <Route path="/dashboard/studentpage/viewstudentform/:id" element={<ViewStudentForm/>}/>
        <Route path="/dashboard/studentpage/editstudentform/:id" element={<EditStudentForm/>}/>
      </Routes>
    </>
  )
  // return useRoutes([
  //   {
  //     element: (
  //       <DashboardLayout>
  //         <Suspense fallback={renderFallback}>
  //           <Outlet />
  //         </Suspense>
  //       </DashboardLayout>
  //     ),
  //     children: [
  //       { element: <HomePage />, index: true },
  //       { path: 'user', element: <UserPage /> },
  //       { path: 'products', element: <ProductsPage /> },
  //       { path: 'blog', element: <BlogPage /> },
  //     ],
  //   },
  //   {
  //     path: 'sign-in',
  //     element: (
  //       <AuthLayout>
  //         <SignInPage />
  //       </AuthLayout>
  //     ),
  //   },
  //   {
  //     path: '404',
  //     element: <Page404 />,
  //   },
  //   {
  //     path: '*',
  //     element: <Navigate to="/404" replace />,
  //   },
  // ]);
}
