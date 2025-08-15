export const parseId2Name = (id: string | number, data: { id: string | number, name: string }[]) => {
  return data.length !== 0 ? (data.find((item) => item.id === id))?.name : undefined;
}

export const parseId2Price = (id: string | number, data: { id: string | number, price: number }[]) => {
  return data.length !== 0 && (data.find((item) => item.id === id))?.price;
}