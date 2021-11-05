import React, { FC, useEffect, useState } from "react";
import useStorage from "../hooks/useStorage.js"
import { productSearch } from "../api"
import styles from "../styles.css";

interface ProductProps { data: any, sellerAdded: any }

const Product: FC<ProductProps> = ({ data, sellerAdded }) => {

    const { setMatcherState } = useStorage();

    const [product, setProduct] = useState(data)

    const getProduct = async () => {
        console.log("INTO")
        const { success, data: response } = await productSearch({ search: data.productName });
        if (success) {
            setProduct(response.find((item) => item.productId == data.productId))
            setMatcherState(response.find((item) => item.productId == data.productId));
        }
    }

    useEffect(() => {
        getProduct();
    }, [])

    return (product && <div className={`${styles.main_product}`}>
        <img src={product.items[0].images[0].imageUrl} alt="" className="w4" />
        <div className="f3 tc pa7">
            <p>ID: {product.productId}</p>
            <p>{product.productName}</p>
            <p>PLU: {product.items[0].itemId}</p>
            <p>vendido por:</p>
            <ul>
                {product.items[0].sellers.map((seller) => <li>
                    <p>{seller.sellerName}</p>
                </li>)}
            </ul>
            <div className={`${styles.main_product__seller_added}`}>
                <h3>Añadidos:</h3>
                <p className={`${styles.main_product__empty_seller_added}`}>{!sellerAdded && "Aún no has agregado un vendedor nuevo"}</p>
                <ul>
                {sellerAdded && [sellerAdded].map((seller) => <li>
                        <p>{seller.currentSeller.sellerName} - {seller.currentSeller.sellerId}</p>
                    </li>)}
                </ul>
            </div>
        </div>
    </div>)
}

export default Product;