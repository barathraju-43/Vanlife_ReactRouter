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
import VanDetail from './pages/vans/VanDetail';
import Dashboard from './pages/host/Dashboard';
import Income from './pages/host/Income';
import Reviews from './pages/host/Reviews';
import HostVans from './pages/host/HostVans';
import HostVanDetails from './pages/host/HostVanDetails';
import HostLayout from "./components/HostLayout";
import HostVanDetailLayout from "./components/HostVanDetailLayout";
import HostVanPhotos from "./pages/host/HostVanPhotos";
import HostVanPricing from "./pages/host/HostVanPricing";
import NotFound from "./pages/NotFound";

const routings = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vanslist />} loader={vansListLoader}/>
          <Route path="vans/:id" element={<VanDetail />} />
          <Route path="host" element={<HostLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="income" element={<Income />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="vans/:id" element={<HostVanDetailLayout />} >
              <Route index element={<HostVanDetails />} />
              <Route path="photos" element={<HostVanPhotos />} />
              <Route path="pricing" element={<HostVanPricing />} />
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