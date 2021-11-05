const headers = {
    'X-VTEX-API-AppKey': 'vtexappkey-exito-NPAJZQ',
    'X-VTEX-API-AppToken': 'KXRDLKLVRJIWCAAHAROACAOLDBQIEEHRVFWHIXQLIONPGZYBBWQZQAOJIFAKTDQNCQBXDTZDBCSNMYFEDPGINIAURMYCXGSFXANPYBYIWNXOIAXJZVGEWIATPHFQUWGV',
    'Content-Type': 'application/json'
};

export default async ({ sellerId, sellerSkuId }) => {
    try {
        const URL = `/_v/suggestions`
        const response = await fetch(URL, {
            method: "DELETE",
            headers,
            body: JSON.stringify({
                accountName: "exito",
                sellerId,
                sellerSkuId
            })
        })
        const json = await response.json();
        return { success: true, data: json }
    } catch (error) {
        return { success: false, data: error }
    }
}