import { useNavigate } from "react-router";
import useAuth from "../../store/auth";

export default function useHandleLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return () => {
    logout();
    navigate("/");
  };
}
