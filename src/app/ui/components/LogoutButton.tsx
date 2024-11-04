import { logout } from "@/app/login/actions";
import Button from "./Button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logout();
  };

  return <Button label="Sair da conta" onClick={handleLogout} />;
};

export default LogoutButton;
