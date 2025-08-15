import { createContext, ReactNode, useContext } from "react";
import { getUsers } from "@/services/user.service";
import { UserSchemaType } from "@/schemas/user.schema";
import useSWR from "swr";

interface UserContextProps {
  users?: UserSchemaType[];
  isLoading: boolean;
  error: string;
}

const defaultValue: UserContextProps = {
  users: [],
  isLoading: true,
  error: "",
}

const UserContext = createContext<UserContextProps>(defaultValue);

export const UserProvider = ({
  children
}: {
  children: ReactNode,
}) => {

  const { data: users, isLoading, error } = useSWR("/api/users", getUsers);

  return (
    <UserContext.Provider value={{ users, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);