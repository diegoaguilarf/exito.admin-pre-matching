const headers = {
    'X-VTEX-API-AppKey': 'vtexappkey-exito-NPAJZQ',
    'X-VTEX-API-AppToken': 'KXRDLKLVRJIWCAAHAROACAOLDBQIEEHRVFWHIXQLIONPGZYBBWQZQAOJIFAKTDQNCQBXDTZDBCSNMYFEDPGINIAURMYCXGSFXANPYBYIWNXOIAXJZVGEWIATPHFQUWGV',
    'Content-Type': 'application/json'
};

export default async ({ search }) => {
    try {
        const URL = `/api/catalog_system/pub/products/search/${search}`
        const response = await fetch(URL, {
            method: "GET",
            headers
        })
        const json = await response.json();
        return { success: true, data: json }
    } catch (error) {
        return { success: false, data: error }
    }
}