import { Component } from "react"

export class UpdateStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            clasRooms: [],
            fName: '', lName: '', age: '', cntNo: '', cntPerson: '', dob: '', email: '', clsRoomName: '', stdId: '', classRoomId: ''
        }
    }
    componentDidMount = () => {
        fetch("https://localhost:44393/Student/GetAllStudents")
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    this.state.students.push(data[i])
                }
                let stdSelect = document.getElementById("stdSelect")
                for (let j = 0; j < data.length; j++) {
                    let stdOpt = document.createElement("option")
                    stdOpt.id = data[j].studentId
                    stdOpt.value = data[j].firstName + " " + data[j].lastName
                    stdOpt.text = data[j].firstName + " " + data[j].lastName
                    stdSelect.appendChild(stdOpt)
                }
                stdSelect.addEventListener("change", function handleChange(e) {
                    let slctdClass = stdSelect.options[stdSelect.selectedIndex].id
                    console.log("Selected Class:", slctdClass)
                })
            })

        fetch("https://localhost:44393/ClassRoom/GetAllClassRooms")
            .then(response => response.json())
            .then(data => {
                let clsDropDown = document.getElementById("classDropdown")
                for (let i = 0; i < data.length; i++) {
                    this.state.clasRooms.push(data[i])
                    let clsOption = document.createElement("option")
                    clsOption.id = data[i].classRoomId
                    clsOption.value = data[i].classRoomName
                    clsOption.text = data[i].classRoomName
                    clsDropDown.appendChild(clsOption)
                }
            })

        console.log("Students array:", this.state.students)
        console.log("ClassRooms:", this.state.clasRooms)
    }

    handleSelectChange = () => {
        let stdSelect = document.getElementById("stdSelect")
        const stdIndex = stdSelect.options[stdSelect.selectedIndex].id

        const searchObj = this.state.students.find((std) => std.studentId == parseInt(stdIndex))
        const classObj = this.state.clasRooms.find((cls) => cls.classRoomId == searchObj.st_classRoomId)

        console.log("ClassRoom :", classObj)
        console.log("Student:", searchObj)
        this.setState({ stdId: searchObj.studentId })
        this.setState({ fName: searchObj.firstName })
        this.setState({ lName: searchObj.lastName })
        this.setState({ cntPerson: searchObj.contactPerson })
        this.setState({ cntNo: searchObj.contactNo })
        this.setState({ email: searchObj.email })
        this.setState({ age: searchObj.age })
        this.setState({ clsRoomName: classObj.classRoomName })
        this.setState({ dob: searchObj.dateOfBirth })
        this.setState({ classRoomId: searchObj.st_classRoomId })


        document.getElementById("firstName").value = this.state.fName
        document.getElementById("lastName").value = this.state.lName
        document.getElementById("contactPerson").value = this.state.cntPerson
        document.getElementById("contactNumber").value = this.state.cntNo
        document.getElementById("email").value = this.state.email
        document.getElementById("dob").value = this.state.dob
        document.getElementById("age").value = this.state.age
        document.getElementById("currentClass").defaultValue = this.state.clsRoomName


        console.log(this.state.fName)

    }
    classRoomSelect = () => {
        let clsRoomSelect = document.getElementById("classDropdown")
        let slctClassId = clsRoomSelect.options[clsRoomSelect.selectedIndex].id

        let newClassObj = this.state.clasRooms.find((cls) => cls.classRoomId == slctClassId)
        this.setState({ clsRoomName: newClassObj.classRoomName })
        this.setState({ classRoomId: newClassObj.classRoomId })

    }
    UpdateStudent = () => {
        const requestOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studentId: this.state.stdId,
                firstName: this.state.fName,
                lastName: this.state.lName,
                contactPerson: this.state.cntPerson,
                contactNo: this.state.cntNo,
                email: this.state.email,
                dateOfBirth: this.state.dob,
                age: parseInt(this.state.age),
                st_classRoomId: parseInt(this.state.classRoomId)
            })
        }
        try {
            fetch("https://localhost:44393/Student/UpdateStudent", requestOptions)
                .then(response => response.json())
                .then(data => {

                })
        } catch (error) {
            console.log(error)
        }
        alert("Student Updated!")
        window.location.reload();
    }
    DeleteStudent = () => {
        console.log("Delete student Id:", this.state.stdId)
        let stdId = this.state.stdId
        try {
            fetch("https://localhost:44393/Student/DeleteStudent?studentId=" + stdId)
                .then(response => response.json)
                .then(data => {
                    console.log(data)
                })
        } catch (error) {
            console.log(error)
        }

        alert("Student Deleted!")
        window.location.reload()
    }
    render() {
        return (
            <div className="form">
                <h4>Update / Delete Student</h4>
                <br />
                <select id="stdSelect" onChange={this.handleSelectChange} className="customSelect" >
                    <option value="none" selected disabled hidden> --Select Student --</option>
                </select>
                <br />
                <form>
                    <div className="formFields" >
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName"
                                value={this.state.fName} name="firstName" onChange={e => this.setState({ fName: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName"
                                value={this.state.lName} name="lastName" onChange={e => this.setState({ lName: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contact Person</label>
                            <input type="text" className="form-control" id="contactPerson"
                                value={this.state.cntPerson} name="contactPerson" onChange={e => this.setState({ cntPerson: e.target.value })} />
                        </div>
                    </div>
                    <div className="formFields" >
                        <div className="mb-3">
                            <label className="form-label">Contact Number</label>
                            <input type="text" className="form-control" id="contactNumber"
                                value={this.state.cntNo} name="contactNumber" onChange={e => this.setState({ cntNo: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input type="email" className="form-control" id="email"
                                value={this.state.email} name="email" onChange={e => this.setState({ email: e.target.value })} />
                        </div>
                    </div>
                    <div className="formFields" >
                        <div className="mb-3">
                            <label className="form-label">Class Room</label>
                            <input type="text" id="currentClass" disabled className="form-control"
                                value={this.state.clsRoomName} name="classRoomName" />
                        </div>
                        <div className="mb-3">
                            <br />
                            <select id="classDropdown" className="customSelect" onChange={this.classRoomSelect} >
                                <option value="none" selected disabled hidden> --Select Class --</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Age</label>
                            <input disabled type="number" className="form-control" id="age"
                                value={this.state.age} name="age" onChange={e => this.setState({ age: e.target.value })} />
                        </div>
                    </div>
                </form>
                <div className="btnGroup">
                    <div>
                        <button onClick={this.UpdateStudent} className="btn btn-warning" >Update</button>
                    </div>
                    <div>
                        <button onClick={this.DeleteStudent} className="btn btn-danger" >Delete</button>
                    </div>
                </div>

            </div>
        )
    }
}