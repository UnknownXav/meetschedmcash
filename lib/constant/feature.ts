import { UserType } from "../dto/User.dto";

const {ADMIN,SPBD,MCASH,RMS} = UserType

export const scheduleDemo:Array<UserType> = [RMS];

export const viewMeetings:Array<UserType> = [ADMIN,SPBD,MCASH,RMS];

export const trackReferal:Array<UserType> = [ADMIN,SPBD,MCASH,RMS];

export const rmAccountCreation:Array<UserType> = [ADMIN,MCASH];

export const viewRmsAccount:Array<UserType> = [ADMIN,MCASH];