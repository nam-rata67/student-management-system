export default function GuestFooter() {
  return (
    <div
      style={{
        background: "linear-gradient(90deg,#0f172a,#020617)",
        color: "#fff",
        padding: "24px 32px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h3>Student Management System</h3>
        <p style={{ maxWidth: 400 }}>
          Secure and efficient platform to manage student registration,
          login and academic records.
        </p>
      </div>

      <div>
        <h4>Quick Links</h4>
        <p>Home</p>
        <p>Login</p>
        <p>Register</p>
      </div>
    </div>
  );
}