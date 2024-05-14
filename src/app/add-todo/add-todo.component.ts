import { CommonModule } from '@angular/common';
import { Component,ElementRef,EventEmitter,Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../service/data.service';
import { catchError, throwError } from 'rxjs';


@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent implements OnInit {



  @Input('modalClass')modalClass:boolean=false;
  @Output('closeModelStatus') closeModalStatus = new EventEmitter<boolean>();

  csvFile: File|null =null;
  errMsg:string|null = null
  fileName:string ="Choose CSV file..."

  constructor(private dataServeice :DataService){}

  todoData = new FormGroup({
    description:new FormControl(''),
    chooseMethod :new FormControl('text')
  })


  closeModal(){
    this.closeModalStatus.emit(false);
    this.modalClass=false;

  }

  ngOnInit(): void {
    
  }


  onCsvChange(csv:any){
    const file = csv.target.files[0];
    console.log(file);
    this.fileName= file.name;
    
    if(file?.type =="text/csv"){
      this.csvFile =file;
    }else{
      this.errMsg ="CSV file only"
    }
    
  }

  onSubmit(){
    if(this.todoData.value.chooseMethod ==='text'){
      if(this.todoData.value.description){
      this.dataServeice.onAddTodo(this.todoData.value.description).subscribe({
        next:(res:any)=>{
          if(res.message =="success"){
            console.log(res);
            
          }
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
      }


    }else if(this.todoData.value.chooseMethod ==='file'){

      this.dataServeice.onUploadCsv(this.csvFile).subscribe({
        next:(res:any)=>{
          if(res.message =="success"){
            console.log(res);

            this.fileName ="Choose CSV file..."
            
          }
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })

    }
  }
}
