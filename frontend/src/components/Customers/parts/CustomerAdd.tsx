import { useForm } from "react-hook-form";
import { addCustomer } from "../../../services/customerService";
import { useState, type Dispatch } from "react";
import useError from "../../../hooks/useError";
type CustomerForm = {
  name: string;
  email: string;
  phone: string;
};
const CustomerAdd = ({
  setReload,
}: {
  setReload: Dispatch<(prev: any) => boolean>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerForm>();
  const { error, dispatchError } = useError();
  const [loading, setLoading] = useState(false);

  const onAddCustomer = async (data: CustomerForm) => {
    setLoading(true);
    try {
      await addCustomer({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    } catch (err) {
      dispatchError({ type: "customer/failed-to-add" });
    } finally {
      reset();
      setReload((prev) => !prev);
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onAddCustomer)}
      className="mb-6 p-2 sm:p-4 bg-gray-200 w-full max-w-[600px] rounded shadow space-y-3"
    >
      <h2 className="text-gray-950 text-xl ">Dodaj nowego klienta</h2>
      <input
        {...register("name", { required: "Pole imię jest wymagane" })}
        placeholder="Imię i nazwisko"
        className="w-full p-2 border rounded"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <input
        {...register("email", { required: "Pole email jest wymagane" })}
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input
        {...register("phone", { required: "Pole telefon jest wymagane" })}
        placeholder="Telefon"
        className="w-full p-2 border rounded"
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        disabled={loading}
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Dodaj klienta
      </button>
    </form>
  );
};

export default CustomerAdd;
