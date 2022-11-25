import { Component } from "react";
import Subject from "./Subject";
import ClassRoom from "./ClassRoom";
class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '', lastName: '', conNumber: '', email: ''
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        console.log("First Name: ", this.state.firstName)
        console.log("Last Name: ", this.state.lastName)
        if (this.state.firstName.length === 0 || this.state.lastName.length === 0 || this.state.conNumber.length === 0 || this.state.email.length === 0) {
            alert("Please provide all Details!!")
        } else {
            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    teacherFirstName: this.state.firstName,
                    teacherLastName: this.state.lastName,
                    contactNo: this.state.conNumber,
                    email: this.state.email,
                })
            }
            try {
                fetch("https://localhost:44393/Teacher/InsertTeacher", requestOptions)
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
                <div className="form" >
                    <h5>Teacher</h5>
                    <form onSubmit={this.handleSubmit} >
                        <div className="formFields" >
                            <div class="mb-3">
                                <label class="form-label">First Name</label>
                                <input type="text" class="form-control" id="firstName"
                                    value={this.state.firstName} onChange={e => this.setState({ firstName: e.target.value })} />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="lastName"
                                    value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value })} />
                            </div>
                        </div>
                        <div className="formFields" >
                            <div class="mb-3">
                                <label class="form-label">Contact Number</label>
                                <input type="text" class="form-control" id="contactNumber"
                                    value={this.state.conNumber} onChange={e => this.setState({ conNumber: e.target.value })} />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email Address</label>
                                <input type="email" class="form-control" id="email"
                                    value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                            </div>
                        </div>
                        <div class="mb-3" >
                            <button type="submit" class="btn btn-primary">Save Teacher</button>
                        </div>
                    </form>
                    <div className="formFields" >
                        <Subject />
                        <ClassRoom />
                    </div>
                </div>

            </div>

        )
    }
}

export default Teacher