import { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import { pathOr } from 'ramda';
import getDocuments from '../graphql/getDocuments.graphql';
import { documentsSerializer } from '../utils/serializer';

const useInitialState = () => {
  const { data, loading, error } = useQuery(getDocuments, {
    variables: {
      acronym: "PR",
      fields: ["main_sku", "main_name", "similar_sku", "similar_name", "percentage"]
    },
    fetchPolicy: "no-cache"
  });

  const [search, setSearch] = useState('');

  // Pagination
  const [currentItemFrom, setCurrentItemFrom] = useState(1);
  const [currentItemTo, setCurrentItemTo] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableLength, setTableLength] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  // Data
  const [slicedData, setSlicedData] = useState([]);
  const [mainData, setMainData] = useState([]);

  const setInitialState = () => {
    setSlicedData(mainData.slice(currentItemFrom - 1, tableLength * currentPage));
    setTotalItems(mainData.length);
  };

  useEffect(() => {
    if (mainData?.length) {
      setInitialState();
    }
  }, [mainData]);

  useEffect(() => {
    setMainData(documentsSerializer(pathOr([], ['documents'], data)))
  }, [data, loading, error]);

  useEffect(() => {
    const results = mainData.filter(item =>
      item.name.toLowerCase().includes(search)
    );
    setSlicedData(results);
  }, [search]);

  return [search, setSearch,
    currentItemFrom, setCurrentItemFrom,
    currentItemTo, setCurrentItemTo,
    currentPage, setCurrentPage,
    tableLength, setTableLength,
    totalItems,
    slicedData, setSlicedData,
    mainData
  ];
}

export default useInitialState;
