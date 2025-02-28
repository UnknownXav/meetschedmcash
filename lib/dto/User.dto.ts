export enum UserType {
  ADMIN = "ADMIN",
  MCASH = "MCASH",
  SPBD = "SPBD",
  RMS = "RMS",
}

type UserDto = {
  id: string
  firstname: string
  middlename: string
  lastname: string
  email: string
  username: string
  password: string
  createdBy: string
  createdDate: string
}

export type CreateUserDto = Omit<UserDto, "createdDate" | "id">
