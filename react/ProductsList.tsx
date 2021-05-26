import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Layout, PageBlock, PageHeader, Table, Input } from 'vtex.styleguide';
import ModalAsignation from './ModalAsignation';
import ModalDecline from './ModalDecline';
import useInitialState from './hooks/useInitialState.js';

import './styles.global.css'

const ProductsList: FC = () => {
  const [search, setSearch, 
    currentItemFrom, setCurrentItemFrom, 
    currentItemTo, setCurrentItemTo,
    currentPage, setCurrentPage,
    tableLength, setTableLength,
    totalItems,
    slicedData, setSlicedData,
    mainData
  ] = useInitialState();

  const jsonschema = {
    properties: {
      main: {
        title: 'Principal',
        cellRenderer: ({ rowData }: any) => {
          return (
            <div>
              <h4>{rowData.main_name}</h4>
              <h5>SKU: {rowData.main_sku}</h5>
            </div>
          )
        },
      },
      similar: {
        title: 'Similar',
        cellRenderer: ({ rowData }: any) => {
          return (
            <div>
              <h4>{rowData.similar_name}</h4>
              <h5>SKU: {rowData.similar_sku}</h5>
            </div>
          )
        },
      },
      percentage: {
        title: "Porcentaje",
        width: 100,
        cellRenderer: ({ rowData }: any) => {
          return (
            <p>{rowData.percentage}</p>
          )
        }
      },
      actions: {
        title: "Acciones",
        cellRenderer: ({ rowData }: any) => {
          return (
            <div className="flex flex-column">
              <div className="mb3">
                <ModalAsignation nameProduct={rowData.name}/>
              </div>
              <div>
                <ModalDecline nameProduct={rowData.name}/>
              </div>
            </div>
          )
        },
      }
    },
  }

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  }

  const handleNextClick = () => {
    const newPage = currentPage + 1;
    const itemFrom = currentItemTo + 1;
    const itemTo = tableLength * newPage;
    const data = mainData.slice(itemFrom - 1, itemTo);
    goToPage(newPage, itemFrom, itemTo, data)
  }

  const handlePrevClick = () => {
    if (currentPage === 0) return;
    const newPage = currentPage - 1;
    const itemFrom = currentItemFrom - tableLength;
    const itemTo = currentItemFrom - 1;
    const dataSliced = mainData.slice(itemFrom - 1, itemTo);
    goToPage(newPage, itemFrom, itemTo, dataSliced);
  };

  const handleRowsChange = (e: any, value: any) => {
    setTableLength(parseInt(value));
    setCurrentItemTo(parseInt(value));
    setSlicedData(mainData.slice(0, parseInt(value)));
  };

  const goToPage = (currentPage, currentItemFrom, currentItemTo, getData) => {
    setCurrentPage(currentPage);
    setCurrentItemFrom(currentItemFrom);
    setCurrentItemTo(currentItemTo);
    setSlicedData(getData);
  }

  return (
    <React.Fragment>
      <Layout>
        <PageHeader
          title={<FormattedMessage id="products-list.navigation.label"/>}
          variation="null"
        />
        <PageBlock>
          <Input
            placeholder="Buscar..."
            size="small"
            onChange={handleSearchInput}
            name="product"
            value={search}
          />
          <Table
            schema={jsonschema}
            items={slicedData}
            dynamicRowHeight={true}
            fullWidth={true}
            pagination={{
              onNextClick: handleNextClick,
              onPrevClick: handlePrevClick,
              onRowsChange: handleRowsChange,
              currentItemFrom: currentItemFrom,
              currentItemTo: currentItemTo,
              textShowRows: 'Show rows',
              textOf: 'of',
              totalItems: totalItems,
              rowsOptions: [5, 10, 15, 25],
            }}
          />
        </PageBlock>
      </Layout>
    </React.Fragment>
  );
};

export default ProductsList
