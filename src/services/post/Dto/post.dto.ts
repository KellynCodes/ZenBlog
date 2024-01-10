export interface PostDto {
  id: string;
  image: string;
  likes: number;
  owner: OwnerDto;
  publishDate: string;
  tags: Array<string>;
  text: string | null;
  title: string | null;
  body: string;
  updated: string;
}

export interface OwnerDto {
  id: string;
  title: string;
  firstName: string;

  lastName: string;

  picture: string;
}

export interface CreatePostDto {
  id: string;
  image: string;
  likes: number;
  publishDate: string;
  tags: Array<string>;
  text: string | null;
  owner: string;
  title: string;
  content: string;
  updated: string;
}
