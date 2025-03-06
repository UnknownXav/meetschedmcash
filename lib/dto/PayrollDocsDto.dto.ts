export type PayrollDocsInfoDto = {
    id:string;
    title:string;
    description:string;
    link:string;
    dateCreated:string;
}

export type CreatePayrollDocs = Omit<PayrollDocsInfoDto,'id'>