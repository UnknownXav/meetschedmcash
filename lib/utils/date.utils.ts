import dayjs from 'dayjs';


export const getMonth =(date:string|Date) =>{
    return dayjs(date).month() + 1;
}

export const formatDate = (date:string | Date) =>{
    return dayjs(date).format("MMM  DD, YYYY ")
}

export const formatDateWithTime = (date:string | Date) =>{
    return dayjs(date).format("MMM DD, YYYY HH:mm")
}