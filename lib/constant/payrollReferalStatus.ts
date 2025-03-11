import { ReferalStatusEnum } from "../types/MeetingStatus.enum";
//onboarded -Clients in this stage has been successfully registered in the system but have not yet started using it. Follow up is required to insure progress and facilitate the transition to active use.
//	active -Clients in this stage have started enrolling their employees in the system, preparing for payroll disbursement. They are in the process of setting up their system for full operational use.
//	system user -Clients at this stage have already pre-funded their accounts and are ready to proceed with payroll disbursement. They are fully utilizing the system for their payroll needs.
//	fully compliant -These clients have met all the necessary requirements for accreditation. They are fully committed to using the system, and their account will be managed by the MCash support team for ongoing assistance and optimization.

type PayrollStatusInfo = {
    id:ReferalStatusEnum,
    description:string;
}

export const payrollReferalStatusInfo:Array<PayrollStatusInfo> = [{
    id:ReferalStatusEnum.FOR_PAYROLL_ACCOUNT_ENROLLMENT,
    description:"Clients at this stage have successfully attended the demo presentation and are subject to onboarding. An email has been sent requesting the necessary details for their PayPRO account enrollment. A follow-up is required to ensure the details are sent to the MCash Division."
},
{
    id:ReferalStatusEnum.ONBOARDED,
    description:"Clients in this stage has been successfully registered in the system but have not yet started using it. Follow up is required to insure progress and facilitate the transition to active use."
},
{
    id:ReferalStatusEnum.ACTIVE,
    description:"Clients in this stage have started enrolling their employees in the system, preparing for payroll disbursement. They are in the process of setting up their system for full operational use."
},
{
    id:ReferalStatusEnum.SYSTEM_USER,
    description:"Clients at this stage have already pre-funded their accounts and are ready to proceed with payroll disbursement. They are fully utilizing the system for their payroll needs."
},
{
    id:ReferalStatusEnum.FULLY_COMPLIANT,
    description:"These clients have met all the necessary requirements for accreditation. They are fully committed to using the system, and their account will be managed by the MCash support team for ongoing assistance and optimization."
}
]