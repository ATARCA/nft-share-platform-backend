import { initMongoose, shutdownMongoose } from '../../app';
import { clear, getLastCheckedBlockNumber, setLastCheckedBlockNumber } from '../../models/LastCheckedBlockNumber';

describe('LastCheckedBlockNumber test', () => {

    beforeAll(() => {
        initMongoose();
    });

    afterAll(async () => {
        await shutdownMongoose();
    });

    beforeEach(async () => {
        await clear();
    });

    it('returns default value', async () => {
        const result = await getLastCheckedBlockNumber();
        expect(result).toBe(0);
    });

    it('can save first value', async () => {
        await setLastCheckedBlockNumber(1);
        const result = await getLastCheckedBlockNumber();
        expect(result).toBe(1);
    });

    it('can override already set value', async () => {
        await setLastCheckedBlockNumber(1);
        await setLastCheckedBlockNumber(2);

        const result = await getLastCheckedBlockNumber();
        expect(result).toBe(2);
    },100000);
});