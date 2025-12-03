import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateMatch from "../components/CreateMatch";
import AppLayout from "../layout/AppLayout";

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export default function CreateMatchPage() {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }

    const decoded = decodeToken(token);
    const role = decoded?.role || null;

    if (role !== "ROLE_ADMIN") {
      navigate("/");
      return;
    }

    setAllowed(true);
  }, [navigate]);

  if (!allowed) {
    return null;
  }

  return (
    <AppLayout>
      <CreateMatch />
    </AppLayout>
  );
}
