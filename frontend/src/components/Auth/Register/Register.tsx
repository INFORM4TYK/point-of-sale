import type { Dispatch, SetStateAction } from "react";

const Register = ({
  setScreen,
}: {
  setScreen: Dispatch<SetStateAction<"login" | "register">>;
}) => {
  return <div>Register</div>;
};

export default Register;
