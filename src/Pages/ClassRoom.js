import { Component } from "react";

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
        } else {
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
        }

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <div className="mb-3">
                        {/* <label className="form-label">Classroom Name</label> */}
                        <h5>Class Name</h5>
                        <input type="text" class="form-control" id="classroomName"
                            value={this.state.className} onChange={e => this.setState({ className: e.target.value })} />
                    </div>
                    <div className="mb-3" >
                        <button type="submit" className="btn btn-primary">Save Class</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default ClassRoom