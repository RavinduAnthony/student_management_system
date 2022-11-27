import { Component } from "react"

export class UpdateClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classRoom: '',
            clsId: '',
            classes: []
        }
    }

    componentDidMount = () => {
        fetch("https://localhost:44393/ClassRoom/GetAllClassRooms")
            .then(response => response.json())
            .then(data => {
                let clsSelect = document.getElementById("clsSelect")
                for (let i = 0; i < data.length; i++) {
                    this.state.classes.push(data[i])
                    let clsOpt = document.createElement("option")
                    clsOpt.id = data[i].classRoomId
                    clsOpt.value = data[i].classRoomName
                    clsOpt.text = data[i].classRoomName
                    clsSelect.appendChild(clsOpt)
                }
            })
    }

    handleSelectChange = () => {
        let clsSelect = document.getElementById("clsSelect")
        let clsIndex = clsSelect.options[clsSelect.selectedIndex].id

        const clsObj = this.state.classes.find((cls) => cls.classRoomId == parseInt(clsIndex))
        this.setState({ clsId: clsObj.classRoomId })
        this.setState({ classRoom: clsObj.classRoomName })

        document.getElementById("classroomName").value = this.state.classRoom
    }

    updateClass = () => {
        const requestOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                classRoomId: this.state.clsId,
                classRoomName: this.state.classRoom
            })
        }
        try {
            fetch("https://localhost:44393/ClassRoom/UpdateClassRoom", requestOptions)
                .then(response => response.json())
                .then(data => {

                })
        } catch (error) {
            console.log(error)
        }
        alert("Class Room Updated!")
        window.location.reload()
    }

    deleteClass = () => {
        let clsId = this.state.clsId
        try {
            fetch("https://localhost:44393/ClassRoom/DeleteClassRoom?classRoomId=" + clsId)
                .then(response => response.json)
                .then(data => {
                    console.log(data)
                })
        } catch (error) {
            console.log(error)
        }
        alert("Class Room Deleted!")
        window.location.reload()
    }
    render() {
        return (
            <div className="form">
                <h4>Update / Delete Class</h4>
                <br />
                <select id="clsSelect" onChange={this.handleSelectChange} className="customSelect" >
                    <option value="none" selected disabled hidden> --Select Class --</option>
                </select>
                <br />
                <form>
                    <div className="mb-3">
                        <h5>Class Name</h5>
                        <input type="text" class="form-control" id="classroomName"
                            value={this.state.classRoom} onChange={e => this.setState({ classRoom: e.target.value })} />
                    </div>
                </form>
                <div className="btnGroup">
                    <div>
                        <button onClick={this.updateClass} className="btn btn-warning" >Update</button>
                    </div>
                    <div>
                        <button onClick={this.deleteClass} className="btn btn-danger" >Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}