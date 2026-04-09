// import { createBrowserRouter } from "react-router";
// import { Layout } from "../components/Layout/Layout";
// import { AuthenticatedLayout } from "../components/Layout/AuthenticatedLayout";
// import { AdminLayout } from "../components/Layout/AdminLayout";
// // import your page components...

// export const router = createBrowserRouter([
//   {
//     element: <Layout />,            // wraps everything
//     children: [
//       // PUBLIC routes — anyone can access
//       { path: "/", element: <div>Home</div> },
//       { path: "/login", element: <LoginForm /> },

//       // AUTHENTICATED routes — must be logged in
//       {
//         element: <AuthenticatedLayout />,
//         children: [
//           { path: "/dashboard", element: <Dashboard /> },
//         ],
//       },

//       // ADMIN routes — must have Admin role
//       {
//         element: <AdminLayout />,
//         children: [
//           { path: "/admin", element: <AdminPanel /> },
//         ],
//       },
//     ],
//   },
// ]);
