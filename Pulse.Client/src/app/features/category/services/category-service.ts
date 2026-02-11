import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddCategoryRequest, Category } from '../modles/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private categoriesUrl = 'http://localhost:5096';

  addCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  addCategory(category: AddCategoryRequest) {
    this.addCategoryStatus.set('loading');
     this.http.post<void>(`${this.categoriesUrl}/api/categories`, category)
     .subscribe({
      next: () => {
        this.addCategoryStatus.set('success');
      },
      error: (error) => {
        console.error('Error adding category:', error);
        this.addCategoryStatus.set('error');
      }
     });
  }
  getAllCategories() {
    return httpResource<Category[]>(() => `${this.categoriesUrl}/api/categories`);
  }
}
