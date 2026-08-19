import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./telas/home";
import Relatorios from "./telas/relatorios";
import Login from "./telas/login";
import PrivateRoute from "./hooks/rotasPrivadas";
import Passageiros from "./telas/funcionarios";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/funcionarios" element={<Passageiros />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
