import axios from "axios";

interface IPost {
  url: string;
  data: JSON;
}

interface ICllient {
  setURLBase(base: string): void;
  removeURLBase(base: string): void;
  setJWT(jwt: string): void;
  getJWT(): string;
  get(url: string): Promise<JSON>;
  post({ url, data }: IPost): Promise<JSON>;
  delete(url: string): Promise<JSON>;
  put({ url, data }: IPost): Promise<JSON>;
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
    return this.instance.post(url, data);
  }
  delete(url: string): Promise<JSON> {
    return this.instance.delete(url);
  }
  put({ url, data }: IPost): Promise<JSON> {
    return this.instance.put(url, data);
  }
}
