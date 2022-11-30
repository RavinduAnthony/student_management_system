import { Component, createElement } from "react";

export class StudentDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clsName: '',
            stdDetails: []
        }

    }

    componentDidMount = () => {
        fetch("https://localhost:44393/Student/GetAllStudents")
            .then(response => response.json())
            .then(data => {
                console.log("Students: ", data)
                let stdSelect = document.getElementById("stdName")
                for (let i = 0; i < data.length; i++) {
                    let stdOption = document.createElement("option")
                    stdOption.id = data[i].studentId
                    stdOption.value = data[i].firstName + " " + data[i].lastName
                    stdOption.text = data[i].firstName + " " + data[i].lastName
                    stdSelect.appendChild(stdOption)
                }
            })
        let studentSelect = document.getElementById("stdName")
        studentSelect.addEventListener("change", function handleChange(event) {
            let stdId = studentSelect.options[studentSelect.selectedIndex].id
            fetch("https://localhost:44393/Student/GetStudentDetails1?studentId=" + stdId)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        console.log("Std Details1: ", data)
                        let clsName = document.getElementById("stclassName")
                        clsName.value = data[0].stClassName

                        let cntPerson = document.getElementById("cntPerson")
                        cntPerson.value = data[0].stContactPerson

                        let cntNo = document.getElementById("cntNumber")
                        cntNo.value = data[0].stContactNo

                        let stEmail = document.getElementById("email")
                        stEmail.value = data[0].stEmail

                        let stDob = document.getElementById("dob")
                        stDob.value = data[0].stDob

                        fetch("https://localhost:44393/Student/GetStudentDetails2?studentId=" + stdId)
                            .then(response => response.json())
                            .then(data => {
                                console.log("Std Details2: ", data)
                                let tblbody = document.getElementById("detail2Table")
                                for (let i = 0; i < data.length; i++) {
                                    let tblRow = document.createElement("tr")

                                    let col1 = document.createElement("td")
                                    col1.innerHTML = data[i].stSubjectName
                                    tblRow.appendChild(col1)

                                    let col2 = document.createElement("td")
                                    col2.innerHTML = data[i].stTeacherFirstName + "" + data[i].stTeacherLastName
                                    tblRow.appendChild(col2)

                                    tblbody.appendChild(tblRow)
                                }


                            })
                    }else{
                        window.location.reload()
                    }


                })

        })

    }
    render() {

        return (
            <div>
                <div className="form" >
                    <h4>Student Details</h4>
                    <form>
                        <div className="formFields" >
                            <div className="mb-3">
                                <label className="form-label">Student</label>
                                <br />
                                <select id="stdName" className="customSelect-details" >
                                    <option value="none" selected disabled hidden> --Select Student --</option>
                                </select>
                            </div>
                            <br />
                            <div className="mb-3">
                                <label className="form-label">Class Room</label>
                                <input disabled type="text" className="form-control" id="stclassName" />
                            </div>
                        </div>
                        <div className="formFields" >
                            <div className="mb-3">
                                <label className="form-label">Contact Person</label>
                                <input disabled type="text" className="form-control" id="cntPerson" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input disabled type="text" className="form-control" id="email" />
                            </div>
                        </div>
                        <div className="formFields" >
                            <div className="mb-3">
                                <label className="form-label">Contact Number</label>
                                <input disabled type="text" className="form-control" id="cntNumber" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date of Birth</label>
                                <input disabled type="text" className="form-control" id="dob" />
                            </div>
                        </div>
                    </form>
                    <br />
                    <h4>Teacher & Subject Details</h4>
                    <table className="table table-bordered" >
                        <thead>
                            <tr>
                                <th>subject</th>
                                <th>Teacher</th>
                            </tr>
                        </thead>
                        <tbody id="detail2Table" ></tbody>
                    </table>
                </div>
            </div>

        )
    }
}