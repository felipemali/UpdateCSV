import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type message = {
  status: boolean;
  message: string;
};
export type dataUser = {
  email: string;
  password: string;
};
export type Properties = {
  name: string;
  nome?: string;
  id: string;
};
type userContextType = {
  login: dataUser;
  token: string;
  idProperties: string;
  properties: Properties[];
  isOpen: boolean;
  isChecked: boolean;
  isvalidated: boolean;
  messageResponse: message;
  isSend: boolean;
  setLogin: (value: dataUser) => void;
  setToken: (value: string) => void;
  setIsvalidated: (value: boolean) => void;
  setIsChecked: (value: boolean) => void;
  setProperties: Dispatch<SetStateAction<Properties[]>>;
  setIsOpen: (value: boolean) => void;
  setIdProperties: (value: string) => void;
  setMessageResponse: (value: message) => void;
  setIsSend: (value: boolean) => void;
};

const initialValue: userContextType = {
  login: { email: "", password: "" },
  isChecked: false,
  isvalidated: false,
  token: "",
  idProperties: "",
  isOpen: false,
  properties: [],
  messageResponse: { status: false, message: "" },
  isSend: false,
  setLogin: () => {},
  setToken: () => {},
  setIsvalidated: () => {},
  setIsChecked: () => {},
  setProperties: () => {},
  setIsOpen: () => {},
  setIdProperties: () => {},
  setMessageResponse: () => {},
  setIsSend: () => {},
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
  const [idProperties, setIdProperties] = useState("");
  const [properties, setProperties] = useState<Properties[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messageResponse, setMessageResponse] = useState<message>({
    status: false,
    message: "",
  });
  console.log(properties);

  const [isSend, setIsSend] = useState(false);

  return (
    <UserContext.Provider
      value={{
        login,
        token,
        idProperties,
        isvalidated,
        isChecked,
        isOpen,
        properties,
        messageResponse,
        isSend,
        setMessageResponse,
        setIsvalidated,
        setLogin,
        setToken,
        setIsChecked,
        setProperties,
        setIsOpen,
        setIdProperties,
        setIsSend,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
