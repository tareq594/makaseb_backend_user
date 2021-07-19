
export class User {
  constructor(
    readonly id?:string,
    readonly firstName?: string,
    readonly lastName?: string,
    readonly email?: string,
    readonly isEmailNotification?: boolean,
    readonly isSMSNotification?: boolean,
    readonly address?: string,
    readonly phoneNumber?: string,
    readonly alternativePhoneNumber?: string,
    readonly isActive?:boolean
  ) {}
}
