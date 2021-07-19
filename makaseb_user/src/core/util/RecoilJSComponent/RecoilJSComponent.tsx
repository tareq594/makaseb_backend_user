import React from "react";
import { useRecoilCallback } from "recoil";
import { Subject } from "rxjs";

export const setRecoil = new Subject();

const getRecoil = new Subject();
const returnRecoil = new Subject();

export const promiseGetRecoil = (recoilObj) => {
  return new Promise(async (resolve, reject) => {
    getRecoil.next(recoilObj);
    returnRecoil.subscribe({
      next: (value: any) => {
        if (recoilObj === value.recoilObj) {
          resolve(value.value);
        }
      },
    });
  });
};

export default function RecoilJSComponent() {
  const setStore = useRecoilCallback(
    ({ set }) => (n: any) => {
      set(n.recoilObj, () => n.value);
    },
    []
  );

  const getStore = useRecoilCallback(
    ({ snapshot }) => async (recoilObj: any) => {
      const valueRecoilObj = await snapshot.getPromise(recoilObj);
      returnRecoil.next({ recoilObj: recoilObj, value: valueRecoilObj });
    },
    []
  );

  setRecoil.subscribe({
    next: (value) => {
      setStore(value);
    },
  });

  getRecoil.subscribe({
    next: (recoilObj) => {
      getStore(recoilObj);
    },
  });

  return null;
}
