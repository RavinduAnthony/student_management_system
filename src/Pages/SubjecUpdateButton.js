import { useNavigate } from "react-router-dom"

export function SubjectUpdateButton(){

    const navigator = useNavigate()

    const handleUpdate = () =>{
        navigator('/updateSubject')
    }
    return(
        <button className="btn btn-warning" onClick = {handleUpdate} >Update Subject</button>
    )
}