import { Button, Container } from '@mui/material';
import { Link,useNavigate } from 'react-router-dom';

function Dashboard(){
    const navigate=useNavigate();
    const handleLogout=()=>{
        navigate("/");
    }
    return(
        <>
        <div>
            <Link to="/dashboard/studentpage"><h1>Go to Student list</h1></Link>
            <button type="button" style={{backgroundColor:"red",fontSize:"20px",fontWeight:"bold",borderWidth:"2px",borderColor:"red",borderStyle:"solid",color:"white",}} onClick={handleLogout}>Logout</button>
        </div>
        </>
    )
}
export default Dashboard;