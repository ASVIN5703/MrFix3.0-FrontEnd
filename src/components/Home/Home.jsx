import "./Home.css"
import png1 from "./ad.jpg"
import png2 from "./user.png"
import React from "react"
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    const adLogin=(role)=>{
        localStorage.setItem('role', role);
        console.log(localStorage.getItem("role"));
        navigate('/adminlogin');
    }
  return (
    <>
     <section class="home">
        <nav>
            <div class="title-container">
                <img src="" alt="Logo"/>
                <h1>Mr Fix</h1>
            </div>
            <div class="menu-links" id="menu-links">
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">News</a></li>
                    <li><a href="">Team</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </div>
        </nav>
        <div class="select_container">
            <div class="select select-a">
                <img src={png1} alt=""/>
                <div class="layer" onClick={()=>adLogin("admin")}><h3>Admin</h3></div>
            </div>
            <div class="select select-u">
                <img src={png2} alt=""/>
                <div class="layer" onClick={()=>adLogin("user")}>
                    <h3>User</h3>
                </div>
            </div>
        </div>
        
    </section>
    </>
  )
}

export default Home