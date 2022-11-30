import { Component } from "react"

export class UpdateSubject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subjectName: '',
            subjctId: '',
            subjects: []
        }
    }
    componentDidMount = () => {
        fetch("https://localhost:44393/Subject/GetAllSubjects")
            .then(response => response.json())
            .then(data => {
                let subjDropdown = document.getElementById("subjSelect")
                for (let i = 0; i < data.length; i++) {
                    this.state.subjects.push(data[i])
                    let subjOpt = document.createElement("option")
                    subjOpt.id = data[i].subjectId
                    subjOpt.value = data[i].subjectName 
                    subjOpt.text = data[i].subjectName
                    subjDropdown.appendChild(subjOpt)
                }
            })
        console.log("All Subjects: ", this.state.subjects)
    }
    handleSelectChange = () =>{
        let subjSelect = document.getElementById("subjSelect")
        let subjIndex = subjSelect.options[subjSelect.selectedIndex].id
        
        const subject = this.state.subjects.find((sbj) => sbj.subjectId == subjIndex)
        this.setState({subjctId: subject.subjectId})
        this.setState({subjectName: subject.subjectName})

        document.getElementById("subjectName").value = this.state.subjectName
    }

    UpdateSubject = () =>{
        const requestOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subjectId: parseInt(this.state.subjctId),
                subjectName: this.state.subjectName
            })
        }
        try {
            fetch("https://localhost:44393/Subject/UpdateSubject", requestOptions)
                .then(response => response.json())
                .then(data => {

                })
        } catch (error) {
            console.log(error)
        }
        alert("Subject Updated!")
        window.location.reload()
    }

    DeleteSubject = () =>{
        let subjId = this.state.subjctId
        try {
            fetch("https://localhost:44393/Subject/DeleteSubject?subjectId=" + subjId)
                .then(response => response.json)
                .then(data => {
                    console.log(data)
                })
        } catch (error) {
            console.log(error)
        }
        alert("Subject Deleted!")
        window.location.reload()
    }
    render() {
        return (
            <div className="form">
                <h4>Update / Delete Subject</h4>
                <br/>
                <select id="subjSelect" onChange={this.handleSelectChange} className="customSelect" >
                    <option value="none" selected disabled hidden> --Select Subject --</option>
                </select>
                <br />
                <form>
                    <div class="mb-3">
                        <h5>Subject</h5>
                        <input type="text" class="form-control" id="subjectName"
                            value={this.state.subjectName} onChange={e => this.setState({ subjectName: e.target.value })} />
                    </div>
                </form>
                <div className="btnGroup">
                    <div>
                        <button onClick={this.UpdateSubject} className="btn btn-warning" >Update</button>
                    </div>
                    <div>
                        <button onClick={this.DeleteSubject} className="btn btn-danger" >Delete</button>
                    </div>
                </div>
            </div>

        )
    }
}