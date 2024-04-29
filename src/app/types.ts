import { ReactNode } from "react";

export enum OrderingDirection {
  DESCENDING = "desc",
  ASCENDING = "asc",
}

export enum RentalStatus {
  RETURNED = "Returned",
  EXPIRED = "Expired",
  PICKED_UP = "Picked-up",
  OVERDUE = "Overdue",
  RESERVED = "Reserved",
  CANCELED = "Canceled",
}

export type ModalInfo = {
  info: JSX.Element;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addInfo: (info: JSX.Element) => void;
  removeInfo: () => void;
};

export type ModalContextProps = {
  children: ReactNode;
};
