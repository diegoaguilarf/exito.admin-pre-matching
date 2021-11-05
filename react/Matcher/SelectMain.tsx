import React, { FC, useCallback, useEffect, useState } from "react";
import { PageBlock, Input } from 'vtex.styleguide';
import debounce from "lodash.debounce"
import Select from "../components/Select";
import Product from "../components/Product";
import useStorage from "../hooks/useStorage.js"
import { productSearch } from "../api"

const SelectMain: FC = () => {

    const { setMatcherState } = useStorage();

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);

    const handleSelected = (selected) => {
        setMatcherState({ mainProduct: selected[0] });
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

    return (<PageBlock>
        <div>
            <div>
                <h3>
                    <span>1.</span>
                    Escoger producto principal
                </h3>
                <p>Escoge el producto principal el cual va a tener la multioferta.</p>
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
                    onSelected={handleSelected}
                />
            </div>
        </div>
    </PageBlock>)
}

export default SelectMain;