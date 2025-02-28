import { axiosConfig } from "../config/axiosconfig"

export async function getClientMeetings() {
  const resp = await axiosConfig("meeting")

  return resp.data
}
