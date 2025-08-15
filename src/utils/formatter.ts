import moment from "moment";

export const formatDatetime = (datetime: Date) => {
  return moment(datetime).format("YYYY-MM-DD HH:mm:ss");
} 

export const formatCurrency = (price: number) => {
  return price.toLocaleString("th-BK", { style: "currency", currency: "THB" });
}