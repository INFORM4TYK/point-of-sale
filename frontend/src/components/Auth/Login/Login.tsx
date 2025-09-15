import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useLoading from "../../../hooks/useLoading";
import useError from "../../../hooks/useError";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
type LoginFormInputs = {
  email: string;
  password: string;
};
const Login = () => {
  const { login, currentUser } = useAuth();
  const router = useNavigate();
  const { loading } = useLoading();
  const { error } = useError();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const onSubmit = async (data: { email: string; password: string }) => {
    await login(data);
  };
  
  useEffect(() => {
    if (currentUser) {
      router("/dashboard", { replace: true });
      return;
    }
  }, [currentUser]);
  if (loading) return;
  return (
    <section className="w-full h-screen grid place-items-center px-4">
      <div className="h-1/2 w-full bg-primary absolute top-0 pattern-bg">
        <div className="flex items-center flex-col justify-center h-full -mt-8">
          <h1 className="z-50 text-4xl font-bold text-center text-textWhite mb-6">
            Panel POS
          </h1>
        </div>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="z-50 flex flex-col gap-4 bg-white w-full max-w-[500px] px-8 py-4 pt-6 rounded-xl shadow-lg border-2"
      >
        <h2 className="text-2xl font-bold mb-2  uppercase text-center text-textDark">
          Zaloguj się
        </h2>
        <TextField
          sx={{
            marginBottom: !errors.password ? ".75rem" : "0",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          label="Email"
          type="email"
          {...register("email", { required: "Email jest wymagany" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          sx={{
            marginBottom: !errors.password ? ".75rem" : "0",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          label="Hasło"
          type="password"
          autoComplete="new-password"
          {...register("password", { required: "Hasło jest wymagane" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <p className="text-center text-danger">{error && error}</p>
        <Button
          disabled={loading}
          loading={loading}
          type="submit"
          variant="contained"
          className="btn--gradient btn--primary h-[50px]"
          sx={{ borderRadius: "8px" }}
        >
          Zaloguj się
        </Button>
        <p className="text-center text-sm text-textDark mb-4">
          Wprowadź dane, aby uzyskać dostęp do panelu sprzedaży
        </p>
      </form>
    </section>
  );
};

export default Login;
