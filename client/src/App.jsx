import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {
  Home,
  Login,
  AdminDash,
  BecomeBeneficiary,
  Donations,
  DonationDetails,
  Payment,
  Profile,
  About,
  Contact,
  PageNotFound,
  Navbar,
  Register,
} from "./components";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/BecomeBeneficiary",
          element: <BecomeBeneficiary />
        },
        {
          path: "/Donations",
          element: <Donations />
        },
        {
          path: "/DonationDetails/:id",
          element: <DonationDetails />
        },
        {
          path: "/Payment/:id",
          element: <Payment />
        },
        {
          path: "/Profile",
          element: <Profile />
        },
        {
          path: "/About",
          element: <About />
        },
        {
          path: "/Contact",
          element: <Contact />
        },
      ],
      errorElement: <PageNotFound />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: "/AdminDash/*",
      element: <AdminDash />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;