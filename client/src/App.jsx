import './App.css';
import { Container, AppBar, Toolbar, Typography, Box, Button, ThemeProvider } from '@mui/material';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tutorials from './pages/Tutorials';
import AddTutorial from './pages/AddTutorial';
import EditTutorial from './pages/EditTutorial';
import Register from './pages/Register';
import Login from './pages/Login';
import { useState, useEffect } from 'react';
import http from './http';
import UserContext from './contexts/UserContext';


function App() {
  const [user, setUser] = useState(null);
  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get('/user/auth').then((res) => {
        setUser(res.data.user);
      });
    }
  }, []);

 
  return (
    <UserContext.Provider value={{ user, setUser }}>
    <Router >
      <AppBar position="static" className="AppBar">
        <Container >
          <Toolbar disableGutters={true} >
            <Link to="/">
              <Typography variant="h6" component="div">
              <img src="src/images/redSgLogo.png" height="100px" width="150px" />
              </Typography>
            </Link>
            <Link to="/tutorials" ><Typography fontFamily="Montserrat">Tutorials</Typography></Link>
            <Link to="/" ><Typography fontFamily="Montserrat">Find A Car <span id="carIndicator" > <i class="fa-solid fa-circle"></i></span></Typography></Link>
            <Link to="/" ><Typography fontFamily="Montserrat">Our Cars</Typography></Link>
            <Link to="/" ><Typography fontFamily="Montserrat">Contact Us</Typography></Link>
            <Box sx={{ flexGrow: 1}} ></Box>


            {!user && (
              <>
                <Link to="/register" ><Typography fontFamily="Montserrat">Register</Typography></Link>
                <Link to="/login" ><Typography fontFamily="Montserrat">Login</Typography></Link>
              </>
            )}
            {user && (
              <>
                <Typography>{user.name}</Typography>
                <Button onClick={logout} >Logout</Button>
              </>
            )
            }

          </Toolbar>
        </Container>
      </AppBar>

      <Container>
        <Routes>
          <Route path={"/"} element={<Tutorials />} />
          <Route path={"/tutorials"} element={<Tutorials />} />
          <Route path={"/addtutorial"} element={<AddTutorial />} />
          <Route path={"/edittutorial/:id"} element={<EditTutorial />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </Container>
    </Router>
    </UserContext.Provider>

    
  );
}



export default App;
