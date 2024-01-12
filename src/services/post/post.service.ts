import { ApiResponse } from '../../data/shared/api.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostDto, PostDto } from './Dto/post.dto';
import { QueryDto } from '../utils/dto';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(newPost: CreatePostDto): Observable<PostDto> {
    return this.http.post<PostDto>('post/create', newPost);
  }

  getPosts(
    query: QueryDto = { keyword: '', page: 0, limit: 10 }
  ): Observable<ApiResponse<PostDto[]>> {
    return this.http.get<ApiResponse<PostDto[]>>(
      `post?limit=${query.limit}&page=${query.page}&keyword=${query.keyword}`
    );
  }

  getPost(postId: string): Observable<ApiResponse<PostDto>> {
    return this.http.get<ApiResponse<PostDto>>(`post/${postId}`);
  }

  deletePost(postId: string): Observable<ApiResponse<{ id: string }>> {
    return this.http.delete<ApiResponse<{ id: string }>>(`post/${postId}`);
  }

  UpdatePost(
    postId: string,
    updatedPost: PostDto
  ): Observable<ApiResponse<PostDto>> {
    return this.http.put<ApiResponse<PostDto>>(`post/${postId}`, updatedPost);
  }
}
