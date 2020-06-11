import { IAccountsProps } from "./accounts.interface";
import { Dispatch, SetStateAction } from "react";

export interface IAccountFormProps extends IAccountsProps {
    setSelected: Dispatch<SetStateAction<string>>
}