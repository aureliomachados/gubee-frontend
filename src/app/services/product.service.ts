import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { Stack } from '../models/stack';
import { TargetMarket } from '../models/targetmarket';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlProducts = 'http://localhost:8085/api/v1/products';
  urlStacks = 'http://localhost:8085/api/v1/stacks';
  urlMarkets = 'http://localhost:8085/api/v1/markets';

  constructor(private httpClient: HttpClient) { }

  //headers
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  //Obtem todos os produtos
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.urlProducts)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  //Obtem todas as stacks
  getStacks(): Observable<Stack[]> {
    return this.httpClient.get<Stack[]>(this.urlStacks)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  //Obtem todos os produtos
  getMarkets(): Observable<TargetMarket[]> {
    return this.httpClient.get<TargetMarket[]>(this.urlMarkets)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  //filtra produtos por tecnologia
  getFilterProductsByStacks(stacks: Stack[]): Observable<Product[]>{
    let params: HttpParams = new HttpParams;

    params = params.append('stacks', stacks.map(st => st.name).join(','));

    return this.httpClient.get<Product[]>("http://localhost:8085/api/v1/products/productsbystacks",{params})
      .pipe(
        retry(2),
        catchError(this.handleError))
  
  }

  //filtra produtos por mercado
  getFilterProductsByMarkets(markets: TargetMarket[]): Observable<Product[]>{
    let params: HttpParams = new HttpParams;

    params = params.append('markets', markets.map(st => st.name).join(','));

    return this.httpClient.get<Product[]>("http://localhost:8085/api/v1/products/productsbymarkets",{params})
    .pipe(
      retry(2),
      catchError(this.handleError))
  }



  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
