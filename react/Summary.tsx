import React, { useState } from "react";
import { Layout, PageBlock, Spinner, Button } from "vtex.styleguide";
import MainProduct from "./components/MainProduct";
import ProductItem from "./components/ProductItem";
import useStorage from "./hooks/useStorage.js";
import { withApollo } from 'react-apollo';
import Actions from "./Summary/Actions"
import sleep from "./utils/sleep"
import {
    deleteSuggestion,
    deleteSellerSKUBinding,
    getSKU,
    sendSKUSuggestion,
    getSuggestion,
    doMatch
} from "./api"
import styles from "./styles.css";

const MatcherSummary = (props) => {

    const { matcherState: state, loadingState } = useStorage();

    const [currentItem, setCurrentItem] = useState(null);
    const [loading, setLoading] = useState(false);


    const doSuggestion = async () => {

        setLoading(true);

        // STEP 1: obtener la informacion del producto principal(normalmente el comercial).
        const { data: mainSKU } = await getSKU(state.mainProduct.items[0].itemId)

        // STEP 2: obtener la informacion de cada vendedor que se escoga de otro producto(multioferta)
        const { data: offerSKUs } = await getSKU(currentItem.itemId)


        const { SellerId: sellerId, SellerStockKeepingUnitId: sellerSkuId } = offerSKUs.SkuSellers.find((item) => item.SellerId == currentItem.currentSeller.sellerId);


        // STEP 3:
        await deleteSuggestion({ sellerId, sellerSkuId })

        // STEP 4:
        await deleteSellerSKUBinding({ sellerId, sellerSkuId })

        await sleep(7000);

        // STEP 4: crear una sugerencia de producto
        await sendSKUSuggestion({ mainSKU, offerSKUs, currentItem })

        /* 
        NOTE: DE AQUI EN ADELANTE NO ES NECESARIO EN TODOS LOS CASOS PERO DE IGUAL MANERA SUCEDE.

            - Si la sugerencia queda con estado pending entonces buscamos la sugerencia(STEP 5) y hacemos el match(STEP 6)
            - Si la sugerencia fue aprobada, no hay manera de validarlo por lo tanto el flujo continua con 
              el STEP 5 Y STEP 6 pero aunque se hagan estos llamados innecesario el match no actuara y esto no genera ningun conflicto.
        */

        // STEP 5: obtener sugerencias de producto mediante el sku
        const { data: suggestion } = await getSuggestion({ client: props.client, sellerId, sellerSkuId, currentItem })
        console.log("suggestion", suggestion);
        // await sleep(35000);
        // // STEP 6: poner el score manualmente y hacer el join
        // await doMatch({ mainProduct: state.mainProduct, suggestion })
        // END: apaga el loading y redirecciona al comienzo.
        finish()

    }

    const finish = () => {
        setLoading(false);
        window.location.href = `${window.location.origin}/admin/app/matcher`;
    }

    return (<div className={`${styles.summary} w-100`}>
        <div className={`bb b--light-gray ph4`}>
            <h1>Resumen</h1>
        </div>
        <div className={`${styles.summary__content} bg-white w-100 flex`}>
            <div className={`${styles.original_product__summary} w-25 pa4 br b--light-gray`}>
                <div className={`${styles.original_product__header}`}>
                    <h2>Original</h2>
                    <p>Normalmente es un producto comercial</p>
                </div>
                {!loadingState && <MainProduct data={state.mainProduct} sellerAdded={currentItem} />}
            </div>
            <div className={`${styles.duplicated_products__summary} w-75 pa4`}>
                <div className={`${styles.duplicated_products__header}`}>
                    <h2>Repetidos</h2>
                    <p>Selecciona los vendedores que quieres trasladar</p>
                </div>
                <div>
                    {!loadingState && state.multiOffers.map(product => {
                        return <ProductItem data={product} onFinish={(item) => setCurrentItem(item)} />
                    })}
                </div>
            </div>
        </div>
        <div className="bt pa4 b--light-gray">
            <Actions onClick={doSuggestion} />
        </div>
        {loading && <div className="fixed absolute--fill flex justify-center items-center" style={{ background: "#ffffffcf" }}>
            <Spinner />
        </div>}
    </div>)
}

export default withApollo(MatcherSummary);