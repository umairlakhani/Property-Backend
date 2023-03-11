export enum Sort {
    ASC = 'ASC',
    DESC = 'DESC',
  }

  export interface IUser{
    id?:string;
    name?:string;
    email?:string;
    contact?:string
    type?:string;
    isLoggedIn?:boolean;
    status?:string;
    properties?:string;
    tenantsId?:string;
    createdAt?:string;
    updatedAt?:string;
  }
  export interface IUserAll{
    data: IUser[],
    count:number
  }

  export interface IFilters {
    status?: string
}

  export enum SortAttr {
    id='id',
    name='name',
    email='email',
    contact='contact',
    type='type',
    isLoggedIn='isLoggedIn',
    status='status',
    properties='properties',
    tenantsId='tenantsId',
    createdAt='createdAt',
    updatedAt='updatedAt'
}
  export interface IPagination {
    offset: number;
    limit: number;
    search: string;
    sortAttr: SortAttr;
    sort: Sort;
  }
export type UserFeilds =
| 'id'
| 'name'
| 'email'
| 'contact'
| 'type'
| 'isLoggedIn'
| 'status'
| 'properties'
| 'tenantsId'
| 'createdAt'
| 'updatedAt'

