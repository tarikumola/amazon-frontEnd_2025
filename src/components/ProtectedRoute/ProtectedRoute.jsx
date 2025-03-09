import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { DataContext } from "../DataProvider/DataProvider";

const ProtectedRoute = ({ children, msg, redirect }) => {

  const [{ user, basket }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user]);

  return children;
};

export default ProtectedRoute;
