"use client"

import React, { useState } from "react"
import { Link, navigate } from "../Router"
import { useTracker } from "meteor/react-meteor-data"
import { Meteor } from "meteor/meteor"
import { User } from "lucide-react"
import StyledShopName from "../components/StyledShopName";

const MeteorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 640" x="0px" y="0px" className="w-12 h-12 mr-2 text-orange">
    <g fill="currentColor">
      <path d="M32,380A100.113,100.113,0,0,0,132,480h6.507a100.423,100.423,0,0,0,61.964-21.511l107.567-84.922-45.03-5.629a8,8,0,0,1-4.665-13.595L358.917,253.769,313.735,263.81a8,8,0,0,1-8.109-12.645L446.4,65.6,260.835,206.374a8,8,0,0,1-12.645-8.109l10.04-45.182L157.657,253.657a8,8,0,0,1-13.595-4.665l-5.544-44.349L52,320A100.627,100.627,0,0,0,32,380Zm197.657-30.343-11.314-11.314,14.667-14.666,11.314,11.313Zm26.667-26.667L245.01,311.677l45.333-45.334,11.314,11.314Zm82.019-160.647,11.314,11.314-24,24-11.314-11.314ZM302.676,198.01l11.314,11.313-92.333,92.334-11.314-11.314Zm-68.333,12.333,11.314,11.314L219.99,247.323,208.676,236.01ZM197.676,247.01l11.314,11.313-35.333,35.334-11.314-11.314ZM136,296a80,80,0,1,1-80,80A80.091,80.091,0,0,1,136,296Zm0,144a64,64,0,1,0-64-64A64.072,64.072,0,0,0,136,440Zm32-72h16v16H168Zm-24,32h16v16H144Zm33.464-236.613,96-136,13.072,9.226-96,136Zm305.852,54.128,9.368,12.97-16,11.556-9.368-12.971ZM460.684,253.6l-112,80.888-9.368-12.97,112-80.889ZM193.305,19.622l13.39,8.756L191,52.378l-13.391-8.756Zm-136,208,112-171.294,13.39,8.756-112,171.294ZM476.189,328.966l7.622,14.068-120,65-7.622-14.068ZM347.811,416.7l-56,30.333-7.622-14.068,56-30.334ZM341.9,90.5,330.1,79.685l56-61.091L397.9,29.406Zm-21.794.1L331.9,101.406l-22,24L298.1,114.594Zm173.3,35.3-40,36.667-10.812-11.795,40-36.666ZM386.594,202.1l43.636-40L441.043,173.9l-43.637,40Z"/>
    </g>
  </svg>
);

export default function Header({ currentPage = "home" }) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const user = useTracker(() => {
    return Meteor.user()
  })

  const handleLogout = () => {
    Meteor.logout()
    navigate("/")
  }

  return (
    <header className="bg-secondary px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-orange font-serif flex items-center">
          <MeteorIcon />
          <StyledShopName />
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/" label="Home" active={currentPage === "home"} />
          <NavLink to="/shop" label="Shop" active={currentPage === "shop"} />
          <NavLink to="/gallery" label="Gallery" active={currentPage === "gallery"} />
          <NavLink to="/blog" label="Blog" active={currentPage === "blog"} />
          <NavLink to="/faq" label="FAQ" active={currentPage === "faq"} />
          <NavLink to="/about" label="About Us" active={currentPage === "about"} />
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-foreground text-sm font-medium">
                {user.profile?.firstName} {user.profile?.lastName}
              </span>
              <Link
                to="/account"
                className="w-10 h-10 border-2 border-foreground rounded-full flex items-center justify-center bg-primary text-white"
              >
                <User className="w-5 h-5" />
              </Link>
              <button onClick={handleLogout} className="text-foreground hover:text-primary text-sm font-medium">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-dark-green hover:text-primary text-sm font-medium">
                Sign In
              </Link>
              <div className="w-10 h-10 border-2 border-dark-green rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-dark-green" />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`px-6 py-2 rounded-lg transition-all duration-300 ${
        active 
          ? "bg-primary text-white font-medium shadow-md" 
          : "text-foreground hover:bg-primary/10 hover:text-primary"
      }`}
    >
      {label}
    </Link>
  )
}