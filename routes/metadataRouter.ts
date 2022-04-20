import  express  from 'express';
import { StoredMetadataModel } from '../models/StoredMetadataModel';

const metadataRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
metadataRouter.get('/metadata/:contractAddress/:tokenId', async (req, res) => {
    const tokenId = req.params.tokenId;
    const contractAddress = req.params.contractAddress;

    try {
        const result = await StoredMetadataModel.findOne({ contractAddress, tokenId });
        if (result) {
            const metadataObject = JSON.parse(result.metadata);
            res.send(metadataObject);
        }
        else {
            res.status(400).send(`No metadata found for contract ${contractAddress} tokenId ${tokenId}`);
        }
    } catch (error) {
        console.error(`error when retrieving metadata for contract ${contractAddress} tokenId ${tokenId}`, error);
        res.status(500).send(`Server error ${error}`);
    }
});

export default metadataRouter;