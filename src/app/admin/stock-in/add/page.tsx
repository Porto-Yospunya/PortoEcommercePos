// "use client";

// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { ChangeEvent, useEffect, useState } from "react";
// import { Plus, Minus, Trash2 } from "lucide-react";
// import { useProductContext } from "@/contexts/product.context";
// import { formatCurrency } from "@/utils/formatter";
// import { formatDatetime } from "@/utils/formatter";
// import { parseId2Name, parseId2Price } from "@/utils/parse";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ErrorAlert } from "@/components/ui/alert";
// import { useRouter } from "next/navigation";

// const headers = ["Product Id", "Product Name", "Price", "Q'ty", "Total", "Actions"];

// export default function Add() {

//   const router = useRouter();
//   const { data: session } = useSession();
//   const { products } = useProductContext();
//   const [quantity, setQuantity] = useState(1);
//   const [id, setId] = useState("");

//   const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: zodResolver(receiptSchema) });

//   const handleEnterId = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     const hasProduct = products.some((product) => product.id === id);

//     if (event.key === "Enter") {
//       event.preventDefault();

//       if (id !== "" && hasProduct) {
//         setItems((prev) => {
//           const isDuplicate = prev.some((pre) => pre.product_id === id);
//           const unit_cost = products.find((product) => product.id === id)?.price ?? 0;

//           console.log(unit_cost)

//           if (!isDuplicate) {
//             return [{ product_id: id, quantity, unit_cost }, ...prev];
//           }

//           return prev.map((pre) =>
//             pre.product_id === id
//               ? { ...pre, quantity: pre.quantity + quantity, unit_cost }
//               : pre
//           );
//         });
//       }

//       setId("");
//     }
//   }

//   const handleIncreaseItem = (id: string) => {
//     setItems((prev) => {
//       return prev.map((pre) =>
//         pre.product_id === id
//           ? { ...pre, quantity: pre.quantity + 1 }
//           : pre
//       );
//     });
//   }

//   const handleDecreaseItem = (id: string) => {
//     setItems((prev) => {
//       return prev.map((pre) =>
//         pre.product_id === id
//           ? { ...pre, quantity: pre.quantity > 1 ? pre.quantity - 1 : 1 }
//           : pre
//       );
//     });
//   }

//   const handleDeleteItem = (index: number) => {
//     if (items.length === 0) return;

//     setItems((prev) => prev.filter((_, i) => i !== index))
//   }

//   const onSubmit = async (data: ReceiptSchemaType) => {
//     try {
      
//       router.push("/admin/stock-in");
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   useEffect(() => {
//     setValue("items", items);

//     if (session?.user?.id) {
//       setValue("received_by", session.user.id);
//     }
//   }, [session, items, setValue]);

//   return (
//     <div className="relative h-full flex flex-col gap-4">

//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold">Add Receipt</h1>
//         <Link className="btn-red-500 hover:btn-red-800" href="/admin/stock-in">Back</Link>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

//         <div className="bg-white border-2 border-gray-200 rounded p-4">

//           <div className="label">
//             <label className="grid-cols-2">Reference Code {errors.ref_code && <ErrorAlert message={errors.ref_code.message} />}</label>
//             <input type="text" {...register("ref_code")} />
//           </div>

//           <div className="label">
//             <label>Date Received</label>
//             <input type="text" value={formatDatetime(new Date)} disabled className="bg-gray-200 text-gray-600" />
//           </div>

//           <div className="label">
//             <label>Received By</label>
//             <input type="text" value={session?.user.name ?? ""} disabled className="bg-gray-200 text-gray-600 px-2 py-1 border-2 border-gray-200" />
//           </div>

//         </div>

//         <div className="flex justify-between items-center gap-4 bg-white border-2 border-gray-200 rounded p-4">

//           <div className="flex gap-4">
//             <div className="label w-120">
//               <label>Product Id</label>
//               <input
//                 type="text"
//                 value={id}
//                 onKeyDown={handleEnterId}
//                 onChange={(event: ChangeEvent<HTMLInputElement>) => setId(event.target.value)}
//               />
//             </div>

//             <div className="label w-20">
//               <label>Amount</label>
//               <input
//                 type="number"
//                 className="w-full"
//                 defaultValue={1}
//                 onChange={(event: ChangeEvent<HTMLInputElement>) => setQuantity(Number(event.target.value))}
//               />
//             </div>
//           </div>

//           <div className="grid gap-2 justify-end items-center h-fit">
//             <button type="submit" className="btn-green-500 hover:btn-green-800">Add to inventory</button>
//             <div>
//               Total Items: {items.length}
//             </div>
//           </div>

//         </div>

//       </form>

//       <div className="overflow-y-auto max-h-[calc(50vh-3.5rem)] bg-white">
//         <table className="table-field w-full">
//           <thead>
//             <tr className="border-y-2 border-gray-200">
//               {headers.map((label, index) => (
//                 <th
//                   key={index}
//                   className={`
//                 text-gray-500 text-left sticky top-0 z-20 bg-white
//                   `}
//                 >
//                   {label}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, index) => {
//               const price = Number(parseId2Price(item.product_id, products))

//               return (
//                 <tr key={index} className="border-b border-gray-200">
//                   <td>{item.product_id}</td>
//                   <td>{parseId2Name(item.product_id, products)}</td>
//                   <td>{formatCurrency(price)}</td>
//                   <td>
//                     <div className="flex gap-2 items-center">
//                       <button onClick={() => handleDecreaseItem(item.product_id)} className="hover:bg-gray-200 h-fit p-0.5 rounded cursor-pointer"><Minus width={16} height={16} /></button>
//                       <span>
//                         <input
//                           type="text"
//                           className="w-8 px-1 text-center"
//                           value={item.quantity}
//                           onChange={(event: ChangeEvent<HTMLInputElement>) => {
//                             setItems((prev) => {
//                               return prev.map((pre) =>
//                                 pre.product_id === item.product_id
//                                   ? { ...pre, quantity: Number(event.target.value) }
//                                   : pre
//                               );
//                             });
//                           }}
//                         />
//                       </span>
//                       <button onClick={() => handleIncreaseItem(item.product_id)} className="hover:bg-gray-200 h-fit p-0.5 rounded cursor-pointer"><Plus width={16} height={16} /></button>
//                     </div>
//                   </td>
//                   <td>{formatCurrency(item.quantity * price)}</td>
//                   <td>
//                     <button
//                       onClick={() => handleDeleteItem(index)}
//                       className="border-2 border-gray-200 p-1 rounded mx-1 hover:bg-gray-200 hover:text-black text-red-500 cursor-pointer"
//                     >
//                       <Trash2 width={20} height={20} />
//                     </button>
//                   </td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// }