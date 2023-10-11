import { Suspense, lazy } from "react";
import { NonIndexRouteObject } from "react-router-dom";

interface LabeledRoute extends NonIndexRouteObject {
  /** Name of the route in the navigation bar */
  label?: string;
}

const Loading = () => <div>Loading</div>;

const Home = lazy(() => import("./components/Home"));
const Greeter = lazy(() => import("./components/Greeter"));
const Sidecar = lazy(() => import("./components/Sidecar"));
const ResourceReader = lazy(() => import("./components/ResourceReader"));

const routes: LabeledRoute[] = [
  { path: "/", label: "Home", element: <Home /> },
  { path: "/greeter", label: "Greeter", element: <Greeter /> },
  { path: "/sidecar", label: "Sidecar", element: <Sidecar /> },
  { path: "/resources", label: "Resources", element: <ResourceReader /> },
].map((route) => ({
  ...route,
  element: <Suspense fallback={<Loading />}>{route.element}</Suspense>,
}));

export { routes };
