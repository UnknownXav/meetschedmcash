import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { DeleteClientType, SaveClientType, ClientBaseType } from "../types/client.type";
import { FirebaseTable } from "./database.enum";
import { db } from "../firebase";

// Axios config
import { axiosConfig } from "../config/axiosconfig"; 

// 1. CREATE A NEW CLIENT ACCOUNT
export const createClient = async (payload: SaveClientType) => {
  try {
    const resp = await addDoc(collection(db, FirebaseTable.CLIENT), payload);
    return { id: resp.id, ...payload };  // return the newly created client along with the generated ID
  } catch (error) {
    console.error("Error creating client:", error);
    throw new Error('Failed to create client');
  }
};

// 2. GET ALL CLIENTS
export const getClient = async () => {
  try {
    const snapshot = await getDocs(collection(db, FirebaseTable.CLIENT));
    const clients = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return clients;  // return the array of clients
  } catch (error) {
    console.error("Error getting clients:", error);
    throw new Error('Failed to fetch clients');
  }
};

// 3. DELETE A CLIENT ACCOUNT (using Firebase)
export const deleteClientAccount = async (id: string) => {
  try {
    await deleteDoc(doc(db, FirebaseTable.CLIENT, id));
    return `Client with id ${id} has been deleted successfully`;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw new Error('Failed to delete client');
  }
};

export const updateClientAccount = async (id: string, data: Partial<ClientBaseType>) => {
  try {
    const clientRef = doc(db, FirebaseTable.CLIENT, id);  // Get the document reference by ID

    await updateDoc(clientRef, data);  // Update only the fields that are passed in the data object

    return { id, ...data };  // Return the updated client data along with the id
  } catch (error) {
    console.error("Error updating client:", error);
    throw new Error('Failed to update client');
  }
};
