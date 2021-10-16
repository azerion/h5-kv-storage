import {LocalStorage} from '../../src/adapters/local-storage'


describe('Localstorage', () => {
    it('should be able to set a value', () => {
        const storage = new LocalStorage();
        storage.initialize().then(() => {
            storage.setItem('foo', 'bar');
        })
    })
});
