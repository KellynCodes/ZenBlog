export interface PostDto {
  id: string;
  image: string;
  likes: number;
  owner: OwnerDto;
  publishDate: string;
  tags: Array<string>;
  text: string;
  title: string;
  content: string;
  updated: string;
}

export interface OwnerDto {
  id: string;
  title: string;
  firstName: string;

  lastName: string;

  picture: string;
}
