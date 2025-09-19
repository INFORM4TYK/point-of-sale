import {  addCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer, searchCustomers } from "../models/customerModel";
import { Customer } from "../types/Customer";
import { HttpError } from "../utils/httpError";

export const addCustomerService = async (
  name: string,
  phone: number,
  email: string
): Promise<Customer> => {
  if (!name || !email || !phone) throw new HttpError(400, "Invalid customer data");
  try {
    return await addCustomer(name, phone, email);
  } catch (err) {
    throw new HttpError(500, `Failed to add customer: ${err}`);
  }
};

export const getAllCustomersService = async (): Promise<Customer[]> => {
  try {
    return await getAllCustomers();
  } catch (err) {
    throw new HttpError(500, "Failed to fetch customers");
  }
};

export const getCustomerByIdService = async (id: number): Promise<Customer> => {
  if (!id || isNaN(id)) throw new HttpError(400, "Invalid customer ID");
  try {
    return await getCustomerById(id);
  } catch (err) {
    throw new HttpError(404, `Customer not found: ${err}`);
  }
};

export const updateCustomerService = async (
  id: number,
  updates: { name?: string; phone?: number; email?: string }
): Promise<Customer> => {
  if (!id || isNaN(id)) throw new HttpError(400, "Invalid customer ID");
  try {
    return await updateCustomer(id, updates);
  } catch (err) {
    throw new HttpError(500, `Failed to update customer: ${err}`);
  }
};

export const deleteCustomerService = async (id: number): Promise<{ message: string }> => {
  if (!id || isNaN(id)) throw new HttpError(400, "Invalid customer ID");
  try {
    return await deleteCustomer(id);
  } catch (err) {
    throw new HttpError(500, `Failed to delete customer: ${err}`);
  }
};

export const searchCustomersService = async (query: string): Promise<Customer[]> => {
  if (!query) return [];
  try {
    return await searchCustomers(query);
  } catch (err) {
    throw new HttpError(500, `Failed to search customers: ${err}`);
  }
};
