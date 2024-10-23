import React from "react";
import CreatePost from "../components/post/CreatePost";
import ListPost from "../components/post/ListPost";
import Header from "../components/Layout/Header";
import SideNav from "../components/Layout/SideNav";
import NotificationCenter from "../components/Layout/NotificationCenter";
import Main from "../components/Layout/Main";
import "../style/Home.css";
function Home() {
  return (
    <>
      {/* <CreatePost /> */}
      <Header className="layout1" />
      <div className="layout mt-16">
        {/* <SideNav className='layout2' /> */}
        <Main className="layout3" />
        <NotificationCenter className="layout4" />
      </div>
      {/* <ListPost/> */}
    </>
  );
}

export default Home;
