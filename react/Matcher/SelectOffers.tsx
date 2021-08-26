import React, { FC, useEffect, useState } from "react";
import { PageBlock, Input } from 'vtex.styleguide';
import Select from "../components/Select";
import Product from "../components/Product";
import useSearch from "../hooks/useSearch.js"
import useStorage from "../hooks/useStorage.js"

const SelectOffers: FC = () => {

    const { products, getProducts } = useSearch();
    const { setMatcherState } = useStorage();
    const [search, setSearch] = useState("");

    const handleSelected = (selected) => {
        console.log("handleSelected 2", selected);
        setMatcherState({ multiOffers: selected[0] });
    }

    const handleSearchInput = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        getProducts({ query: search });
    }, [search])

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
                        multiple={false}
                        onSelected={handleSelected} 
                    />
                </div>
            </div>
        </PageBlock>
    )
}

export default SelectOffers;