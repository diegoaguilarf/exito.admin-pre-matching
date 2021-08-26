import { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import SEARCH_GRAPHQL from '../graphql/getProducts.graphql';

const useSearch = () => {

    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");

    const { data, loading } = useQuery(SEARCH_GRAPHQL, {
        variables: {
            query
        },
        fetchPolicy: "no-cache"
    });

    const getProducts = ({ query }) => {
        setQuery(query)
    }

    useEffect(() => {
        if (data, query) {
            setProducts(data.products);
        }
    }, [loading, data])

    return { products, getProducts }

}

export default useSearch;