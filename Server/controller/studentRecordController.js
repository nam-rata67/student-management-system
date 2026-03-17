import Student from "../models/StudentRecord.js";

// ADD or UPDATE record
export const addStudentRecord = async (req, res) => {
  try {
    const { email, presentDays, absentDays, totalDays, totalFee, paidFee } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let student = await Student.findOne({ email });

    if (student) {
      // update
      student.presentDays = presentDays;
      student.absentDays = absentDays;
      student.totalDays = totalDays;
      student.totalFee = totalFee;
      student.paidFee = paidFee;

      await student.save();
      return res.json({ message: "Record Updated Successfully" });
    }

    // new record
    const newStudent = new Student({
      email,
      presentDays,
      absentDays,
      totalDays,
      totalFee,
      paidFee
    });

    await newStudent.save();
    res.json({ message: "Record Saved Successfully" });

  } catch (error) {
    console.log("Save Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// GET record by email
export const getStudentByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};