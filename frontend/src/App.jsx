import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Singup from "@pages/Singup";
import Singin from "@pages/Singin";
import Home from "@pages/Home";
import NotFoundPage from "@pages/NotFoundPage";
import PageContainer from "@components/PageContainer";
import ContentContainer from "@components/ContentContainer";
import CinePrimeNavbar from "@components/CinePrimeNavbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/cadastro",
    element: <Singup />,
  },
  {
    path: "/login",
    element: <Singin />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      {/* onde entra o conteúdo da página*/}
      <BrowserRouter>
        <PageContainer navbar={<CinePrimeNavbar />}>
          <ContentContainer>
            <Routes>
              <Route
                path="/"
                element={<Home />}
                errorElement={<NotFoundPage />}
              />
              <Route path="/cadastro" element={<Singup />} />
              <Route path="/login" element={<Singin />} />
            </Routes>
          </ContentContainer>
        </PageContainer>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
