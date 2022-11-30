import { useNavigate } from "react-router-dom"

export function ClassUpdateButton(){
    const navigator = useNavigate()
    
    const handleUpdate = () =>{
        navigator('/updateClass')
    }
    return(
        <button className="btn btn-warning" onClick = {handleUpdate} >Update Class</button>
    )
}