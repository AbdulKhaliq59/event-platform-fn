
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="content flex-grow">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
