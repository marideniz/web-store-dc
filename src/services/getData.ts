import Products from "../mockData/mockProducts.json";
import axios from "axios";

export const getData = async () => {
    try {
        return Products.Products;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export const getAllProducts = async ()=>{
    try {
        return await axios.get("/api/admin/products");
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
export const getDataBySearch = async (search: string) => {
    try {
        const foundProducts = Products.Products.filter(product =>
            product.title.toLowerCase().includes(search.toLowerCase()) &&
            product.description.toLowerCase().includes(search.toLowerCase())
        );

        return foundProducts;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
