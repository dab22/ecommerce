import { Colors } from "@/constants/colors";
import { starsGenerator } from "@/constants/helper";
import { Circle, PlayCircle } from "lucide-react";
import React, {useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReviewsComponent from "@/components/custom/ReviewsComponent";
import { useNavigate, useParams } from "react-router-dom";
import useErrorLogout from "@/hooks/use-error-logout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { addToCart } from "@/redux/slices/cartSlice";
import useRazorpay from "@/hooks/use-razorpay";

const productStock = 5;

const Product = () => {
  const { productName } = useParams();

  const [productQuantity, setProductQuantity] = useState(1);
  const [pincode, setPinCode] = useState("");
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [purchaseProduct, setPurchaseProduct] = useState(false);
  const [address, setAddress] = useState("");

  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [productColor, setProductColor] = useState("");

  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state)=>state.auth);

  const {generatePayment, verifyPayment} = useRazorpay();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProductByName = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + `/get-product-by-name/${productName}`
        );

        const { data } = await res.data;

        setProduct(data);
      } catch (error) {
        useErrorLogout(error, "error ouccred while fetching product");
      }
    };
    fetchProductByName();
  }, [productName]);


  const calculateEmi = (price)=> Math.round(price/6);

  const checkAvailability = async () => {
    if (pincode.trim() === "") {
      setAvailabilityMessage("please enter a valid pincode");
      return;
    }
    
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + `/get-pincode/${pincode}`
      );
      const data = res.data;
      setAvailabilityMessage(data?.message || "No availability info found.");
    } catch (error) {
      setAvailabilityMessage("Error fetching availability.");
    }
  };
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (productColor == "") {
      toast.message("Please select the color");
      return;
    }

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.images[0].url,
        color: productColor,
        stock: product.stock,
        blacklisted: product.blacklisted,
      })
    );
    
    setProductQuantity(1);
    
    toast.message("Product added to cart");
  };

  const handleBuyNow = async()=>{
      if(!isAuthenticated){
        navigate("/login");
        return;
      }
      if(productQuantity > product.stock){
        toast.message("Product is out of stock");
        return;
      }
      if(product.blacklisted){
        toast.message("Product is not avaliable for purchase");
        return;
      }
      if(productColor==""){
        toast.message("Please select the color");
        return;
      }
  
      const order = await generatePayment(product.price * productQuantity);
      await verifyPayment(order, [{id: product._id, quantity: productQuantity, color: productColor}],
        address
      );
      setPurchaseProduct(false);
    };

  return (
    <>
      <div>
        <main className="w-[93vw] lg:w-[70vw] flex flex-col sm:flex-row justify-start items-start gap-10 mx-auto my-10">
          <div className="grid sm:w-[50%] gap-3">
            <img
              src={product?.images?.[selectedImage]?.url}
              className="w-full lg:h-[30rem] rounded-xl object-center object-cover border dark:border-none"
            ></img>

            <div className="grid grid-cols-4 gap-3">
              {product?.images?.map(({ url, id }, index) => (
                <img
                  src={url}
                  key={id}
                  onClick={() => setSelectedImage(index)}
                  className="rounded-xl filter hover:brightness-50 cursor-pointer transition-all ease-in-out duration-300 border dark:border-none"
                />
              ))}
            </div>
          </div>

          <div className="sm:w[50%] lg:w[30%]">
            <div className="pb-5">
              <h2 font-extrabold text-2xl>
                {product?.name}
              </h2>

              <p className="text-sm my-2">{product?.description}</p>

              <div className="flex items-center">
                {product?.rating
                  ? starsGenerator(
                      product.rating,
                      "0",
                      15,
                    )
                  : null}
                <span className="text-md ml-1">
                  ({product?.reviews?.length || 0})
                </span>
              </div>
            </div>

            <div className="py-5 border-t border-b">
              <h3 className="font-bold text-xl">₹{product.price} or ₹{calculateEmi(product.price)}/month</h3>
              <p text-sm>Suggested payments with 6 months special financing</p>
            </div>

            <div className="py-5 border-b">
              <h3 className="font-bold text-lg">Choose Color</h3>

              <div className="flex items-center my-2">
              {product?.colors?.map((color, index)=> (
                <Circle
                    key={index + color}
                  fill={color}
                  strokeOpacity={0.2}
                  strokeWidth={0.2}
                  size={40}
                  onClick={()=> setProductColor(color)}
                  className="cursor-pointer filter hover:brightness-50"
                />
                ) )}
                
                  
              </div>
            </div>

            <div className="py-5">
              <div className="flex gap-3 items-center">
                <div className="flex items-center gap-5 bg-gray-100 rounded-full px-3 py-2 w-fit ">
                  <Minus
                    stroke={Colors.customGray}
                    className="cursor-pointer"
                    onClick={() =>
                      setProductQuantity((qty) => (qty > 1 ? qty - 1 : 1))
                    }
                  />
                  <span className="text-slate-950">{productQuantity}</span>
                  <Plus
                    stroke={Colors.customGray}
                    className="cursor-pointer"
                    onClick={() =>
                      setProductQuantity((qty) =>
                        qty < product.stock ? qty + 1 : qty
                      )
                    }
                  />
                </div>

                {product.stock - productQuantity > 0 && (
                  <div className="grid text-sm font-semibold text-gray-600">
                    <span>
                      Only{" "}
                      <span className="text-customYellow">
                        {product.stock - productQuantity} items{" "}
                      </span>
                      left!
                    </span>
                    <span>Don't miss it</span>
                  </div>
                )}
              </div>

              <div className="grid gap-3 my-5">
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter your pincode "
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                  <Button onClick={checkAvailability}>Check Avalibility{" "}</Button>
                </div>
                <p className="text-sm px-2">{availabilityMessage}</p>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setPurchaseProduct(true)}>
                  Buy Now
                </Button>
                <Button variant="outline" onClick={handleAddToCart}>Add to Cart</Button>
              </div>

              {purchaseProduct && (
                <div className="my-2 space-y-2">
                  <Input
                    placeholder="Enter your Address here ..."
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Button onClick={handleBuyNow}>Confirm Order</Button>
                </div>
              )}
            </div>
          </div>
        </main>

        <ReviewsComponent productId={product?._id}/>
      </div>
    </>
  );
};

export default Product;
