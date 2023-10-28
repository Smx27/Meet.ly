import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs";
import { PaginationResult } from "../_models/pagination";
import { UserParams } from "../_models/userParams";

export function getPaginatedResults<T>(url: string,params: HttpParams, http:HttpClient) {
    const paginatedResults: PaginationResult<T> = new PaginationResult<T>;
    return http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResults.result = response.body;
        }

        const pagination = response.headers.get('Pagination');

        if (pagination) {
          paginatedResults.pagination = JSON.parse(pagination);
        }
        return paginatedResults;
      })
    );
  }

  export function getPaginationHeaders(userParams: UserParams) {
    let params = new HttpParams();

    params = params.append('pageNumber', userParams.pageNumber);
    params = params.append('pageSize', userParams.pageSize);
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return params;
  }
