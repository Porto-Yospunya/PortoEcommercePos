export const toFormData = (obj: Record<string, unknown>) => {
  const formData = new FormData();
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      formData.append(key, String(obj[key]));
    }
  }

  return formData;
}