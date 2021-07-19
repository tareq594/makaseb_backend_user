import { Storage } from "../../localStorage/localStorage";

export const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  const savedValue = Storage.get(key);
  console.log(savedValue)

  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }
  onSet((newValue) => {
    Storage.set(key, JSON.stringify(newValue));
  });
};
