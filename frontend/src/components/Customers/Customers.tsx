import { useEffect, useState } from "react";
import type { Customer } from "../../types/Customer";
import useLoading from "../../hooks/useLoading";
import {
  getAllCustomers,
  getCustomerById,
} from "../../services/customerService";
import CustomerItem from "./parts/CustomerItem";
import CustomerAdd from "./parts/CustomerAdd";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { startLoading } = useLoading();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      const stopLoading = startLoading();
      try {
        const allCustomers = await getAllCustomers();
        const detailedCustomers = await Promise.all(
          allCustomers.map((c) => getCustomerById(c.id))
        );
        setCustomers(detailedCustomers);
      } catch (err) {
        console.error("Failed to fetch customers", err);
      } finally {
        stopLoading();
      }
    };
    fetchCustomers();
  }, [reload]);

  if (customers.length === 0)
    return (
      <div className="h-screen grid place-items-center text-gray-500">
        Brak klientów
        <CustomerAdd setReload={setReload} />
      </div>
    );

  return (
    <div className="p-4 flex-col">
      <h2 className="text-xl font-semibold mb-4">Lista klientów: </h2>
      <div className="flex flex-row flex-wrap gap-4">
        {customers.map((customer) => (
          <CustomerItem customer={customer} setReload={setReload} />
        ))}
      </div>
      <CustomerAdd setReload={setReload} />

    </div>
  );
};

export default Customers;
