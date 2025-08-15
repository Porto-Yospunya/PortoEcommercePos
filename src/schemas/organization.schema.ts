import { z } from "zod";

export const organizationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  type: z.string().optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  addressPhone: z.string().optional(),
  line1: z.string().optional(),
  line2: z.string().optional(),
  subDistrict: z.string().optional(),
  district: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  organizationId: z.string().optional(),
});

export type OrganizationSchemaType = z.infer<typeof organizationSchema>;
