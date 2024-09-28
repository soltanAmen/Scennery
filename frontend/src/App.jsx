import { Popular } from "./components";
import { Home, SingleMovie } from "./pages";
import Layout from "./pages/Layout";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route index element={<Home />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/movie/:id" element={<SingleMovie />} />
      <Route path="/tv/:id" element={<SingleMovie tv={true} />} />
    </Routes>
  );
};

export default App;
