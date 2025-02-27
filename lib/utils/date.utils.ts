import dayjs from 'dayjs';


export const getMonth =(date:string|Date) =>{
    return dayjs(date).month() + 1;
}