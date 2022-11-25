import { Component, createElement } from "react";

export class AllocateSubject extends Component {
    componentDidMount = () => {
        fetch("https://localhost:44393/Teacher/GetAllTeachers")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const teachers = document.getElementById("teacherSelect")
                for (let i = 0; i < data.length; i++) {
                    var Toption = document.createElement("option")
                    Toption.value = data[i].teacherFirstName
                    Toption.id = data[i].teacherId
                    Toption.text = data[i].teacherFirstName + " " + data[i].teacherLastName
                    teachers.appendChild(Toption)
                }
            })

        fetch("https://localhost:44393/Subject/GetAllSubjects")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const subjects = document.getElementById("subjectSelect")
                for (let j = 0; j < data.length; j++) {
                    var Soption = document.createElement("option")
                    Soption.id = data[j].subjectId
                    Soption.value = data[j].subjectName
                    Soption.text = data[j].subjectName
                    subjects.appendChild(Soption)
                }
            })
    }
    AllocateSubject = (event) => {
        event.preventDefault()
        let allocatedTeacher = document.getElementById("teacherSelect")
        let teacherId = allocatedTeacher.options[allocatedTeacher.selectedIndex].id

        let allocatedSubject = document.getElementById("subjectSelect")
        let subjectId = allocatedSubject.options[allocatedSubject.selectedIndex].id
        let subjectName = allocatedSubject.options[allocatedSubject.selectedIndex].value

        let allocation = {
            teacherId: teacherId,
            subjectID: subjectId
        }

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subjectID: parseInt(subjectId),
                teacherId: parseInt(teacherId)
            })
        }
        try {
            fetch("https://localhost:44393/SubjectAllocation/SubjectAllocation", requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("Saved: ", data)
                })
        } catch (error) {
            console.log(error)
        }

        let alctTable = document.getElementById("alctTblBody")
        let alctTblRow = document.createElement("tr")

        let col1 = document.createElement("td")
        col1.innerHTML = subjectName
        alctTblRow.appendChild(col1)

        let col2 = document.createElement("td")
        let delButton = document.createElement("button")
        delButton.setAttribute("id", allocation.subjectID)
        delButton.setAttribute("value", allocation.teacherId)
        delButton.classList.add("btnDAlloc")
        delButton.textContent = "DeAllocate"
        delButton.addEventListener('click', function () {
            console.log('Del Button click:', this.value)
            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subjectID: parseInt(delButton.id),
                    teacherId: parseInt(delButton.value)
                })
            }
            try {
                fetch("https://localhost:44393/SubjectAllocation/SubjectDeAllocation", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Saved: ", data)
                    })
            } catch (error) {
                console.log(error)
            }
            delButton.setAttribute("disabled","")
            alert("Subject Deallocated!")
        })
        col2.appendChild(delButton)
        alctTblRow.appendChild(col2)

        alctTable.appendChild(alctTblRow)
    }
    render() {
        return (
            <div>
                <div className="allocHeader">
                <h4>Allocate Subject</h4>
                </div>
                <div>
                    <div className="selectAllocate-div" >
                        <div>
                            <label>Teacher</label>
                            <br />
                            <select id="teacherSelect" className="customSelect-allocate" >
                                <option value="none" selected disabled hidden> --Select Teacher --</option>
                            </select>
                        </div>
                    </div>
                    <div className="selectAllocate-div">
                        <div>
                            <label>Subject</label>
                            <br />
                            <select id="subjectSelect" className="customSelect-allocate" >
                                <option value="none" selected disabled hidden> --Select Subject --</option>
                            </select>
                        </div>

                        <div>
                            <label hidden ></label>
                            <br />
                            <button className="btnAlloc" onClick={this.AllocateSubject} >Allocate</button>
                        </div>



                    </div>
                </div>
                <div>
                    <table className="table table-hover" id="sbjctAllctTbl" >
                        <thead>
                            <tr>
                                <th>Subjects</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="alctTblBody" >

                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}