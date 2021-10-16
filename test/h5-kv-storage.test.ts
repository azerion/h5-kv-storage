import {KvStorage} from "../src/h5-kv-storage"

/**
 * Dummy test
 */
describe('Kv Storage', () => {
  // it('works if true is truthy', () => {
  //   expect(true).toBeTruthy()
  // })

  it('KvStorage is instantiable', () => {
    expect(new KvStorage()).toBeInstanceOf(KvStorage)
  })
})
