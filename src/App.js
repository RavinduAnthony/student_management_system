import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentForm from "./Pages/StudentForm";
import NavBar from "./Pages/NavBar"
import ClassRoom from "./Pages/ClassRoom";
import Subject from "./Pages/Subject";
import Teacher from "./Pages/Teacher";
import { AllocateSubject } from "./Pages/AllocateSubject";
import { AllocateClass } from "./Pages/AllocateClass";
import { StudentDetail } from "./Pages/StudentDetail";
import { UpdateStudent } from "./Pages/UpdateStudent";
import { UpdateTeacher } from "./Pages/UpdateTeacher";
import { UpdateSubject } from "./Pages/UpdateSubject";
import { UpdateClass } from "./Pages/UpdateCLass";

class App extends Component {

    render() {
        return (
            <div>

                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<NavBar />} />
                        <Route index element={<StudentForm />} />
                        <Route path="/teacher" element={<Teacher />} />
                        <Route path="/allocateSubject" element={<AllocateSubject />} />
                        <Route path="/allocateClass" element={<AllocateClass />} />
                        <Route path="/studentDetail" element={<StudentDetail />} />
                        <Route path="/updateStudent" element={<UpdateStudent/>}/>
                        <Route path="/updateTeacher" element={<UpdateTeacher/>}/>
                        <Route path="/updateSubject" element={<UpdateSubject/>}/>
                        <Route path="/updateClass" element={<UpdateClass/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App