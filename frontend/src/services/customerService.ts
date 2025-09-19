import api from "../config/api"; // Twój axios/fetch wrapper
import type { Customer } from "../types/Customer";

export const addCustomer = async (customer: {
  name: string;
  phone: number;
  email: string;
}): Promise<Customer> => {
  try {
    const { data } = await api.post<{ data: Customer }>("/customers", customer);
    return data.data;
  } catch (err) {
    throw new Error("Failed to add customer");
  }
};

export const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const { data } = await api.get<{ data: Customer[] }>("/customers");
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch customers");
  }
};

export const searchCustomers = async (query: string): Promise<Customer[]> => {
  try {
    const { data } = await api.get<{ data: Customer[] }>(`/customers/search`, {
      params: { query },
    });
    return data.data;
  } catch (err) {
    throw new Error("Failed to search customers");
  }
};

export const getCustomerById = async (id: number): Promise<Customer> => {
  try {
    const { data } = await api.get<{ data: Customer }>(`/customers/${id}`);
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch customer");
  }
};

export const updateCustomer = async (
  id: number,
  updates: { name?: string; phone?: number; email?: string }
): Promise<Customer> => {
  try {
    const { data } = await api.put<{ data: Customer }>(
      `/customers/${id}`,
      updates
    );
    return data.data;
  } catch (err) {
    throw new Error("Failed to update customer");
  }
};

export const deleteCustomer = async (
  id: number
): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<{ message: string }>(`/customers/${id}`);
    return data;
  } catch (err) {
    throw new Error("Failed to delete customer");
  }
};
