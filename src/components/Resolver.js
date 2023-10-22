const {default: Resolution} = require('@unstoppabledomains/resolution');

const ethereumProviderUrl = "https://eth-mainnet.g.alchemy.com/v2/jCHbR2LyCjTa8JY0JTpZsnR-Vtx_wwSP";
const polygonProviderUrl = "https://polygon-mainnet.g.alchemy.com/v2/OLgzd6IgyTBVkfCr4jw24GBbck9Rm0-H";
var name;

// custom provider config using the Resolution constructor options
export const resolution = new Resolution({
    sourceConfig: {
      uns: {
        locations: {
          Layer1: {
            url: ethereumProviderUrl,
            network: 'mainnet'
          },
          Layer2: {
            url: polygonProviderUrl,
            network: 'polygon-mainnet',
          },
        },
      },
    },
});
