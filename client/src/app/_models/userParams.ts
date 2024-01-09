import { User } from "./user";

export class UserParams {
    gender: string;
    minAge = 18;
    maxAge = 80;
    pageNumber = 1;
    pageSize = 5;
    orderBy = 'lastActive';
    searchChar = '';

    constructor(user: User) {
        this.gender = user.gender;
    }
}