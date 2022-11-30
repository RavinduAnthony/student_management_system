import { Component } from "react"

export class UpdateTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teachers: [],
            firstName: '', lastName: '', conNumber: '', email: '',teacherId:''
        }
    }
    componentDidMount = () => {
        fetch("https://localhost:44393/Teacher/GetAllTeachers")
            .then(response => response.json())
            .then(data => {
                let teacherSelect = document.getElementById("teacherSelect")
                for (let i = 0; i < data.length; i++) {
                    this.state.teachers.push(data[i])
                    let teacherOption = document.createElement("option")
                    teacherOption.id = data[i].teacherId
                    teacherOption.value = data[i].teacherFirstName + " " + data[i].teacherLastName
                    teacherOption.text = data[i].teacherFirstName + " " + data[i].teacherLastName
                    teacherSelect.appendChild(teacherOption)
                }
            })
        console.log("Teachers:", this.state.teachers)
    }

    handleSelectChange = () =>{
        let teachSelect = document.getElementById("teacherSelect")
        const teachIndex = teachSelect.options[teachSelect.selectedIndex].id
        
        const teacherObj = this.state.teachers.find((tch) => tch.teacherId == teachIndex)
        
        this.setState({teacherId: teacherObj.teacherId})
        this.setState({firstName: teacherObj.teacherFirstName})
        this.setState({lastName: teacherObj.teacherLastName})
        this.setState({conNumber: teacherObj.contactNo})
        this.setState({email: teacherObj.email})

        document.getElementById("firstName").value = this.state.firstName
        document.getElementById("lastName").value = this.state.lastName
        document.getElementById("contactNumber").value = this.state.conNumber
        document.getElementById("email").value = this.state.email

    }
    UpdateTeacher = () =>{
        const requestOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teacherId: this.state.teacherId,
                teacherFirstName: this.state.firstName,
                teacherLastName: this.state.lastName,
                contactNo: this.state.conNumber,
                email: this.state.email
            })
        }
        try {
            fetch("https://localhost:44393/Teacher/UpdateTeacher", requestOptions)
                .then(response => response.json())
                .then(data => {

                })
        } catch (error) {
            console.log(error)
        }
        alert("Teacher Updated!")
        window.location.reload();
    }

    DeleteTeacher = () =>{
        let teachId = this.state.teacherId
        fetch("https://localhost:44393/Teacher/DeleteTeacher?teacherId=" + teachId)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        alert("Teacher Deleted")
        window.location.reload()
    }
    render() {
        return (
            <div className="form">
                <h4>Update / Delete Teacher</h4>
                <br/>
                <select onChange = {this.handleSelectChange} className="customSelect" id="teacherSelect" >
                    <option value="none" selected disabled hidden> --Select Teacher --</option>
                </select>
                <br/>
                <form>
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
                </form>
                <div className="btnGroup">
                    <div>
                        <button onClick={this.UpdateTeacher} className="btn btn-warning" >Update</button>
                    </div>
                    <div>
                        <button onClick={this.DeleteTeacher} className="btn btn-danger" >Delete</button>
                    </div>
                </div>
            </div>

        )
    }

}