import { useNavigate } from "react-router-dom"

export function UpdateButton(){
    const navigate = useNavigate();

    const handleUpdate = () =>{
        navigate("/updateStudent")
    }
    return(
        <div>
            <button className="btn btn-warning" onClick = {handleUpdate} >Update</button>
            
        </div>
    )
}