import { lazy } from "react";
import { Routes, Route } from "react-router";

// Main Pages

const HomePage = lazy(() => import("../pages/Home/Home.jsx"));
const LiveTv = lazy(() => import("../pages/LiveTV/LiveTv.jsx"));
const News = lazy(() => import("../pages/News/News.jsx"));
const Events = lazy(() => import("../pages/Events/Events.jsx"));

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
      <Route path="/news" element={<News />} exact />
      <Route path="/events" element={<Events />} exact />

      {/* Unknown Routes */}

      {/* <Route path="*" element={<PageNotFoundEl />} /> */}
    </Routes>
    // </React.Suspense>
  );
};

export default AppRoutes;
