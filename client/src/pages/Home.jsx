import React from "react";
import HeaderDisplay from "@/components/custom/HeaderDisplay";
import FilterMenu from "@/components/custom/FilterMenu";
import ProductList from "@/components/custom/ProductList";
import Footer from "@/components/custom/Footer";

const Home = ()=>{
    return(<div>
    <HeaderDisplay/>

    <FilterMenu/>

    <ProductList/>

    <Footer/> 
    </div>
    )
}
export default Home;