import React, { useState } from "react";

const Sellers = ({ item, onFinish }) => {

    const [selected, setSelected] = useState(null)

    const handleSellers = (seller) => {
        onFinish({ ...item, currentSeller: seller });
        setSelected(seller)
    }

    const isSameSeller = (seller) => {
        if (!selected) {
            return '';
        }
        
        if (seller.sellerName == selected.sellerName) {
            return 'b--dark-green bw2';
        }
        return '';
    }

    return (<ul className="flex flex-column pt4">
        {item.sellers.map(seller => (<li className={`${isSameSeller(seller)} ba pa4 mb4`} onClick={() => handleSellers(seller)}>
            <p>{seller.sellerName}</p>
            <p>Price: {seller.commertialOffer.Price}</p>
            <p>quantity: {seller.commertialOffer.AvailableQuantity}</p>
        </li>))}
    </ul>)
}

export default Sellers;