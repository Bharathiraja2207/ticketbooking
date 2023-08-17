import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Button from '@mui/material/Button';
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import { Home } from './Home';
import { Seats } from './Seats';
import { AddTheatre } from './AddTheatre';
import { AddMovies } from './AddMovies';
import { Theater, MovieList, MovieDetails, TicketBooked } from './Theater';


// import { useState } from 'react';
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import addNotification from 'react-push-notification'

import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
import CardActions from '@mui/material/CardActions';

export default function App() {

  const [movieList, setMovieList] = useState([])
  const handleClick = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate("/login")
    }, 1500);
    console.log("logout")
  }

  const navigate = useNavigate()
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button onClick={() => navigate("/")} color="inherit">Home</Button>
            <Button onClick={() => navigate("/movies")} color="inherit">Movies</Button>
            <Button onClick={() => navigate("/addmovies")} color="inherit">Add Movies </Button>
            <Button onClick={() => navigate("/add-theatre")} color="inherit">Add Theatre</Button>
            <Button onClick={handleClick} color="inherit">LOGOUT</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<Sendotp />} />
        <Route path="/verify" element={<Verifyotp />} />
        <Route path="/seats" element={<Proudctedroute><Seats /></Proudctedroute>} />
        <Route path="/showtime" element={<Proudctedroute><Theater/></Proudctedroute>} />
        <Route path="/movies" element={<Proudctedroute><MovieList movieList={movieList} setMovieList={setMovieList} /></Proudctedroute>} />
        <Route path="/movies/:id" element={<Proudctedroute><MovieDetails movieList={movieList} /></Proudctedroute>} />
        <Route path="/ticketbooked" element={<Proudctedroute><TicketBooked /></Proudctedroute>} />
        <Route path="/add-theatre" element={<Proudctedroute><AddTheatre /></Proudctedroute>} />
        <Route path="/addmovies" element={<Proudctedroute><AddMovies /></Proudctedroute>} />
      </Routes>

    </div>
  )
}

function Proudctedroute({children}){
  const token=localStorage.getItem('token');
  // const token=false;
  return(
   token? <section>{children}</section>:<Navigate replace to="/"/>
  //  token? <section>{children}</section>:<h1>unautharaied</h1>
  )
}


 function Sendotp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://bookmyshow-backend.vercel.app/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message);
      setTimeout(() => {
        navigate("/verify")
    }, 3000);
      // navigate("/verify")
    } catch (error) {
      console.log(error);
      setMessage('Failed to send OTP');
    }
  };
  return (
    <div className='parrent'>
      <Card  sx={{ maxWidth: 500 }}>
        <CardContent>
      <h1>Reset Password</h1>
      <form onSubmit={handleSendOtp}>
      <div className='child1'>
        <div><label><b>Email:</b></label></div>
        <div><TextField type="email"size="small" label="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div><Button type="submit" size="medium" variant="contained">Send OTP</Button></div>
        </div>
      </form>
      {message && <p>{message}</p>}
      </CardContent>
      </Card>
    </div>
  );
}
 function Verifyotp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setpassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://bookmyshow-backend.vercel.app/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, password }),
      });
      const data = await response.json();
      setMessage(data.message);
      setTimeout(() => {
        navigate("/login")
    }, 3000);
    } catch (error) {
      console.log(error);
      setMessage('Failed to reset password');
    }
  };

  return (
    <div className='parrent'>
      <Card  sx={{ maxWidth: 500 }}>
        <CardContent>
      <form  className='newpassword' onSubmit={handleResetPassword}>
        <b>Reset Password</b>
        <div>
        <TextField type="text"label="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
        <TextField type="text" label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        </div>
        <div>
        <TextField
          type="password"
          label="New Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required />
          </div>
          <div>
        <Button type="submit" size="medium" variant="contained">Reset Password</Button>
        </div>
      </form>
      {message && <p>{message}</p>}
      </CardContent>
      </Card>
    </div>
  );
}





function Login() {
  const navigate = useNavigate();
  const [formstate, setformstate] = useState("success");

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    // validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      console.log("submit");
      const data = await fetch("https://bookmyshow-backend.vercel.app/users/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(values)
      });
      if (data.status === 400) {
        console.log("error");
        setformstate("error");
      } else {
        setformstate("success");
        const result = await data.json();
        console.log("success", result);
        localStorage.setItem("token", result.token);
        navigate("/movies");
      }

    }
  });
  return (
    <div className="login-card">

      <Card sx={{ mx: 2, height: 300 }} className="card">
        <CardContent>
          <form onSubmit={formik.handleSubmit} className='loginform'>
            <h2>LOGIN</h2>
            <div className='loginfield'>
              <TextField
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                label="Username"
                variant="outlined" />
              <TextField
                value={formik.values.password}
                onChange={formik.handleChange}
                label="Password"
                name="password"
                type="password"
                variant="outlined" />

              <CardActions className="btn">
                <Button color={formstate} type='submit' variant="contained">{formstate === "success" ? "submit" : "retry"}</Button>
                <label className="alreadyuser" onClick={() => navigate("/")}>Sign in</label>
                <label className="alreadyuser" onClick={() => navigate("/forget-password")}>
                  Forget Password?
                </label>
              </CardActions>

            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
function Signin() {
  const navigate = useNavigate();
  const [formstate, setformstate] = useState("success");

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: ''
    },
    // validationSchema: formValidationSchema,
    onSubmit: (newdata) => {
      // console.log(values)
      adddata(newdata);
    }
  });

  const adddata = (newdata) => {
    console.log(newdata);

    fetch("https://bookmyshow-backend.vercel.app/users/signup", {
      method: "POST",
      body: JSON.stringify(newdata),
      headers: {
        "content-type": "application/json"
      }
    });
    navigate("/movies");
  };
  return (
    <div className="login-card">
      <Card sx={{ mx: 2, height: 350 }} className="card">
        <form onSubmit={formik.handleSubmit} className='loginform'>
          <h2>SIGNUP</h2>
          <div className='loginfield'>
            <TextField
              placeholder="username"
              name='username'
              value={formik.values.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label="Username"
              variant="outlined" required />
            <TextField
              placeholder="email"
              name='email'
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label="email"
              variant="outlined" required />
            <TextField
              placeholder="firstname"
              value={formik.values.firstname}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label="Firstname"
              name="firstname"
              type="text"
              variant="outlined" required />
            <TextField
              placeholder="lastname"
              value={formik.values.lastname}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label="Lastname"
              name="lastname"
              type="text"
              variant="outlined" required />
            <TextField
              placeholder="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label="Password"
              name="password"
              type="password"
              variant="outlined" required />
            <Button color="success" type='submit' variant="contained">submit</Button>
            <p className="alreadyuser" onClick={() => navigate("/login")} sx={{ fontSize: 7 }}>
              <a>Login</a>
            </p>
          </div>

        </form>
      </Card>
    </div>

  );
}