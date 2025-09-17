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
    const token = localStorage.getItem('token');
    return new HttpHeaders(
      token ? { Authorization: `Bearer ${token}` } : {}
    );
  }

  // ✅ File upload
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/public/upload`, formData, {
      headers: this.getHeaders(),
    });
  }

  // ✅ Auth
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/auth/sign-in`, { email, password });
  }

  // ✅ Blogs
  postBlog(title: string, content: string, thumbnail: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/blogs`, { title, content, thumbnail }, {
      headers: this.getHeaders(),
    });
  }

  updateBlog(id: number, title: string, content: string, thumbnail: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/blogs`, { id, title, content, thumbnail }, {
      headers: this.getHeaders(),
    });
  }

  getBlogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/blogs`, {
      headers: this.getHeaders(),
    });
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/blogs/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // ✅ Portfolios
  postPortfolio(title: string, description: string, youtubeLink: string, photoLinks: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/projects`, { title, description, youtubeLink, photoLinks }, {
      headers: this.getHeaders(),
    });
  }

  updatePortfolio(id: number, title: string, description: string, youtubeLink: string, photoLinks: string[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/projects`, { id, title, description, youtubeLink, photoLinks }, {
      headers: this.getHeaders(),
    });
  }

  getPortfolios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/projects`, {
      headers: this.getHeaders(),
    });
  }

  deletePortfolio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/projects/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // ✅ Public endpoints
  getBlogsForUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/public/blogs`);
  }

  getBlogById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/public/blogs/${id}`);
  }

  getJobsForUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/public/projects`);
  }

  getJobById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/public/projects/${id}`);
  }
  
  uploadMultipleFiles(files: File[]): Observable<any> {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file, file.name));

  return this.http.post(`${this.apiUrl}/public/upload/multiple`, formData, {
    headers: this.getHeaders(),
  });
}

}
