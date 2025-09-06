import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/pages/home";
import Notes from "./components/pages/notes";
import Wrapper from "./components/common/wrapper";
import Note from "./components/pages/note";
import About from "./components/pages/about";
import AddPost from "./components/pages/add-post";
import Account from "./components/pages/account";
import Login from "./components/pages/Login";
import ProtectedRoute from "./components/common/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/note/:noteId" element={<Note />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-post"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
