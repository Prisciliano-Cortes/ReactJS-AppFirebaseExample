import { logOutApp } from "../config/firebase";

const Dashboard = () => {
    const handleLogout = async() => {
        await logOutApp();
    };
    
    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>LogOut</button>
        </>
    );
};

export default Dashboard;
