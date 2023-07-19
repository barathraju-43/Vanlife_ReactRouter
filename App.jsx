import "./server"

import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
  Route 
} from "react-router-dom"
import Layout from './components/Layout'

import Home from "./pages/Home"
import About from "./pages/About"
import Vanslist, { loader as vansListLoader } from './pages/vans/Vanslist';
import VanDetail, { loader as vansDetailLoader } from './pages/vans/VanDetail';
import Dashboard from './pages/host/Dashboard';
import Income from './pages/host/Income';
import Reviews from './pages/host/Reviews';
import HostVans, { loader as hostVansLoader } from './pages/host/HostVans';
import HostVanDetails from './pages/host/HostVanDetails';
import HostLayout from "./components/HostLayout";
import HostVanDetailLayout, { loader as hostVanDetailsLoader } from "./components/HostVanDetailLayout";
import HostVanPhotos from "./pages/host/HostVanPhotos";
import HostVanPricing from "./pages/host/HostVanPricing";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";
import Login, {loader as loginLoader, action as loginAction } from "./pages/Login";
import { requireAuth } from "./utils";
localStorage.removeItem("loggedIn");
const routings = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Layout /> } >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vanslist />} errorElement={<Error />} loader={vansListLoader} />
          <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />
          <Route path="vans/:id" element={<VanDetail />} errorElement={<Error />} loader={vansDetailLoader} />
          <Route path="host" element={<HostLayout />} loader={async ({request}) => await requireAuth(request)} >
            <Route index element={<Dashboard />} loader={async ({request}) => await requireAuth(request)} />
            <Route path="reviews" element={<Reviews />} loader={async ({request}) => await requireAuth(request)} />
            <Route path="income" element={<Income />} loader={async ({request}) => await requireAuth(request)} />
            <Route path="vans" element={<HostVans />} loader={hostVansLoader}/>
            <Route path="vans/:id" element={<HostVanDetailLayout />} loader={hostVanDetailsLoader} >
              <Route index element={<HostVanDetails />} loader={async ({request}) => await requireAuth(request)}/>
              <Route path="photos" element={<HostVanPhotos />} loader={async ({request}) => await requireAuth(request)} />
              <Route path="pricing" element={<HostVanPricing />} loader={async ({request}) => await requireAuth(request)} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
))

function App() {
  return (
    <RouterProvider router={routings} />
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);