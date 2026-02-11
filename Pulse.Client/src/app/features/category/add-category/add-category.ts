import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../modles/category.model';
import { CategoryService } from '../services/category-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  private router = inject(Router);
  private categoryService = inject(CategoryService); 


  constructor(){
    effect(() => {
      if (this.categoryService.addCategoryStatus() === 'success') {
        this.router.navigate(['/admin/categories']);
        this.categoryService.addCategoryStatus.set('idle'); 
      }
      if (this.categoryService.addCategoryStatus() === 'error') {
        alert('Error adding category. Please try again.');
      }
    });
  }

  addCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
    urlHandle : new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
  });

  get nameFormControl() {
    return this.addCategoryFormGroup.controls.name;
  }

  get urlHandleFormControl() { 
    return this.addCategoryFormGroup.controls.urlHandle;
  }

  onSubmit() {
    const addCategoryfromValue = this.addCategoryFormGroup.getRawValue();

    const addCategoryRequestDto: AddCategoryRequest = {
      name: addCategoryfromValue.name,
      urlHandle: addCategoryfromValue.urlHandle
    };
    this.categoryService.addCategory(addCategoryRequestDto);

  } 

}
