import { Component } from "react";

export class AllocateClass extends Component {
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
        fetch("https://localhost:44393/ClassRoom/GetAllClassRooms")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const classes = document.getElementById("classSelect")
                for (let i = 0; i < data.length; i++) {
                    var Toption = document.createElement("option")
                    Toption.value = data[i].classRoomName
                    Toption.id = data[i].classRoomId
                    Toption.text = data[i].classRoomName
                    classes.appendChild(Toption)
                }
            })
    }
    AllocateClass = (event) => {
        event.preventDefault()

        let allocatedTeacher = document.getElementById("teacherSelect")
        let teacherId = allocatedTeacher.options[allocatedTeacher.selectedIndex].id

        let allocatedClass = document.getElementById("classSelect")
        let classId = allocatedClass.options[allocatedClass.selectedIndex].id
        let className = allocatedClass.options[allocatedClass.selectedIndex].value

        let allocation = {
            classId: classId,
            teacherId: teacherId
        }

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                classId: parseInt(classId),
                teacherId: parseInt(teacherId)
            })
        }
        try {
            fetch("https://localhost:44393/ClassRoomAllocation/AllocateClassRoom", requestOptions)
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
        col1.innerHTML = className
        alctTblRow.appendChild(col1)

        let col2 = document.createElement("td")
        let delButton = document.createElement("button")
        delButton.setAttribute("id", allocation.classId)
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
                    classId: parseInt(delButton.id),
                    teacherId: parseInt(delButton.value)
                })
            }
            try {
                fetch("https://localhost:44393/ClassRoomAllocation/DeAllocateClassRoom", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Saved: ", data)
                        alert("Allocation Removed!")
                    })
            } catch (error) {
                console.log(error)
            }
            delButton.setAttribute("disabled","")
            alert("Class Deallocated!")
        })
        col2.appendChild(delButton)
        alctTblRow.appendChild(col2)

        alctTable.appendChild(alctTblRow)
    }
    render() {
        return (
            <div>
                <div className="allocHeader">
                <h4>Allocate Class</h4>
                </div>
                
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
                        <label>Class</label>
                        <br />
                        <select id="classSelect" className="customSelect-allocate" >
                            <option value="none" selected disabled hidden> --Select Class --</option>
                        </select>
                    </div>
                    <div>
                        <label hidden ></label>
                        <br />
                        <button className="btnAlloc" onClick={this.AllocateClass} >Allocate</button>
                    </div>

                </div>

                <div>

                </div>
                <div>
                    <table className="table table-hover" id="sbjctAllctTbl" >
                        <thead>
                            <tr>
                                <th>Class</th>
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