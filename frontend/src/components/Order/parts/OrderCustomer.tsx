import { useForm, Controller } from "react-hook-form";
import { Autocomplete, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import type { Customer } from "../../../types/Customer";
import {
  searchCustomers,
  addCustomer,
} from "../../../services/customerService";
import { updateOrder } from "../../../services/orderService";

type CustomerForm = {
  name: string;
  email: string;
  phone: string;
};

const OrderCustomer = ({ orderId }: { orderId: number }) => {
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<CustomerForm>();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const results = await searchCustomers(searchQuery);
        setSearchResults(results);
      } catch (err) {
        console.error(err);
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const onAddCustomer = async (data?: CustomerForm) => {
    if (data && !selectedCustomerId) {
      try {
        const newCustomer = await addCustomer({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
        setSelectedCustomer(newCustomer);
        setSelectedCustomerId(newCustomer.id);
        await updateOrder({ orderId: orderId, customerId: newCustomer.id });
      } catch (err) {
        console.error("Nie udało się dodać klienta:", err);
      }
    } else if (selectedCustomerId) {
      await updateOrder({ orderId: orderId, customerId: selectedCustomerId });
    }
  };

  const onChangeCustomer = () => {
    setSelectedCustomer(null);
    setSelectedCustomerId(null);
    reset();
    setSearchQuery("");
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
            options={searchResults}
            getOptionLabel={(option) => option.name}
            value={selectedCustomer}
            onInputChange={(_, value) => setSearchQuery(value)}
            onChange={(_, value: any) => {
              if (value) {
                setSelectedCustomer(value);
                setSelectedCustomerId(value.id);
                setValue("name", value.name);
                setValue("email", value.email);
                setValue("phone", value.phone);
                updateOrder({ orderId, customerId: value.id }).catch(
                  console.error
                );
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
        {...control.register?.("name", { required: "Pole imię jest wymagane" })}
        placeholder="Imię i nazwisko"
        className="w-full p-2 border rounded"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <input
        {...control.register?.("email", {
          required: "Pole email jest wymagane",
        })}
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input
        {...control.register?.("phone", {
          required: "Pole telefon jest wymagane",
        })}
        placeholder="Telefon"
        className="w-full p-2 border rounded"
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      <Button type="submit" variant="contained" color="primary">
        Dodaj klienta
      </Button>
    </form>
  );
};

export default OrderCustomer;
