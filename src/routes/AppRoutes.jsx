import { lazy } from "react";
import { Routes, Route } from "react-router";

// Main Pages

const HomePage = lazy(() => import("../pages/Home/Home.jsx"));
const LiveTv = lazy(() => import("../pages/LiveTV/LiveTv.jsx"));

const AppRoutes = () => {
  return (
    // <React.Suspense
    //   fallback={
    //     <Modal>
    //       <Loader />
    //     </Modal>
    //   }
    // >
    <Routes>
      <Route path="/" element={<HomePage />} exact />
      <Route path="/live" element={<LiveTv />} exact />

      {/* Unknown Routes */}

      {/* <Route path="*" element={<PageNotFoundEl />} /> */}
    </Routes>
    // </React.Suspense>
  );
};

export default AppRoutes;
