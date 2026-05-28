import { BrowserRouter, Routes, Route } from "react-router-dom";

import CompanyVerification from "../pages/CompanyVerification";
import Registration from "../pages/Registration";
import OtpVerification from "../pages/OtpVerification";
import FinalRegistration from "../pages/FinalRegistration";
import WelcomeComponent from "../pages/WelcomeComponent";
import PrivateRoute from "../context/AuthContext";
import { ROUTES } from "./url-constant";

const AppRoutes = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path={ROUTES.HOME} element={<CompanyVerification />} />
                <Route path={ROUTES.REGISTER} element={<Registration />} />
                <Route element={<PrivateRoute />}>
                    <Route path={ROUTES.WELCOME} element={<WelcomeComponent />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;