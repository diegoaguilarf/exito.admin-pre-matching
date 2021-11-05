const headers = {
    'X-VTEX-API-AppKey': 'vtexappkey-exito-NPAJZQ',
    'X-VTEX-API-AppToken': 'KXRDLKLVRJIWCAAHAROACAOLDBQIEEHRVFWHIXQLIONPGZYBBWQZQAOJIFAKTDQNCQBXDTZDBCSNMYFEDPGINIAURMYCXGSFXANPYBYIWNXOIAXJZVGEWIATPHFQUWGV',
    'Content-Type': 'application/json'
};

export default async ({ sellerId, sellerSkuId }) => {
    try {
        const URL = `/api/catalog_system/pvt/skuseller/remove/${sellerId}/${sellerSkuId}`
        const response = await fetch(URL, {
            method: "POST",
            headers
        })
        const json = await response.json();
        return { success: true, data: json }
    } catch (error) {
        return { success: false, data: error }
    }
}