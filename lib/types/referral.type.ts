export type ReferralType = {
    id: string;
    status: string;
    dateStarted?: string;
    companyName: string;
    dateOnboarded: string;
}

export type SaveReferralType = Omit<ReferralType, 'id'>;

export type GetReferralResponse = ReferralType;
export type UpdateReferralStatus = ReferralType