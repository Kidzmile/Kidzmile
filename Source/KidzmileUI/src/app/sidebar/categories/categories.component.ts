import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  category: Category;
  checkedCategories: string[] = [];
  selectedCategoriesCheckbox = '';

  @Output() checkboxChanged = new EventEmitter();

  constructor(private _categoryService: CategoryService) { }

  ngOnInit() {
    this._categoryService.getAllCategories().subscribe(
      (data: Category) => {
        console.log(data);
        this.category = data ;
      },
      (error) => {
        console.log(error);
      });
  }

  categoriesChanged(event: any, name: any) {
    if (event.target.checked) {
      this.checkedCategories.push(name);
    } else {
      this.checkedCategories.splice(this.checkedCategories.indexOf(name), 1);
    }
    this.checkboxChanged.emit(this.checkedCategories);
  }
}
