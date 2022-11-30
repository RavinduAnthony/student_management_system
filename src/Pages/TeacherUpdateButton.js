import { useNavigate } from "react-router-dom"

export function TeacherUpdateButton(){
    const navigator = useNavigate()

    const handleUpdate = () =>{
        navigator('/updateTeacher')
    }
    return(
        <button className="btn btn-warning" onClick = {handleUpdate} >Update Teacher</button>
    )
}