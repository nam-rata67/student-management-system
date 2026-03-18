import { useUser } from "../../context/userContext";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("token");

        // ❌ token nahi mila
        if (!accessToken) {
          return navigate("/login");
        }

        // ✅ token save
        localStorage.setItem("token", accessToken);

        // ✅ user fetch (backend se)
        const res = await axios.get(
          "https://student-management-system-using-mern-in35.onrender.com/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.data.success) {
          return navigate("/login");
        }

        const user = res.data.user;
        const role = user.role?.toLowerCase();

        // ✅ save user data
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", role);

        setUser(user);

        // ✅ redirect
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user");
        }

      } catch (error) {
        console.error("Auth Error:", error);
        navigate("/login");
      }
    };

    handleAuth();
  }, [navigate, setUser]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>🔐 Logging you in...</h2>
    </div>
  );
};

export default AuthSuccess;
