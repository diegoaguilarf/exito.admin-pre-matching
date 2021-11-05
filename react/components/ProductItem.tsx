import React, { FC } from "react";
import styles from "../styles.css";
import Sellers from "./Sellers";

interface ProductProps { data: any, onFinish: (item: any) => void }

const ProductItem: FC<ProductProps> = ({ data, onFinish }) => {

    return (<div className={`${styles.product_item} w-100 flex ba pa4 mb4 br2 b--silver`}>
        <img src={data.items[0].images[0].imageUrl} alt="" className={`${styles.product_item__image} w4`} />
        <div className="f3 pl6">
            <p>ID: {data.productId}</p>
            <p>{data.productName}</p>
            <ul className="list">
                {data.items.map((item) => {
                    return (<li className={`ba pv2 ph4 mb4 br2`} >
                        <div>
                            <p>PLU: {item.itemId}</p>
                        </div>
                        <Sellers item={item} onFinish={onFinish} />
                    </li>)
                })}
            </ul>
        </div>
    </div>)
}

export default ProductItem;