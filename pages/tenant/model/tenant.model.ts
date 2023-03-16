export enum TenantSort {
    ASC = 'ASC',
    DESC = 'DESC',
  }

  export interface ITenant{
    id?:string;
    name?:string;
    email?:string;
    contact?:string;
    alert?:boolean;
    isLoggedIn?:boolean;
    status?:string;
    properties?:string;
    tenantsId?:string;
    createdAt?:string;
    updatedAt?:string;
  }
  export interface ITenantAll{
    data: ITenant[],
    count:number
  }

  export interface ITenantFilters {
    status?: string
}

  export enum TenantSortAttr {
    id='id',
    name='name',
    email='email',
    contact='contact',
    alert='alert',
    isLoggedIn='isLoggedIn',
    status='status',
    properties='properties',
    tenantsId='tenantsId',
    createdAt='createdAt',
    updatedAt='updatedAt'
}
  export interface ITenantPagination {
    offset: number;
    limit: number;
    search: string;
    sortAttr: TenantSortAttr;
    sort: TenantSort;
  }
export type TenantFeilds =
| 'id'
| 'name'
| 'email'
| 'contact'
| 'alert'
| 'isLoggedIn'
| 'status'
| 'properties'
| 'tenantsId'
| 'createdAt'
| 'updatedAt'

