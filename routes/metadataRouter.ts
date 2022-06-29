import  express  from 'express';
import { StoredMetadataModel } from '../models/StoredMetadataModel';
import { consentNeeded } from '../services/consentService';

const metadataRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
metadataRouter.get('/metadata/:contractAddress/:tokenId', async (req, res) => {
    const tokenId = req.params.tokenId;
    const contractAddress = req.params.contractAddress;

    try {
        const foundMetadata = await StoredMetadataModel.findOne({ contractAddress, tokenId });
        if (foundMetadata) {
            if (await consentGiven(foundMetadata.originalTokenHolder)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const metadataObject = JSON.parse(foundMetadata.metadata);
                res.send(metadataObject);
            }
            else {
                res.status(403).send(`Missing metadata consent from address ${foundMetadata.originalTokenHolder}`);
            }
        }
        else {
            res.status(400).send(`No metadata found for contract ${contractAddress} tokenId ${tokenId}`);
        }
    } catch (error) {
        console.error(`error when retrieving metadata for contract ${contractAddress} tokenId ${tokenId}`, error);
        res.status(500).send(`Server error ${error}`);
    }
});

const consentGiven = async (address: string) => {
    return ! await consentNeeded(address);
};

export default metadataRouter;