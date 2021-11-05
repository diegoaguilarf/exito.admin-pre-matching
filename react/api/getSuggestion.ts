import GET_SUGGESTION from "../graphql/getSuggestion.graphql"

export default async ({ client, sellerId, sellerSkuId, currentItem }) => {
    try {        
        const { data } = await client.query({
            query: GET_SUGGESTION,
            variables: {
                searchInput: {
                    sellerId: sellerId,
                    term: sellerSkuId
                }
            }
        });
        console.log("done 4");
        const suggestion = data.searchSuggestions.data.find(item => item.itemId == currentItem.itemId);
        return { success: true, data: suggestion }
    } catch (error) {
        console.log("failed 4", error);
        return { success: false, data: error }
    }
}