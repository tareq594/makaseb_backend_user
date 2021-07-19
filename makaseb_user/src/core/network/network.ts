import axios from "axios";

interface IPost {
  url: string;
  data: any;
}

interface ICllient {
  setURLBase(base: string): void;
  removeURLBase(base: string): void;
  setJWT(jwt: string): void;
  getJWT(): string;
  get(url: string): Promise<any>;
  post({ url, data }: IPost): Promise<any>;
  delete(url: string): Promise<any>;
  put({ url, data }: IPost): Promise<any>;
}

export class Client implements ICllient {
  constructor(private _jwt?: string, private _baseURL?: string) {
    _baseURL = _baseURL ?? "";
    _jwt = _jwt ?? "";
  }

  private instance = axios.create({
    baseURL: this._baseURL,
    headers: {
      Authorization: "Bearer " + this._jwt,
    },
  });

  setURLBase(base: string): void {
    this._baseURL = base;
    this.instance.defaults.baseURL = base;
  }
  removeURLBase(base: string): void {
    this._baseURL = "";
    this.instance.defaults.baseURL = "";
  }
  setJWT(jwt: string): void {
    this._jwt = jwt;
    this.instance.defaults.headers = { Authorization: "Bearer " + jwt };
  }
  getJWT(): string {
    return this._jwt!;
  }
  get(url: string): Promise<JSON> {
    return this.instance.get(url);
  }
  post({ url, data }: IPost): Promise<JSON> {
    return this.instance.post(url, data,{
      withCredentials: true
      });
  }
  delete(url: string): Promise<JSON> {
    return this.instance.delete(url);
  }
  put({ url, data }: IPost): Promise<JSON> {
    return this.instance.put(url, data);
  }
}

export const client = new Client("", "http://localhost:3200");
