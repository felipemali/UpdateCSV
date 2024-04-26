import { createContext, useState, ReactNode } from "react";

export type dataUser = {
  email: string;
  password: string;
};
type userContextType = {
  login: dataUser;
  token: string;

  isvalidated: boolean;
  setLogin: (value: dataUser) => void;
  setToken: (value: string) => void;
  setIsvalidated: (value: boolean) => void;
};

const initialValue: userContextType = {
  login: { email: "", password: "" },

  isvalidated: false,
  token: "",
  setLogin: () => {},
  setToken: () => {},
  setIsvalidated: () => {},
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

  const [isvalidated, setIsvalidated] = useState(false);
  const [token, setToken] = useState("");

  return (
    <UserContext.Provider
      value={{
        login,
        token,
        isvalidated,
        setIsvalidated,
        setLogin,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
