import { Component } from "react";
import { SubjectUpdateButton } from "./SubjecUpdateButton";

class Subject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subjectName: ''
        }

    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.subjectName.length === 0) {
            alert("Please provide Subject Name!!")
        } else {
            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subjectName: this.state.subjectName
                })
            }
            try {
                fetch("https://localhost:44393/Subject/InsertSubject", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Saved: ", data)
                    })
            } catch (error) {
                console.log(error)
            }
            alert("Subject Saved!!")
            window.location.reload()
        }

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <div class="mb-3">
                        {/* <label class="form-label">Subject Name</label> */}
                        <h5>Subject</h5>
                        <input type="text" class="form-control" id="subjectName"
                            value={this.state.subjectName} onChange={e => this.setState({ subjectName: e.target.value })} />
                    </div>
                    <div class="mb-3" >
                        <button type="submit" class="btn btn-primary">Save Subject</button>
                    </div>

                </form>
                <div>
                    <SubjectUpdateButton/>
                </div>
            </div>
        )
    }
}
export default Subject