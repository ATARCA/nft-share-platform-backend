# nft-share-platform-backend

TODO: specify license before publishing this repo

# Local development setup

## Start developing

### Project structure

Clone this repository using git. If you will be using also other repositories from atarca, place them all ine one directory. Example structure:
```
.
├── my dev folder
│   ├── nft-share-platform-frontend
│   └── nft-share-platform-backend
│   └── nft-share-platform-contracts
│   └── nft-share-platform-subgraph
...
```

Some workspace scripts rely on this structure and may not work properly when all projects are not placed in the same directory.

### Initial installation

Run `npm install` in the project directory.

### Create `.env` file

Create new file `.env` and fill it with the contents of `.env.template`.

Define a mongoDB connection URL, e.g. `MONGODB_URI=mongodb+srv://...`. The URI should point to your dev mongoDB cluster and database.

Replace other placeholder variables as needed.

# How to

### Update smart contracts ABI from the nft-share-platform-contract repo

Required setup: the `nft-share-platform-backend` and `nft-share-platform-contrats` repos has to be in the same folder next to each other.

Then run `npm run contracts:update`. This will generate new ABI and Typescript files from the solidity contracts and copy them over to the `nft-share-platform-frontend` folder.

## Update subgraph GraphQL schema

GraphQL is used for API between `nft-share-platform-subgraph` blockchain indexing service and backend. Update schema in subgraph repository and deploy it to a subgraph. In backend directory run `npm run thegraph:schema:download` and then `npm run thegraph:schema:codegen`. Make sure that the download command points to the same instance of subgraph where the new schema was deployed (see `package.json` file).

## Disclaimer

This project has received funding from the European Union's Horizon 2020 Research and Innovation Programme under Grant Agreement Nº 964678.

