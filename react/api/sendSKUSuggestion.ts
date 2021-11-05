const headers = {
    'X-VTEX-API-AppKey': 'vtexappkey-exito-NPAJZQ',
    'X-VTEX-API-AppToken': 'KXRDLKLVRJIWCAAHAROACAOLDBQIEEHRVFWHIXQLIONPGZYBBWQZQAOJIFAKTDQNCQBXDTZDBCSNMYFEDPGINIAURMYCXGSFXANPYBYIWNXOIAXJZVGEWIATPHFQUWGV',
    'Content-Type': 'application/json'
};

export default async ({ mainSKU, offerSKUs, currentItem }) => {
    try {
        const { NameComplete, Id, ProductDescription, BrandName, SkuName, Dimension, ProductCategories, Images, UnitMultiplier, MeasurementUnit, AlternateIds } = mainSKU;
        const seller = offerSKUs.SkuSellers.find((item) => item.SellerId == currentItem.currentSeller.sellerId);
        const payload = {
            ProductName: NameComplete,
            ProductId: Id,
            ProductDescription,
            BrandName,
            SkuName,
            SellerId: seller.SellerId,
            Height: Dimension.height,
            Width: Dimension.width,
            Length: Dimension.length,
            WeightKg: Dimension.weight,
            RefId: AlternateIds.RefId,
            EAN: AlternateIds.Ean,
            SellerStockKeepingUnitId: seller.SellerStockKeepingUnitId,
            CategoryFullPath: Object.values(ProductCategories).join("/"),
            SkuSpecifications: [],
            ProductSpecifications: [],
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
            sellerSku: seller.SellerStockKeepingUnitId
        }
        const response = await fetch(URL, {
            method: "POST",
            headers,
            body: JSON.stringify(BODY)
        })
        console.log("done 3");
        return { success: true, data: "Ok!" }
    } catch (error) {
        console.log("failed 3", error);
        return { success: false, data: error }
    }
}