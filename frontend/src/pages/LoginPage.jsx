import Login from "../components/Login";
import AppLayout from "../layout/AppLayout";

export default function LoginPage({ onLoginSuccess }) {
  return (
    <AppLayout>
      <Login onLoginSuccess={onLoginSuccess} />
    </AppLayout>
  );
}
