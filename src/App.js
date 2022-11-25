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
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App