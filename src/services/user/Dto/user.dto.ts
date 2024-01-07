import { CourseResponseDto } from '../../course/Dto/CourseResponseDto';

export interface UserDto {
  userId?: string;

  unique_name: string[];

  avaterUrl: string;

  email: string;

  password: string;

  role: string;
}

export interface UserResponseDto {
  email: string;
  userName: string;
  avatarUrl: string;
  courses?: CourseResponseDto[];
}
