import React, { FC } from "react";

interface ProductProps { data: any }

const Product: FC<ProductProps> = ({ data }) => {
    return (<div className="w5">
        <img src={data.items[0].images[0].imageUrl} alt="" className="w-90" />
        <div className="f3 tc pa7">
            <p>ID: {data.productId}</p>
            <p>{data.productName}</p>
            <p>vendido por: {data.items[0].sellers[0].sellerName}</p>
        </div>
    </div>)
}

export default Product;