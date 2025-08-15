import { OrganizationSchemaType } from "@/schemas/organization.schema";
import { getOrganizations } from "@/services/organization.service";
import { createContext, useContext } from "react";
import useSWR from "swr";

interface OrganizationContextProps {
  organizations?: OrganizationSchemaType[];
  isLoading: boolean;
  error: string;
} 

const defaultValue: OrganizationContextProps = {
  organizations: [],
  isLoading: true,
  error: "",
} 

const OrganizationContext = createContext<OrganizationContextProps>(defaultValue);

export const OrganizationProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  
  const { data: organizations, isLoading, error } = useSWR("/api/organizations", getOrganizations);

  return (
    <OrganizationContext.Provider value={{ organizations, isLoading, error }}>
      {children}
    </OrganizationContext.Provider>
  );
}

export const useOrganizationContext = () => useContext(OrganizationContext);