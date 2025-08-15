export type OrganizationType = {
  id: string;
  name: string;
  type: "school" | "hospital" | "government" | "company" | "other";
  contactName: string;
  contactPhone: string;
}