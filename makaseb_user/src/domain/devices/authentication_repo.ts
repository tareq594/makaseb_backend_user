import { Storage } from "../../core/localStorage/localStorage";
import { client } from "../../core/network/network";
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
    try {
      var userData = await client.post({
        url: "/admin/login",
        data: { email: email, password: password },
      });
      var tokenString = userData["data"]["token"];
      var token = new Token(tokenString);
      return token;
    } catch (error) {
      throw new Error("failure to get token");
    }
  }
  async logout(): Promise<void> {
    await delay(100);
    Storage.remove("token");
  }
  async isLoggedIn(): Promise<boolean> {
    await delay(100);
    var tokenString = Storage.get("token");
    if (!tokenString) {
      return false;
    }
    var token = new Token(tokenString);

    return token.isValid;
  }
}
