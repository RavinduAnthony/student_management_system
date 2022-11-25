import { Component } from "react";
class StudentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '', lastName: '', contactPerson: '', contactNumber: '',
            email: '', age: '', dob: '', classRoom: ''
        }
    }
    handleClassSelect = () => {

    }
    componentDidMount = () => {

        fetch("https://localhost:44393/ClassRoom/GetAllClassRooms")
            .then(response => response.json())
            .then(data => {
                let clsDropDown = document.getElementById("classDropdown")
                for (let i = 0; i < data.length; i++) {
                    let clsOption = document.createElement("option")
                    clsOption.id = data[i].classRoomId
                    clsOption.value = data[i].classRoomName
                    clsOption.text = data[i].classRoomName
                    clsDropDown.appendChild(clsOption)
                }
            })

        fetch("https://localhost:44393/Student/GetAllStudents")
            .then(response => response.json())
            .then(data => {
                console.log("Students: ", data)
                let tableStd = document.getElementById("stdTable")
                let body = document.createElement("tbody")

                for (let i = 0; i < data.length; i++) {
                    let updtBtn = document.createElement("button")
                    updtBtn.setAttribute("id", "btnUpdate")
                    updtBtn.setAttribute("value", data[i].studentId)
                    updtBtn.setAttribute("data-bs-toggle", "modal")
                    updtBtn.setAttribute("data-bs-target", "#stdModal")
                    updtBtn.classList.add("btnUpdate")
                    updtBtn.textContent = "Update"
                    updtBtn.addEventListener('click', function () {
                        //console.log('Button click:', this.value)
                        let stdId = parseInt(this.value)
                        fetch("https://localhost:44393/Student/GetStudentById?studentId=" + stdId)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                            })

                    })
                    let trow = document.createElement("tr")

                    //FirstName
                    let col1 = document.createElement("td")
                    col1.innerHTML = data[i].firstName
                    trow.appendChild(col1)

                    //LastName
                    let col2 = document.createElement("td")
                    col2.innerHTML = data[i].lastName
                    trow.appendChild(col2)

                    //CPerson
                    let col3 = document.createElement("td")
                    col3.innerHTML = data[i].contactPerson
                    trow.appendChild(col3)

                    //Email
                    let col4 = document.createElement("td")
                    col4.innerHTML = data[i].email
                    trow.appendChild(col4)

                    //Age
                    let col5 = document.createElement("td")
                    col5.innerHTML = data[i].age
                    trow.appendChild(col5)

                    //class
                    let col7 = document.createElement("td")
                    col7.innerHTML = data[i].st_classRoomId
                    trow.appendChild(col7)
                    trow.appendChild(updtBtn)
                    body.appendChild(trow)

                }
                console.log(data)
                tableStd.appendChild(body)
            })
    }
    handleChange = (event) => {
        this.setState({
            firstName: event.target.value,
            lastName: event.target.value,
            contactPerson: event.target.value,
            contactNumber: event.target.value,
            email: event.target.value,
            age: event.target.value,
            dob: event.target.value,

        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        let selectDropDown = document.getElementById("classDropdown")
        let selectedClass = selectDropDown.options[selectDropDown.selectedIndex].id
        console.log("Selcted class:", selectedClass)

        console.log('First Name:', this.state.firstName)
        console.log('Last Name:', this.state.lastName)
        console.log('Contact Person:', this.state.contactPerson)
        console.log('Email:', this.state.email)
        console.log('Age:', this.state.age)
        console.log('ClassRoom:', selectedClass)

        if (this.state.firstName.length === 0 || this.state.lastName.length === 0 || this.state.contactNumber.length === 0 ||
            this.state.contactPerson.length === 0 || this.state.email.length === 0 || this.state.dob === 0 || this.state.age.length === 0) {
            alert("Please provide all Details!!")
        } else {
            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    contactPerson: this.state.contactPerson,
                    contactNo: this.state.contactNumber,
                    email: this.state.email,
                    dateOfBirth: this.state.dob,
                    age: parseInt(this.state.age),
                    st_classRoomId: parseInt(selectedClass)
                })
            }
            try {
                fetch("https://localhost:44393/Student/InsertStudent", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Saved: ", data)
                        window.location.reload(false);
                    })
            } catch (error) {
                console.log(error)
            }
        }


    }

    render() {
        return (
            <div className="form" >
                <form onSubmit={this.handleSubmit} >
                    <div className="formFields" >
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName"
                                value={this.state.firstName} name="firstName" onChange={e => this.setState({ firstName: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName"
                                value={this.state.lastName} name="lastName" onChange={e => this.setState({ lastName: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contact Person</label>
                            <input type="text" className="form-control" id="contactPerson"
                                value={this.state.contactPerson} name="contactPerson" onChange={e => this.setState({ contactPerson: e.target.value })} />
                        </div>
                    </div>
                    <div className="formFields" >
                        <div className="mb-3">
                            <label className="form-label">Contact Number</label>
                            <input type="text" className="form-control" id="contactNumber"
                                value={this.state.contactNumber} name="contactNumber" onChange={e => this.setState({ contactNumber: e.target.value })} />
                        </div>
                        <div class="mb-3">
                            <label className="form-label">Email Address</label>
                            <input type="email" className="form-control" id="email"
                                value={this.state.email} name="email" onChange={e => this.setState({ email: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Age</label>
                            <input type="Number" className="form-control" id="age"
                                value={this.state.age} name="age" onChange={e => this.setState({ age: e.target.value })} />
                        </div>
                    </div>
                    <div className="formFields" >
                        <div className="mb-3">
                            <label className="form-label">Date Of Birth</label>
                            <input type="Date" className="form-control" id="dob"
                                value={this.state.dob} name="dob" onChange={e => this.setState({ dob: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Classes</label>
                            <br />
                            <select id="classDropdown" className="customSelect" >
                                <option value="none" selected disabled hidden> --Select Class --</option>
                            </select>
                        </div>


                    </div>
                    <div className="formFields">
                        <div className="mb-3" >
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
                <div>
                    <table className="table table-hover" id="stdTable" >
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Contact Person</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Class</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>


        )
    }
}

export default StudentForm