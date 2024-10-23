import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../../constants";
import { jwtDecode } from "jwt-decode";
// import profile from "../../../assets/team-3.jpg";
function SideNav() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded); // Add this to inspect the decoded token
        setUsername(decoded.username); // Username should now be available
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  });

  return (
    <>
      <div className="side-nav h-screen shadow-2xl  p-6 pr-32">
        <img src={profile} alt="" className="w-96 rounded-full" />
        <h1>{username}</h1>

        <h1>Logout</h1>
      </div>
    </>
  );
}

export default SideNav;
