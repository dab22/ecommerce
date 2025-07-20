// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { use, useEffect, useState } from "react";

// import { Input } from "@/components/ui/input"
// import { setProducts } from "@/redux/slices/productSlice";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";


// const categoryData={
//     trigger : "Category",
//     items :["keyboard", "mouse", "headset"],
// };

// const priceData={
//     trigger : "Price",
//     items:[1000, 3000, 5000, 8000],
// };

// const FilterMenu = () => {

//     const[category, setCategory] = useState("");
//     const[price, setPrice] = useState("");
//     const[search, setSearch] = useState("");


//     const dispatch = useDispatch();
//     useEffect(()=>{
//       const getFilterProducts = async()=>{
//         const res = await axios.get(import.meta.env.VITE_API_URL + `/get-products?category=${category}&price=${price}&search=${search}`);

//         const data = await res.data;
//         dispatch(setProducts(data.data));
//       };
//       getFilterProducts();
//     },[category, price, search])

//   return (
//     <div className="w[93vw] flex flex-col sm:flex-row justify-between items-center mx-auto my-10 gap-3 sm:gap-0">
//       <div className="flex sm:w-[30%] w-full gap-3">
//         <Select onValueChange={(value)=>setCategory(value)}>
//           <SelectTrigger id={categoryData.trigger}>
//             <SelectValue placeholder={categoryData.trigger} />
//           </SelectTrigger>
//           <SelectContent position="popper">
//             {categoryData.items.map((item)=>(
//                 <SelectItem key={item} value={item} className="capitalize">
//                     {item}
//                 </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Select onValueChange={(value)=>setPrice(value)}>
//           <SelectTrigger id={priceData.trigger}>
//             <SelectValue placeholder={priceData.trigger} />
//           </SelectTrigger>
//           <SelectContent position="popper">
//             {priceData.items.map((item)=>(
//                 <SelectItem key={item} value={item} className="capitalize">
//                     Less Than {item}
//                 </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="sm:w-[60%] w-full">
//       <Input id="search" placeholder="Search Here..." onChange={(e)=>setSearch(e.target.value)} />
//       </div>
//     </div>
//   );
// };
// export default FilterMenu;






















import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { use, useEffect, useState } from "react";

import { Input } from "@/components/ui/input"
import { setProducts } from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


const categoryData={
    trigger : "Category",
    items :["laptop", "earbuds", "mobile"],
};

const priceData={
    trigger : "Price",
    items:[1000, 10000, 20000, 50000, 100000],
};

const FilterMenu = () => {

    const[category, setCategory] = useState("");
    const[price, setPrice] = useState("");
    const[search, setSearch] = useState("");


    const dispatch = useDispatch();
    useEffect(()=>{
      const getFilterProducts = async()=>{
        // console.log(`${import.meta.env.VITE_API_URL}/get-products?category=${category}&price=${price}&search=${search}`);

        const res = await axios.get(import.meta.env.VITE_API_URL + `/get-products?category=${category}&price=${price}&search=${search}`);

        const data = await res.data;
        dispatch(setProducts(data.data));
      };
      getFilterProducts();
    },[category, price, search])

  return (
    <div className="w[93vw] flex flex-col sm:flex-row justify-between items-center mx-auto my-10 gap-3 sm:gap-0">
      <div className="flex sm:w-[30%] w-full gap-3">
        <Select onValueChange={(value)=>setCategory(value)}>
          <SelectTrigger id={categoryData.trigger}>
            <SelectValue placeholder={categoryData.trigger} />
          </SelectTrigger>
          <SelectContent position="popper">
            {categoryData.items.map((item)=>(
                <SelectItem key={item} value={item} className="capitalize">
                    {item}
                </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value)=>setPrice(value)}>
          <SelectTrigger id={priceData.trigger}>
            <SelectValue placeholder={priceData.trigger} />
          </SelectTrigger>
          <SelectContent position="popper">
            {priceData.items.map((item)=>(
                <SelectItem key={item} value={item} className="capitalize">
                    Less Than {item}
                </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="sm:w-[60%] w-full">
      <Input id="search" placeholder="Search Here..." onChange={(e)=>setSearch(e.target.value)} />
      </div>
    </div>
  );
};
export default FilterMenu;
