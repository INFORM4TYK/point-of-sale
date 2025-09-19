import { useForm, Controller } from "react-hook-form";
import { Autocomplete, TextField, Button } from "@mui/material";
import { useState } from "react";

type CustomerForm = {
  name: string;
  email: string;
  phone: string;
};

const dummyCustomers = [
  { id: 1, name: "Jan Kowalski", email: "jan@test.com", phone: "123456789" },
  { id: 2, name: "Anna Nowak", email: "anna@test.com", phone: "987654321" },
  {
    id: 3,
    name: "Piotr Wiśniewski",
    email: "piotr@test.com",
    phone: "555555555",
  },
];

const OrderCustomer = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<CustomerForm>();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerForm | null>(
    null
  );

  const onAddCustomer = (data: CustomerForm) => {
    setSelectedCustomer(data);
    console.log("💀 ~ Customer added:", data);
  };

  const onChangeCustomer = () => {
    setSelectedCustomer(null);
    reset();
  };

  if (selectedCustomer) {
    return (
      <div className="p-4 bg-white rounded shadow space-y-3">
        <h3 className="font-semibold">Wybrany klient:</h3>
        <p>Imię i nazwisko: {selectedCustomer.name}</p>
        <p>Email: {selectedCustomer.email}</p>
        <p>Telefon: {selectedCustomer.phone}</p>
        <button
          type="button"
          onClick={onChangeCustomer}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Zmień klienta
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onAddCustomer)}
      className="mb-6 p-2 sm:p-4 bg-white rounded shadow space-y-3"
    >
      <h3 className="font-semibold">Wyszukaj klienta:</h3>

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Autocomplete
            options={dummyCustomers}
            getOptionLabel={(option) => option.name}
            value={selectedCustomer}
            onChange={(_, value) => {
              if (value) {
                setSelectedCustomer(value);
                setValue("name", value.name);
                setValue("email", value.email);
                setValue("phone", value.phone);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Wyszukaj klienta lub wpisz imię"
              />
            )}
          />
        )}
      />

      <p className="text-sm text-gray-500">Lub wpisz ręcznie</p>
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

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Dodaj klienta
      </button>
    </form>
  );
};

export default OrderCustomer;
