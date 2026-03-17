import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import StudentHeader from "./StudentHeader";
import StudentFooter from "./StudentFooter";


const StudentLayout = () => {

  const [openBot, setOpenBot] = useState(false);

  return (
    <div className="student-layout">

      <StudentHeader />

      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Outlet />
      </main>

  
        

      <StudentFooter />

    </div>
  );
};

export default StudentLayout;