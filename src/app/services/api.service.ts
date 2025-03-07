import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`, // Add the token to the header
      });
    } else {
      return new HttpHeaders(); // Return empty headers if no token
    }
  }
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/your-endpoint`, {
      headers: this.getHeaders(),
    });
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/your-endpoint`, data, {
      headers: this.getHeaders(),
    });
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/public/upload`, formData, {
      headers: this.getHeaders(),
    });
  }

  login(email: string, password: string): any {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/admin/auth/sign-in`, loginData); // Adjust the endpoint
  }

  postBlog(title: string, content: string, thumbnail: string): any {
    const Data = { title, content, thumbnail };
    return this.http.post(`${this.apiUrl}/admin/blogs`, Data, {
      headers: this.getHeaders(),
    });
  }
  updateBlog(
    id: number,
    title: string,
    content: string,
    thumbnail: string
  ): any {
    const Data = { id, title, content, thumbnail };
    return this.http.put(`${this.apiUrl}/admin/blogs`, Data, {
      headers: this.getHeaders(),
    });
  }
  getBlogs(): any {
    return this.http.get(`${this.apiUrl}/admin/blogs`, {
      headers: this.getHeaders(),
    });
  }
  deleteBlog(id: number): any {
    return this.http.delete(`${this.apiUrl}/admin/blogs/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
