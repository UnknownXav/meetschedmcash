import { CreateUserDto, InsertUserDto, LoginDto, LoginResponse, UserDto, UserType } from "@/lib/dto/User.dto";
import { db } from "@/lib/firebase";
import { FirebaseCollectionEnum } from "@/lib/types/FirebaseCollection.enum";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const createUser = async(payload:CreateUserDto)=>{
    const insertData:InsertUserDto = {
        ...payload,
        createdDate:new Date().toISOString()
    }

    const resp = await addDoc(collection(db,FirebaseCollectionEnum.user),insertData)

    return resp;
}

export const loginUser = async(loginPayload:LoginDto)=>{
    const {username,password} = loginPayload;
    const q = query(collection(db,FirebaseCollectionEnum.user),where("username","==",username),where("password","==",password))

    const snapShot = await getDocs(q);

    if(snapShot.empty){
        return null
    }
    const id = snapShot.docs[0].id;
    const data = snapShot.docs[0].data() as UserDto; 

    const response:LoginResponse = {
        createdDate: data.createdDate,
        id: id,
        firstname: data.firstname,
        middlename:data.middlename,
        lastname: data.lastname,
        email: data.email,
        username: data.username,
        createdBy: data.createdBy,
        userType: data.userType,
        userLocation:data.userLocation
    }

    return response
}

export const getRms = async() =>{
    const q = query(collection(db,FirebaseCollectionEnum.user),where("userType","==",UserType.RMS))

    const snapShot = await getDocs(q)

    const data = snapShot.docs.map(val=>{
        return {
            id:val.id,
            ...val.data()
        }
    }) as unknown as UserDto[]

    const users:LoginResponse[] = data.map(val=>{
        return {
            id:val.id,
            firstname:val.firstname,
            middlename:val.middlename,
            lastname:val.lastname,
            email:val.email,
            username:val.username,
            userType:val.userType,
            userLocation:val.userLocation,
            createdBy:val.createdBy,
            createdDate:val.createdDate
        }
    })

    return users;
}