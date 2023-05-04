export interface IPost{
    _id: string;
    title: string;
    link: string;
    isApproved: boolean;
    postedBy: IUser;
    clicked: number;
    published: Date;
}

export interface IUser{
    _id: string;
    Username: string;
    ClanCoins: number;
    UserType: UserType;
}

export enum UserType {
    Guest,
    Admin
}