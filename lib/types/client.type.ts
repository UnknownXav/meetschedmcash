export type ClientBaseType = {
    id: string;
    username: string;
    password: string;
    dateCreated: string;
    active: boolean;
    lastLogin?: string;
    createdBy: string;
    isPasswordUpdated:boolean;
}


export type SaveClientType = Omit<ClientBaseType,'id'>;

export type GetClientResponse = ClientBaseType;