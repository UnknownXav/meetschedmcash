import { UserType } from "./User.dto"

export type NotificationDto = {
  id: string
  title: string
  message: string
  dateCreated: string
  sender: string
  reciever: string | UserType
  userTypeCreated: UserType
  notify: Array<UserType>
  readby:Array<UserType>
}

export type CreateNotificaton = Omit<NotificationDto, "id">
