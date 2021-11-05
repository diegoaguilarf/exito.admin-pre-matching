import React, { FC, useState, useCallback } from "react";
import { PageBlock, Input } from 'vtex.styleguide';
import debounce from "lodash.debounce"
import Select from "../components/Select";
import Product from "../components/Product";
import useStorage from "../hooks/useStorage.js"
import { productSearch } from "../api"

const SelectOffers: FC = () => {

    const { setMatcherState } = useStorage();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const handleSelected = (selected) => {
        setMatcherState({ multiOffers: selected });
    }

    const handleSearchInput = (e) => {
        debouncedGetProducts(e.target.value);
        setSearch(e.target.value);
    }

    const getProducts = async (searchValue) => {
        const { success, data } = await productSearch({ search: searchValue });
        if (success) {
            setProducts(data)
        }
    }

    const debouncedGetProducts = useCallback(debounce((searchValue) => getProducts(searchValue), 1500), []);

    return (
        <PageBlock>
            <div>
                <div>
                    <h3>
                        <span>2.</span>
                        Escoger productos de la multioferta
                    </h3>
                    <p>Escoge los productos que aparecearan dentro de la multioferta.</p>
                </div>
                <Input
                    placeholder="SKU, Product Id, Name"
                    size="large"
                    onChange={handleSearchInput}
                    name="product"
                    value={search}
                />
                <div className="pa5 flex flex-wrap justify-start">
                    <Select 
                        items={products} 
                        itemComponent={Product} 
                        identifier="productId" 
                        multiple={true}
                        onSelected={handleSelected} 
                    />
                </div>
            </div>
        </PageBlock>
    )
}

export default SelectOffers;