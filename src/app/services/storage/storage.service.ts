import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async getData(storageKey: string) {
    return await JSON.parse(await (await Storage.get({ key: storageKey })).value);;
  }

  async setData(storageKey: string, value: any): Promise<void> {
    return await Storage.set({ key: storageKey, value: JSON.stringify(value) });
  }

  async removeData(storageKey: string): Promise<void> {
    return await Storage.remove({ key: storageKey });
  }

  async getKey(): Promise<{ keys: string[]; }> {
    return await Storage.keys();
  }

// const setName = async () => {
//   await Storage.set({
//     key: 'name',
//     value: 'Max',
//   });
// };

// const checkName = async () => {
//   const { value } = await Storage.get({ key: 'name' });

//   alert(`Hello ${value}!`);
// };

// const removeName = async () => {
//   await Storage.remove({ key: 'name' });
// };
}
