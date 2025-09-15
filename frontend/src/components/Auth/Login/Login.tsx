import type { Dispatch, SetStateAction } from "react";

const Login = ({
  setScreen,
}: {
  setScreen: Dispatch<SetStateAction<"login" | "register">>;
}) => {
  return <div>Login</div>;
};

export default Login;
