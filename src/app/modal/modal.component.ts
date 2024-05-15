import { CommonModule } from '@angular/common';
import { Component,Input, OnInit,EventEmitter, Output } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers:[
    DataService
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent  implements OnInit{

  @Input('modalClass') modalClass!: boolean;
  @Input('todo')todoData !:any;
  @Output('modalStatus') modlaStatus = new EventEmitter<boolean>();

  todoEdit:boolean =false;
  scssMsg!:string|null;
  errMsg !:string|null;

  
  constructor(private dataService:DataService){}

  ngOnInit(): void {
    console.log(this.modalClass);
   
    
  }

  modalClose(){
    this.modalClass=false;
    this.modlaStatus.emit(false);
    this.scssMsg=null;
    this.errMsg=null
  }

  onEdit(){
    this.todoEdit =true;
  }
  onSave(desc:string){
    this.todoEdit =false
    if(desc){

      this.dataService.onUpdateDesc(this.todoData.id,desc).subscribe({
        next:(res:any)=>{
          if(res.message =="success"){
            console.log(res);
            this.scssMsg ="Update success"
            this.errMsg=null
            
          }else{
            console.log(res);

          
            
            
          }
        },
        error:(err:any)=>{
          console.log(err);
          this.errMsg=err;
          this.scssMsg =null;
          
        }
      })

    }

  }



}
