import { Routes, Route } from "react-router-dom";
import NavBar from "../main/NavBar";
import Dashboard from "../Apps/Dashboard/Dashboard";
import Viewall from "../Apps/Dashboard/ViewAll";
import Viewall2 from "../Apps/Dashboard/ViewAll2";
import DashboardAdmin from "../Apps/Dashboard/DashboardAdmin";
import About from "../Apps/common/about";

const AppsRoutes = () => {
    return (
        <>
            <NavBar>
                <Routes>
                    {/* Rutas para Cliente*/}
                    <Route path="/about" element={<About />} />
                    <Route path="/cliente" element={<Dashboard />} />
                    <Route path="/cliente/:id" element={<Viewall />} />
                    {/* Rutas para Administrador*/}
                    <Route path="/admin" element={<DashboardAdmin />} />
                    <Route path="/admin/:id" element={<Viewall2 />} />
                    {/* Rutas para tienda*/}
                </Routes>
            </NavBar>

        </>
    )
}
export default AppsRoutes