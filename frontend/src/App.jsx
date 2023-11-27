import React from "react";

import {
  Routes,
  Route
} from "react-router-dom";

import PageContainer from "@components/PageContainer";
import ContentContainer from "@components/ContentContainer";
import CinePrimeNavbar from "@components/CinePrimeNavbar";
import { AuthContextProvider } from "./contexts/AuthContext";

import EmployeeList from "@pages/Employee/EmployeeList";
import EmployeeAddOrEdit from "@pages/Employee/EmployeeAddOrEdit";

import RoomView from "@pages/Rooms/RoomView";

import Singup from "@pages/User/Singup";
import Singin from "@pages/User/Singin";

import MovieView from "./pages/Movie/MovieView";
import MovieList from "./pages/Movie/MovieList";

import NotFoundPage from "@pages/NotFoundPage";
import Home from "@pages/Home";
import { ProtectedRoute } from "@pages/ProtectedPage";
import MovieAddOrEdit from "./pages/Movie/MovieAddOrEdit";
import RoomList from "./pages/Rooms/RoomList";
import RoomAddOrEdit from "./pages/Rooms/RoomAddOrEdit";
import SessionsList from "./pages/Sessions/SessionsList";
import SessionAddOrEdit from "./pages/Sessions/SessionAddOrEdit";

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
              <Route path="/funcionario" element={<ProtectedRoute type={'admin'} />}
              >
                <Route path="list" element={<EmployeeList />}
                />
                <Route path="editar" element={<EmployeeAddOrEdit />}
                />
                <Route path="cadastrar" element={<EmployeeAddOrEdit />}
                />
              </Route>
              <Route path="/filme" element={<ProtectedRoute type={'employee'} />}
              >
                <Route path="list" element={<MovieList />}
                />
                <Route path="editar" element={<MovieAddOrEdit />}
                />
                <Route path="cadastrar" element={<MovieAddOrEdit />}
                />
                <Route path=":id" element={<MovieView />}
                />
              </Route>
              <Route path="/sala" element={<ProtectedRoute type={'employee'} />}
              >
                <Route path="list" element={<RoomList />}
                />
                <Route path="editar" element={<RoomAddOrEdit />}
                />
                <Route path="cadastrar" element={<RoomAddOrEdit />}
                />
                <Route path=":id" element={<RoomView />}
                />
              </Route>
              <Route path="/sessoes" element={<ProtectedRoute type={'employee'} />}
              >
                <Route path="list" element={<SessionsList />}
                />
                <Route path="cadastrar" element={<SessionAddOrEdit />}
                />
                <Route path="editar" element={<SessionAddOrEdit />}
                />
              </Route>
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
