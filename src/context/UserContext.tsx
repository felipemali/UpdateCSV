import { createContext, useState, ReactNode } from "react";

export type dataUser = {
  email: string;
  password: string;
};
type userContextType = {
  login: dataUser;
  token: string;
  submit: boolean;
  setLogin: (value: dataUser) => void;
  setSubmit: (value: boolean) => void;
  setToken: (value: string) => void;
};

const initialValue: userContextType = {
  login: { email: "", password: "" },
  submit: false,
  token: "",
  setLogin: () => {},
  setToken: () => {},
  setSubmit: () => {},
};

export const UserContext = createContext<userContextType>(initialValue);

type Props = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
  // eslint-disable-next-line
  const [login, setLogin] = useState<dataUser>({
    email: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);
  const [token, setToken] = useState("");

  return (
    <UserContext.Provider
      value={{
        login,
        submit,
        token,
        setLogin,
        setSubmit,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};