export enum UserType {
  ADMIN = "ADMIN",
  MCASH = "MCASH",
  SPBD = "SPBD",
  RMS = "RMS",
}

export enum UserLocation {
  MAIN="MAIN",
  LNCR='LNCR',
  VISMIN='VISMIN'
}

export type UserDto = {
  id: string
  firstname: string
  middlename: string
  lastname: string
  email: string
  username: string
  password: string
  createdBy: string
  createdDate: string
  userLocation:string;
  userType:UserType
}

export type CreateUserDto = Omit<UserDto, "createdDate" | "id">

export type InsertUserDto = Omit<UserDto,"id">

export type LoginDto = Pick<UserDto,'username'|'password'>

export type LoginResponse = Omit<UserDto,"password">