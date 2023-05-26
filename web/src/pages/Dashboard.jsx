import React, { useState, useEffect } from "react";
import Passwords from "../components/PasswordsView/PasswordsView";
import Searchbar from "../components/Searchbar/Searchbar";
import SidebarCategories from "../components/Sidebar/Sidebar";
import jpg from "../assets/render.jpg";

const Dashboard = () => {
    // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    //
    // const handleMouseMove = (event) => {
    //     setMousePosition({ x: event.clientX, y: event.clientY });
    // };
    //
    // useEffect(() => {
    //     window.addEventListener("mousemove", handleMouseMove);
    //
    //     return () => {
    //         window.removeEventListener("mousemove", handleMouseMove);
    //     };
    // }, []);
    //
    // const parallaxOffset = 200;
    //
    // const backgroundPositionX = -(mousePosition.x / parallaxOffset);
    // const backgroundPositionY = -(mousePosition.y / parallaxOffset);

    return (
        <div
            className="grid h-screen grid-cols-12 grid-rows-10 grid-flow-col gap-3 p-3 bg-gradient-to-r"
            style={{
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                className="background-container"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transform: "scale(1.1)",
                    background: `url(${jpg})`,
                    backgroundSize: "cover",
                    // backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
                }}
            />
            <SidebarCategories />
            <Searchbar />
        </div>
    );
};

export default Dashboard;
