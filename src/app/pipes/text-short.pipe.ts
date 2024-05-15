import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textShort',
  standalone: true
})
export class TextShortPipe implements PipeTransform {

  transform(value:any): string|null {
    if(value.length <=15){
      return value;
    }
    
    value.trim('\n')
    console.log(value);
    
    const shortText = value.substring(0,15);
    console.log(shortText);
    

    return shortText;
  }

}
