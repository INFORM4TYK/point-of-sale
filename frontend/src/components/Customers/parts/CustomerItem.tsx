import type { Customer } from "../../../types/Customer";
import { useState, type Dispatch } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
} from "@mui/material";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import {
  deleteCustomer,
  updateCustomer,
} from "../../../services/customerService";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
const CustomerItem = ({
  customer,
  setReload,
}: {
  customer: Customer;
  setReload: Dispatch<(prev: any) => boolean>;
}) => {
  console.log("💀 ~ CustomerItem ~ customer:", customer);
  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone.toString());
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateCustomer(customer.id, {
        name,
        email,
        phone,
      });
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setReload((prev) => !prev);
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCustomer(customer.id);
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setReload((prev) => !prev);
      setLoading(false);
    }
  };
  return (
    <Accordion className="mb-2 max-w-[600px]  w-full shadow-lg ">
      <AccordionSummary expandIcon={<EditSquareIcon />} >
        <div className="flex flex-col gap-4 ">
          <div className="flex items-center gap-4">
            <InfoIcon className="text-gray-400" />
            <span>ID: {customer.id}</span>
          </div>
          <div className="flex items-center gap-4">
            <PersonIcon className="text-gray-400" />
            <span>
              Imię: <strong>{customer.name} </strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <EmailIcon className="text-gray-400" />
            <span>
              Email: <strong>{customer.email} </strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <PhoneIcon className="text-gray-400" />
            <span>
              Telefon: <strong> {customer.phone}</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <AccessTimeIcon className="text-gray-400" />
            <span>
              Dodano:
              <strong>{new Date(customer.created_at).toLocaleString()}</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <AccessTimeIcon className="text-gray-400" />
            <span>
              Ostatnia aktualizacja:
              <strong> {new Date(customer.updated_at).toLocaleString()}</strong>
            </span>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="grid gap-4">
          <TextField
            label="Imię"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "..." : "Aktualizuj"}
          </Button>
          <Button
            variant="contained"
            sx={{ background: "red" }}
            onClick={handleDelete}
            disabled={loading}
          >
            Usuń
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomerItem;
