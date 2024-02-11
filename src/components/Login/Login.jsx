import React, { useState } from 'react';
import { Container, Typography, TextField, Checkbox, FormControlLabel, Button, Divider, Grid } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import google from './google.jpeg';
import face from './face.png';
import mac from './mac.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { useAdminContext } from '../AdminContext';
const Login = () => {
  const[registering,isRegistering]=useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setadmin_email] = useState('');
  const [pass, setPassword] = useState('');
  const[name,setadmin_name]=useState('');
  const[contact,setContact]=useState('');
  const navigate = useNavigate(); // Access the navigate function
  const { setLoggedInAdminId, adminId } = useAdminContext();
  const enableRegister=()=>{
    isRegistering(true);
  }
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
  const registerAdmin= async()=>{
    try {
      const endpoint = (localStorage.getItem('role') === 'admin') ? 'register' : 'user/post';

      const response = await axios.post(`http://localhost:8080/${endpoint}`, {
        email,
        pass,
        name,
        contact,
      });

      console.log("registered successfully" + " " + response.data);
      isRegistering(false);
    } catch (error) {
      console.log("Registration failed");
    }
  }
  const handleLogin = async () => {
    // try {
    //     const response = await axios.get(`http://localhost:8080/login/${admin_name}/${admin_pass}`);
    //     console.log(response.data); // Handle the response data accordingly
    //     setLoggedInAdminId(response.data.id); 
    //     localStorage.setItem('adminId', response.data.id);
    //     console.log(adminId);
    //     navigate('/dashboard');
    // } catch (error) {
    //     console.error("Failed login"); // Handle errors
    // }
    try {
        const response = await axios.post(`http://localhost:8080/login`,{
          role:localStorage.getItem('role') ,
          name,
          pass
        });
        console.log(response.data); // Handle the response data accordingly
        setLoggedInAdminId(response.data.id); 
        const role=localStorage.getItem("role");
        const id= (role=="user")?response.data.user_id:response.data.id;
        (role=="user")?localStorage.setItem("user_name",response.data.user_name):localStorage.setItem("admin_name",response.data.admin_name);
        localStorage.setItem('adminId', id);
        console.log(adminId);
        navigate('/dashboard');
    } catch (error) {
        console.error("Failed login"); // Handle errors
    }
    
};


  return (
    <Container maxWidth="sm" style={{ borderRadius:'90px', marginTop: '40px',marginBottom:'150px' ,backgroundColor: 'white' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" align="center" gutterBottom style={{ marginTop:'15px' }}>
          Login
        </Typography>
        {<TextField
              label="Name"
              fullWidth
              margin="normal"
              style={{ width: '70%' } }
              value={name}
              onChange={(e) => setadmin_name(e.target.value)}
            />
        }
        {registering&&<TextField label="Email" fullWidth margin="normal"  style={{ width: '70%' } } value={email}
          onChange={(e) => setadmin_email(e.target.value)}/>
      }
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          style={{ width: '70%' }}
          type={showPassword ? 'text' : 'admin_pass'}
          InputProps={{
            endAdornment: (
              <Button onClick={handlePasswordVisibility}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </Button>
            ),
          }}
          value={pass}
          onChange={(e) => setPassword(e.target.value)}
        />
       {registering&&
            <TextField
              label="Contact"
              fullWidth
              margin="normal"
              style={{ width: '70%' } }
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
       }
        {!registering&&<Grid container alignItems="center" justify="center" style={{height:'50%'}} spacing={8}>
          <Grid item>
               <FormControlLabel control={<Checkbox />} label="Remember me" />
           </Grid>
          <Grid item >
               <Button color="primary" >Forgot Password?</Button>
            </Grid>
         </Grid>
           }
       <div classadmin_name='buttons' style={{display:'flex' ,padding:'0px',height:'10%',justifyContent:'space-around', width:'55%'}}>
       {!registering&&<Button variant="contained" color="primary" fullWidth style={{ width:'30%',margin: '20px 0' }} onClick={handleLogin}>
          Login
        </Button>}
        
        {!registering?(<Button variant="contained" color="primary" fullWidth style={{ width:'30%',margin: '20px 0' }} onClick={enableRegister}>
         Register
        </Button>):(
           <Button variant="contained" color="primary" fullWidth style={{ width:'80%',margin: '20px 0' }} onClick={registerAdmin}>
             Continue Register
          </Button>
        )
         }
          
        </div>
        <Divider style={{ margin: '0px 0' }} />
        <Typography variant="subtitle1" align="center" style={{ margin: '20px 0' }}>
          OR
        </Typography>
      
        <div style={{ display: 'flex', justifyContent: 'space-around',  width: '200px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden' }}>
            <img src={google} alt="Google Sign In" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden' }}>
            <img src={face} alt="Facebook Sign In" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden' }}>
            <img src={mac} alt="Apple Sign In" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
