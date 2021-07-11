import { Storage } from "../../core/localStorage/localStorage";
import { delay } from "../../core/util/delay/delay";
import { validToken } from "../../fakeData";
import { Token } from "../../models/token";

interface Ilogin {
  email: string;
  password: string;
}

export interface IAuthRepository {
  login({ email, password }: Ilogin): Promise<Token>;
  logout(): Promise<void>;
  isLoggedIn(): Promise<boolean>;
}

export class AuthRepository implements IAuthRepository {
  async login({ email, password }: Ilogin): Promise<Token> {
    Storage.set("token", validToken);
    await delay(100);
    return new Token(validToken);
  }
  async logout(): Promise<void> {
    await delay(100);
    Storage.remove("token");
  }
  async isLoggedIn(): Promise<boolean> {
    console.log("hereeee1");
    await delay(100);
    var tokenString = Storage.get("token");
    if (!tokenString) {
      return false;
    }
    var token = new Token(tokenString);
    console.log(token.isValid);
    console.log(token.decoded);

    return token.isValid;
  }
}
