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
    Username: string;
    ClanCoins: number;
    UserType: UserType;
}

export enum UserType {
    Guest,
    Admin
}