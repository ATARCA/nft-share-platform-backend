# nft-share-platform-backend

# Local development setup

### Set environment variable for mongoDB

After cloning the repo create `.env` file in the project root and define a mongoDB connection URL, e.g. `MONGODB_URI=mongodb+srv://...`. The URI should point to your dev mongoDB cluster and database.

# How to

### Update smart contracts from the nft-share-platform-contract repo

Required setup: the `nft-share-platform-backend` and `nft-share-platform-contrats` repos has to be in the same folder next to each other.

Then run `npm run contracts:update` to generate new Typescript files from the solidity contracts and copy them over to the `nft-share-platform-frontend` folder.

ATARCA has received funding from the European Union’s Horizon 2020 research and innovation programme.

TODO: specify license before publishing this repo
