import store from "store";

interface IStorage {
  set(key: string, value: any): void;
  get(key: string, optionalDefaultValue?: any): any;
  remove(key: string, optionalDefaultValue?: any): any;
}

export class Storage {
  static set(key: string, value: any): void {
    return store.set(key, value);
  }
  static get(text: string) {
    return store.get(text);
  }
  static remove(text: string) {
    return store.remove(text);
  }
}
