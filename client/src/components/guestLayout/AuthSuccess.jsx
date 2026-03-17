import { useUser } from "../../context/userContext";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("token");

      if (!accessToken) {
        navigate("/login");
        return;
      }

      // ✅ save token
      localStorage.setItem("token", accessToken);

      try {
        const res = await axios.get("https://student-management-system-uidc.onrender.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.data.success) {
          const user = res.data.user;
          const role = user.role?.toLowerCase();

          // ✅ save everything
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("role", role);

          setUser(user);

          // ✅ correct redirect
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/user");
          }
        }
      } catch (error) {
        console.error("Google auth error:", error);
        navigate("/login");
      }
    };

    handleAuth();
  }, [navigate, setUser]);

  return <h2>Logging in...</h2>;
};

export default AuthSuccess;
