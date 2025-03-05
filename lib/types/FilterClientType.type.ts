import { MeetingStatusEnum } from "./MeetingStatus.enum";

export enum FilterBy {
    MONTH = 'Month',
    DAY = 'Day'
}


export type FilterClientType = {
    status:MeetingStatusEnum | undefined;
    filterBy:FilterBy | undefined;
    date:string | undefined
    month:string | undefined
}