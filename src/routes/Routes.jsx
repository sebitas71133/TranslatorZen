//Main routes

import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import PublicLayout from "../layout/PublicLayout";

import NotFoundPage from "../components/NotFoundPage";
import { AnswersPage } from "../pages/AnswersPage";
import { TranslatorPage } from "../pages/TranslatorPage";

const routes = [
  //RUTAS PUBLICAS
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <TranslatorPage /> },
      { path: "answer", element: <AnswersPage /> },
      //   { path: "login", element: <LoginPage /> },
      //   { path: "loginDemo", element: <LoginDemoPage /> },
    ],
    errorBoundary: <ErrorBoundary />,
  },
  //RUTAS PRIVADA
  // {
  //   path: "/app",
  //   element: <ProtectedLayout />,
  //   children: [
  //     { path: "series", element: <CatalogPage></CatalogPage> },
  //     { path: "series/:slug", element: <SeriesPage></SeriesPage> },
  //     { path: "profile", element: <Account></Account> },
  //   ],
  // },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
    v7_startTransition: true,
  },
});

export default router;
