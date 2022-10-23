import React, {useState, useEffect} from 'react'
import "./Navbar.css";

function Navbar() {

    const [show,handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100){
            handleShow(true);
            }else{
                 handleShow(false)
            }
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    return (
        <div className={`nav ${show && "nav_black"}`}>
            {/* flexbox */}
           <img 
           className="nav_logo"
           src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png" 
           alt="Neflix Logo"

            /> 
            <img className="nav_avatar"
            src="https://previews.123rf.com/images/rachwal/rachwal0710/rachwal071000048/2005848-yellow-gift-box-with-big-smile-and-red-cap-.jpg" 
            alt="Avatar" 
             />
        </div>
    )
}

export default Navbar
