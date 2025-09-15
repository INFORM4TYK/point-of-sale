import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import useLoading from "../../hooks/useLoading";

const BackDropLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loading } = useLoading();

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <main>{children}</main>
    </>
  );
};

export default BackDropLayout;
