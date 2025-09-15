import { useContext } from "react";
import {
  ErrorContext,
  type ErrorContextInterface,
} from "../context/ErrorContext";

const useError = () => useContext(ErrorContext) as ErrorContextInterface;

export default useError;
