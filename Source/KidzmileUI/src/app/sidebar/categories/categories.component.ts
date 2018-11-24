import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() isFilterOn:boolean=false;
  category:Category; 
  constructor( private _categoryService:CategoryService) { }
 
  ngOnInit() {
    this._categoryService.getAllCategories().subscribe(
      (data:Category)=>{
        console.log(data);
         this.category=data
        },
      (error)=>{
          console.log(error);
      });
  }
  
}
