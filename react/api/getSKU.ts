const headers = {
    'X-VTEX-API-AppKey': 'vtexappkey-exito-NPAJZQ',
    'X-VTEX-API-AppToken': 'KXRDLKLVRJIWCAAHAROACAOLDBQIEEHRVFWHIXQLIONPGZYBBWQZQAOJIFAKTDQNCQBXDTZDBCSNMYFEDPGINIAURMYCXGSFXANPYBYIWNXOIAXJZVGEWIATPHFQUWGV',
    'Content-Type': 'application/json'
};

export default async (skuId) => {
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