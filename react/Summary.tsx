import React, { useEffect, useState } from "react";
import { Layout, PageBlock, Spinner, Button } from "vtex.styleguide";
import Product from "./components/Product";
import ProductItem from "./components/ProductItem";
import useStorage from "./hooks/useStorage.js";
import { withApollo } from 'react-apollo';
import GET_SUGGESTION from "./graphql/getSuggestion.graphql"
import Actions from "./Summary/Actions"
import sleep from "./utils/sleep"

const headers = {
    'X-VTEX-API-AppKey': 'vtexappkey-exito-NPAJZQ',
    'X-VTEX-API-AppToken': 'KXRDLKLVRJIWCAAHAROACAOLDBQIEEHRVFWHIXQLIONPGZYBBWQZQAOJIFAKTDQNCQBXDTZDBCSNMYFEDPGINIAURMYCXGSFXANPYBYIWNXOIAXJZVGEWIATPHFQUWGV',
    'Content-Type': 'application/json'
};

const MatcherSummary = (props) => {

    const { matcherState: state, loadingState } = useStorage();

    const [currentItem, setCurrentItem] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!loadingState) {
            console.log(state.mainProduct);
        }
    }, [loadingState])

    useEffect(() => {
        if (currentItem) {
            console.log(currentItem);
        }
    }, [currentItem])

    const doSuggestion = async () => {
        setLoading(true);
        await changeNotificationWithSKU({ skuId: currentItem.itemId });
        const { data: mainSKU } = await getSKU(state.mainProduct.items[0].itemId)
        const { data: offerSKUs } = await getSKU(currentItem.itemId)
        console.log("offerSKUs", offerSKUs)
        await sendSKUSuggestion({ mainSKU, offerSKUs })
        const { data: suggestion } = await getSuggestion()
        await sleep(20000);
        await doMatch({ suggestion })
        setLoading(false);
        window.location.href =`${window.location.origin}/admin/app/matcher`;
    }

    const changeNotificationWithSKU = async ({ skuId }) => {
        try {
            const URL = `/api/catalog_system/pvt/skuseller/changenotification/${skuId}`
            const response = await fetch(URL, {
                method: "POST",
                headers
            })
            const json = await response.json();
            console.log("done 1");
            return { success: true, data: json }
        } catch (error) {
            console.log("failed 1", error);
            return { success: false, data: error }
        }
    }

    const getSKU = async (skuId) => {
        try {
            const URL = `/api/catalog_system/pvt/sku/stockkeepingunitbyid/${skuId}`
            const response = await fetch(URL, {
                method: "GET",
                headers
            })
            const json = await response.json();
            console.log("done 2");
            return { success: true, data: json }
        } catch (error) {
            console.log("failed 2", error);
            return { success: false, data: error }
        }
    }

    const sendSKUSuggestion = async ({ mainSKU, offerSKUs }) => {
        try {
            const { ComplementName, ProductId, ProductDescription, BrandName, SkuName, Dimension, ProductCategories, Images, ProductSpecifications, UnitMultiplier, SkuSpecifications, MeasurementUnit, ProductRefId, AlternateIds } = mainSKU;
            const seller = offerSKUs.SkuSellers.find((item) => item.SellerId == currentItem.currentSeller.sellerId);
            const payload = {
                ProductName: ComplementName,
                ProductId,
                ProductDescription,
                BrandName,
                SkuName,
                SellerId: seller.SellerId,
                Height: Dimension.height,
                Width: Dimension.width,
                Length: Dimension.length,
                WeightKg: Dimension.weight,
                RefId: ProductRefId,
                EAN: AlternateIds.Ean,
                SellerStockKeepingUnitId: seller.SellerStockKeepingUnitId,
                CategoryFullPath: Object.values(ProductCategories).join("/"),
                SkuSpecifications,
                ProductSpecifications,
                Images,
                MeasurementUnit,
                UnitMultiplier,
                AvailableQuantity: currentItem.currentSeller.commertialOffer.AvailableQuantity,
                Pricing: {
                    Currency: "COP",
                    SalePrice: currentItem.currentSeller.commertialOffer.Price,
                    CurrencySymbol: "$"
                }
            }
    
            const URL = `/_v/suggestions`
            const BODY = {
                accountName: "exito",
                payload,
                sellerId: seller.SellerId,
                sellerSku: offerSKUs.Id
            }
            const response = await fetch(URL, {
                method: "POST",
                headers,
                body: JSON.stringify(BODY)
            })
            const json = await response.json();
            console.log("done 3");
            return { success: true, data: json }
        } catch (error) {
            console.log("failed 3", error);
            return { success: false, data: error }
        }
    }

    const getSuggestion = async () => {
        try {    
            const sellerId = currentItem.currentSeller.sellerId;
    
            const { data } = await props.client.query({
                query: GET_SUGGESTION,
                variables: {
                    searchInput: {
                        sellerId: sellerId,
                        term: currentItem.itemId
                    }
                }
            });
            console.log("done 4");
            const suggestion = data.searchSuggestions.data.find(item => item.itemId == currentItem.itemId);
            console.log("getSuggestion", data.searchSuggestions.data);
            return { success: true, data: suggestion }
        } catch (error) {
            console.log("failed 4", error);
            return { success: false, data: error }
        }
    }

    const doMatch = async ({ suggestion }) => {
        console.log("suggestion", suggestion)
        try {
            const payload = {
                matcherId: suggestion.matches[0].matchId,
                matchType: "itemMatch",
                score: "100",
                skuRef: state.mainProduct.items[0].itemId,
                sku: {
                    name: suggestion.content.skuName,
                    eans: suggestion.content.eans,
                    refId: suggestion.content.refId,
                    height: suggestion.content.height,
                    with: suggestion.content.width,
                    unitMultiplier: suggestion.matches[0].sku.unitMultiplier,
                    measurementUnit: suggestion.matches[0].sku.measurementUnit,
                    specifications: suggestion.matches[0].sku.specifications,
                    images: {
                        "imagem1.jpg": JSON.stringify([suggestion.content.images[0].imageUrl])
                    }
                }
            }
            const sellerId = suggestion.sellerId;
            const sellerSkuId = suggestion.itemId;
            const version = suggestion.latestVersionId;
            const matchId = suggestion.matches[0].matchId;
            const URL = `/_v/matching`
            const BODY = {
                accountName: "exito",
                payload,
                sellerId,
                sellerSkuId,
                version,
                matchId
            }
            const response = await fetch(URL, {
                method: "POST",
                headers,
                body: JSON.stringify(BODY)
            })
            const json = await response.json();
            console.log("done 5");
            return { success: true, data: json }
        } catch (error) {
            console.log("failed 5", error);
            return { success: false, data: error }
        }
    }

    return (<Layout>
        <div>
            <h1>Resumen</h1>
        </div>
        <PageBlock>
            <div className="w-100 flex">
                <div className="w-40">
                    <h3>Commercial</h3>
                    {!loadingState && <Product data={state.mainProduct} />}
                </div>
                <div className="w-60">
                    <h3>Marketplace</h3>
                    <div>
                        {!loadingState && [state.multiOffers].map(product => {
                            return <ProductItem data={product} onFinish={(item) => setCurrentItem(item)}/>
                        })}
                    </div>
                </div>
            </div>
        </PageBlock>
        <PageBlock>
            <Actions onClick={doSuggestion}/>
        </PageBlock>
        {loading && <div className="fixed absolute--fill flex justify-center items-center" style={{ background: "#ffffffcf" }}>
            <Spinner />
        </div>}
    </Layout>)
}

export default withApollo(MatcherSummary);