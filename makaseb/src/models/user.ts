
export class User {
  constructor(
    readonly firstName?: string,
    readonly lastName?: string,
    readonly email?: string,
    readonly isEmailNotification?: boolean,
    readonly isSMSNotification?: boolean,
    readonly address?: string,
    readonly mobileNumber?: string,
    readonly mobileNumberAlt?: string,
    readonly isActive?:boolean
  ) {}
}
