import { Component } from "react";
import { ClassUpdateButton } from "./ClassUpdateButton";

class ClassRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            className: ''
        }

    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.className.length === 0) {
            alert("Please provide Class Name!!")
        }else if(this.state.className.length > 5){
            alert("Please provide valid Details!!")
        } 
        else {
            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    classRoomName: this.state.className
                })
            }
            try {
                fetch("https://localhost:44393/ClassRoom/InsertClassRoom", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Saved: ", data)
                    })
            } catch (error) {
                console.log(error)
            }
            alert("Class Room saved!!")
            window.location.reload()
        }

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <div className="mb-3">
                        {/* <label className="form-label">Classroom Name</label> */}
                        <h5>Class Room</h5>
                        <input type="text" class="form-control" id="classroomName"
                            value={this.state.className} onChange={e => this.setState({ className: e.target.value })} />
                    </div>
                    <div className="mb-3" >
                        <button type="submit" className="btn btn-primary">Save Class</button>
                    </div>

                </form>
                <ClassUpdateButton/>
            </div>
        )
    }
}

export default ClassRoom