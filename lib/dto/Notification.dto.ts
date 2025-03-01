import { UserType } from "./User.dto"

export type Notification = {
  id: string
  title: string
  message: string
  dateCreated: string
  sender: string
  reciever: string | UserType
  userTypeCreated: UserType
  notify: Array<UserType>
}

export type CreateNotificaton = Omit<Notification, "id">
