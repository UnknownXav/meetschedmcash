import { ClientDto, InsertClientDto } from "@/lib/dto/Client.dto"
import { UserType } from "@/lib/dto/User.dto"
import { db } from "@/lib/firebase"
import { FilterBy, FilterClientType } from "@/lib/types/FilterClientType.type"
import { FirebaseCollectionEnum } from "@/lib/types/FirebaseCollection.enum"
import { MeetingStatusEnum } from "@/lib/types/MeetingStatus.enum"
import { getMonth } from "@/lib/utils/date.utils"
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  QueryFieldFilterConstraint,
  where,
} from "firebase/firestore"

export async function createClient(payload: InsertClientDto) {
  const resp = await addDoc(
    collection(db, FirebaseCollectionEnum.client),
    payload
  )

  return resp
}

export async function getClient() {
  const snapShot = await getDocs(collection(db, FirebaseCollectionEnum.client))

  const clients = snapShot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    }
  )

  return clients
}

async function filterByDay(status: MeetingStatusEnum | undefined, day: string) {
  const qArr: QueryConstraint[] = []
  if (status) qArr.push(where("meetingStatus", "==", status))
  qArr.push(where("meetings.date", "==", day))
  const q = query(collection(db, FirebaseCollectionEnum.client), ...qArr)

  const snapShot = await getDocs(q)

  const clients = snapShot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    }
  )

  return clients
}

async function filterByMonth(
  status: MeetingStatusEnum | undefined,
  month: string
) {
  const qArr: QueryConstraint[] = []
  if (status) qArr.push(where("meetingStatus", "==", status))

  const q = query(collection(db, FirebaseCollectionEnum.client), ...qArr)

  const snapShot = await getDocs(q)

  const clients: ClientDto[] = snapShot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      return {
        id: doc.id,
        ...(doc.data() as Omit<ClientDto, "id">),
      }
    }
  )
  const filterData = clients.filter(
    (val) => getMonth(val.meetings.date).toString() === month
  )

  return filterData
}

async function filterByStatus(status: string | undefined) {
  if (!status) {
    return await getClient()
  }

  const q = query(
    collection(db, FirebaseCollectionEnum.client),
    where("meetingStatus", "==", status)
  )

  const snapShot = await getDocs(q)

  const clients = snapShot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    }
  )

  return clients
}

export async function filterClientByMeetingStatus(
  payload: FilterClientType | undefined
) {
  if (!payload) {
    return await getClient()
  }

  if (payload.filterBy === FilterBy.DAY) {
    const data = await filterByDay(payload.status, payload.date as string)
    return data
  } else {
    const data = await filterByMonth(payload.status, payload.month as string)

    return data
  }
}

async function getRmsMeeting(id:string){
  const q = query(collection(db,FirebaseCollectionEnum.client),  
        where("meetingStatus", "in", [
          MeetingStatusEnum.PENDING,
          MeetingStatusEnum.ENDORSE,
          MeetingStatusEnum.RESCHEDULE,
          MeetingStatusEnum.CONFIRM,
        ]),where("referedBy.id","==",id)) 
        const snapShot = await getDocs(q)
        const clients =  snapShot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          }
        )
      
        return clients

      }

export async function getAllForMeetingClient(id:string,userType:string) {
  
  // const q = query(
  //   collection(db, FirebaseCollectionEnum.client),
  //   where("meetingStatus", "in", [
  //     MeetingStatusEnum.PENDING,
  //     MeetingStatusEnum.ENDORSE,
  //     MeetingStatusEnum.RESCHEDULE,
  //     MeetingStatusEnum.CONFIRM,
  //   ])
  // )
 
  if(userType === UserType.RMS.toString()){
  return await getRmsMeeting(id)
  }
 const q = query(
    collection(db, FirebaseCollectionEnum.client),
    where("meetingStatus", "in", [
      MeetingStatusEnum.PENDING,
      MeetingStatusEnum.ENDORSE,
      MeetingStatusEnum.RESCHEDULE,
      MeetingStatusEnum.CONFIRM,
    ])
   )


  const snapShot = await getDocs(q)

  const clients = snapShot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    }
  )

  return clients
}

export async function getReferals(id:string,userType:string){
  try {
    const arrQuery:QueryFieldFilterConstraint[] = [where("meetingStatus","==",MeetingStatusEnum.DONE)];
    if(userType === UserType.RMS.toString()){
      arrQuery.push(where("referedBy.id","==",id))
    }

    const q = query(collection(db,FirebaseCollectionEnum.client),...arrQuery)
  
    const snapshot = await getDocs(q)

    const clients = snapshot.docs.map(val=>{
      return {
        id:val.id,
        ...val.data()
      }
    })

    return clients
  } catch (error) {
    
  }
}

