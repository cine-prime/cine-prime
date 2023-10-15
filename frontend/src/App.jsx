import React from "react";

import {
  Routes,
  Route
} from "react-router-dom";

import Singup from "@pages/Singup";
import Singin from "@pages/Singin";
import Home from "@pages/Home";
import NotFoundPage from "@pages/NotFoundPage";
import EmployeeList from "@pages/EmployeeList";
import EmployeeAddOrEdit from "@pages/EmployeeAddOrEdit";
import PageContainer from "@components/PageContainer";
import ContentContainer from "@components/ContentContainer";
import CinePrimeNavbar from "@components/CinePrimeNavbar";
import { AuthContextProvider } from "./contexts/AuthContext";


function App() {
  return (
    <React.StrictMode>
      <AuthContextProvider>
        <PageContainer navbar={<CinePrimeNavbar />}>
          <ContentContainer>
            <Routes>
              <Route
                path="/" element={<Home />}
              >
              </Route>
              <Route path="/cadastro" element={<Singup />}

              />
              <Route path="/login" element={<Singin />}
              />
              <Route path="/funcionarios" element={<EmployeeList />}
              />
              <Route path="/funcionario/editar" element={<EmployeeAddOrEdit />}
              />
              <Route path="/funcionario/cadastrar" element={<EmployeeAddOrEdit />}
              />
              <Route path="*" element={<NotFoundPage />}
              />

            </Routes>
          </ContentContainer>
        </PageContainer>
      </AuthContextProvider>
    </React.StrictMode>
  );
}

export default App;
