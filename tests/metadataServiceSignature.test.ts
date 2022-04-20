import 'jest';
import { shutdownMongoose } from '../app';
import { verifyMetadataSignature } from '../services/metadataService';
import { web3provider } from '../web3/web3provider';

describe('metadataService signature test', () => {

    afterAll( async () => {
        await web3provider.destroy();
        await shutdownMongoose();
    });

    it('validate correct signature', () => {
        const metadata = 'This is metadata';
        const txHash = 'txHashIsThis';

        const signature = '0x0a81e08a63d33e96114f9079d9a787814e8c03dc289abf75779139d0bb8c541b12970ed7bc164dda4584799ffe02db6169330d02f9bf66ebc5e2e84dda332e3c1c';
        const signingAddress = '0xE54BB854621E8CA08666082ABE50a9f4316469BB';

        const signatureMatching = verifyMetadataSignature(txHash, metadata, signingAddress, signature);
        expect(signatureMatching).toBe(true);
    });
    it('recognize wrong signature', () => {
        const metadata = 'This is metadata';
        const txHash = 'txHashIsThis';

        const fakeSignature = '0x0a81e08a63d33e96114f9079d9a787814e8c03dc289abf75779139d0bb8c541b12970ed7bc164dda4584799ffe02db6169330d02f9bf66ebc5e2e84dda332e3c1b';
        const signingAddress = '0xE54BB854621E8CA08666082ABE50a9f4316469BB';

        const signatureMatching = verifyMetadataSignature(txHash, metadata, signingAddress, fakeSignature);
        expect(signatureMatching).toBe(false);
    });

    it('recognize wrong signature with wrong point - verifyMessage throws exception', () => {
        const metadata = 'This is metadata';
        const txHash = 'txHashIsThis';

        const fakeSignature = '0x0aaaaaaaaaa33e96114f9079d9a787814e8c03dc289abf75779139d0bb8c541b12970ed7bc164dda4584799ffe02db6169330d02f9bf66ebc5e2e84dda332e3c1c';
        const signingAddress = '0xE54BB854621E8CA08666082ABE50a9f4316469BB';

        const signatureMatching = verifyMetadataSignature(txHash, metadata, signingAddress, fakeSignature);
        expect(signatureMatching).toBe(false);
    });

    it('recognize wrong signing address', () => {
        const metadata = 'This is metadata';
        const txHash = 'txHashIsThis';

        const signature = '0x0a81e08a63d33e96114f9079d9a787814e8c03dc289abf75779139d0bb8c541b12970ed7bc164dda4584799ffe02db6169330d02f9bf66ebc5e2e84dda332e3c1c';
        const fakeSigningAddress = '0xAAAAB854621E8CA08666082ABE50a9f4316469BB';

        const signatureMatching = verifyMetadataSignature(txHash, metadata, fakeSigningAddress, signature);
        expect(signatureMatching).toBe(false);
    });
});
