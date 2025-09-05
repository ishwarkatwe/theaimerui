import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import useStore from "../utils/states/notes";
import { useNavigate } from "react-router-dom";
import { API_LOGIN, API_USERDATA } from "../utils/constants/endpoints";
import { showToast } from "../utils/toastr";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const setUser = useStore((state: any) => state.setUser);

  const handleLogin = async () => {
    const res = await fetch(API_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data: { access_token: string } = await res.json();

    if (data.access_token && [200, 201].includes(res.status)) {
      localStorage.setItem("token", data.access_token);
      const user = await fetch(API_USERDATA, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      const userData = await user.json();

      if (!userData) {
        showToast("Failed to fetch user data. Please try again.");
        return;
      }
      setUser(userData);
      showToast("User login successfully.");
      navigate("/account", { replace: true });
    } else {
      showToast("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div>
      <Card className="max-w-md mx-auto mt-20 p-6 shadow-lg">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="email"
            className="mb-4"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            type="password"
            className="mb-4"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button onClick={handleLogin}>Login</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
