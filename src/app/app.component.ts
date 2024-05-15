import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { DataService } from './service/data.service';
import { CommonModule } from '@angular/common';
import { TextShortPipe } from './pipes/text-short.pipe';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ModalComponent,
    AddTodoComponent,
    CommonModule,
    TextShortPipe
  ],
  providers:[
    DataService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  modalClass:boolean = false;
  addTodoModal : boolean =false;
  modalData!:{status:string,description:string,id:number};
  todoData:any;
  todo:any;
  currentFilter:string ='all' ;

  constructor(private dataService:DataService){}

  ngOnInit(): void {

    this.dataService.getAllTodos().subscribe({
      next:(result:any)=>{
        if(result.message ==="success"){
          this.todoData = result.data;
          console.log(this.todoData);
          
        }else{
          console.log();
          
        }
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    });
  }

  
  onFilter(status:string){    
    this.currentFilter = status;
    this.dataService.getFilter(status).subscribe({
      next:(result:any)=>{
        console.log(result);
        
        if(result.message ==='success'){
          this.todoData =result.data;
          console.log(this.todoData);
          
        }else{
          this.todoData=null
        }
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  onView(item:any){
    this.modalData = {status:item.status,description:item.description,id:item.id};
    this.modalClass = true;
  }
  modalStatus(status:boolean){
    this.modalClass =status;
    this.onFilter(this.currentFilter)
  }

  addTodoStatus(event:boolean){
    this.addTodoModal = event;
    this.onFilter(this.currentFilter);
  }

  checkChange(status:string,id:number){

    this.dataService.onChangeStatus(status,id).subscribe({
      next:(response:any)=>{
        if(response.message =="success"){
        this.onFilter('all')
      }else{
        this.todoData=null
      }
    },
    error:(err:any)=>{
      console.log(err);
      
    }
    })
    
  }

  searchById (searchId:any){
    if(searchId){
      console.log(typeof(searchId));
      
  
    
    this.dataService.getTodoById(searchId).subscribe({
      next:(result:any)=>{
  
        console.log(result);
        
        if(result.message ==='success'){
          this.todoData =[result.data];
        }else{
          this.todoData =null;
        }
      }
    })
  }
  }

  onDelete(id:number){
    this.dataService.onDeleteTodo(id).subscribe({
      next:(res:any)=>{
        if(res.message==='success'){
          console.log(res);
          this.onFilter(this.currentFilter);
          
        }
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  onDownload(){

    this.dataService.onDownload().subscribe({
      next:(res:any)=>{
        saveAs(res ,'todo.csv')
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

  
}
