const headers = {
    'X-VTEX-API-AppKey': 'vtexappkey-exito-NPAJZQ',
    'X-VTEX-API-AppToken': 'KXRDLKLVRJIWCAAHAROACAOLDBQIEEHRVFWHIXQLIONPGZYBBWQZQAOJIFAKTDQNCQBXDTZDBCSNMYFEDPGINIAURMYCXGSFXANPYBYIWNXOIAXJZVGEWIATPHFQUWGV',
    'Content-Type': 'application/json'
};

export default async ({ skuId }) => {
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