import { Injectable } from '@angular/core';
import { mainUrl } from '../shares/urls.shares';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getAllTodos(){
    return this.http.get(mainUrl);
  }
  getFilter(status:string){
    const params = new HttpParams().append('status',status)
    return this.http.get(`${mainUrl}/filter`,{params});
  }

  getTodoById(id:any){
    console.log(id);
    
    return this.http.get(`${mainUrl}/${id}`)
  }

  onChangeStatus(status:string,id:number){
    return this.http.put(`${mainUrl}/${id}`,{status:status})
  }

  onDeleteTodo(id:number){
    return this.http.delete(`${mainUrl}/${id}`);

  }

  onUpdateDesc(id:any,desc:any){
    return this.http.put(`${mainUrl}/${id}`,{description:desc});
  }

  onAddTodo(desc:string){
    return this.http.post(`${mainUrl}`,{description:desc});
  }

  onUploadCsv(csv:any){
    const formData = new FormData();
    formData.append('csvFile',csv);

    return this.http.post(`${mainUrl}/upload`,formData);
  }
}
