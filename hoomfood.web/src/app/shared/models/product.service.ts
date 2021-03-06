import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'src/app/Classes/filter';
import { product } from '../../Classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private subject = new BehaviorSubject<any>(0);
  public categorydata
  public phone
  public userData
  public category
  private productsUrl = 'http://localhost:3000/Product';
  constructor(private http: HttpClient) { }

  getFilterData(_categoryId) {

    let params = new HttpParams()
    params = params.set("categoryid", _categoryId)

    return this.http.get<filter[]>(`http://localhost:3000/DynamicFormFields`, { params: params })
  }

  getFormData() {
    return this.http.get(`http://localhost:3000/form`)
  }

  getProducts(): Observable<product[]> {
    return this.http.get<product[]>(this.productsUrl)
  }

  getProdByCategory(subcategoryid) {
    return this.http.get<product[]>(`http://localhost:3000/Product?subcategoryid=${subcategoryid}`)
  }

  // get product details
  sendProduct(product: object) {
    this.subject.next(product);
  }
  getProduct(): Observable<any> {
    return this.subject.asObservable();
  }

  getModelData(name) {
    return this.http.get<any[]>(`http://localhost:3000/brands?name=${name}`)
  }

  getList(name) {
    return this.http.get(`http://localhost:3000/Product?Product_Name=${name}`)
  }

  getProdByCategoryData(category) {
    return this.http.get<product[]>(`http://localhost:3000/Product?category=Vehicles`)
  }
  getVehicleData(category) {
    return this.http.get<product[]>(`http://localhost:3000/Product?category=Furniture`)
  }
  getJewelryData(category) {
    return this.http.get<product[]>(`http://localhost:3000/Product?category=Jewelry`)
  }

  getProdByLocation(address) {
    return this.http.get<product[]>(`http://localhost:3000/Product?address=${address}`)
  }
  getSubCategory(name) {
    return this.http.get(`http://localhost:3000/categoryValue?name=${name}`)
  }
  getNavItems(category) {
    return this.http.get(` http://localhost:3000/navItem?displayName=${category}`)
  }
  getUserData(user){
    return this.http.get(`http://localhost:3000/users`)
  }

}
