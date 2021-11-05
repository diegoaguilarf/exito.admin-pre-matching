const headers = {
    'X-VTEX-API-AppKey': 'vtexappkey-exito-NPAJZQ',
    'X-VTEX-API-AppToken': 'KXRDLKLVRJIWCAAHAROACAOLDBQIEEHRVFWHIXQLIONPGZYBBWQZQAOJIFAKTDQNCQBXDTZDBCSNMYFEDPGINIAURMYCXGSFXANPYBYIWNXOIAXJZVGEWIATPHFQUWGV',
    'Content-Type': 'application/json'
};

export default async ({ mainProduct, suggestion }) => {
    console.log("suggestion", suggestion)
    try {
        const payload = {
            matcherId: suggestion.matches[0].matchId,
            matchType: "itemMatch",
            score: "100",
            skuRef: mainProduct.items[0].itemId,
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