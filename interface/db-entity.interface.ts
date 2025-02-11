export interface User {
  name: string;
  id: string;
  password: string;
  profileThumbnail?: string | undefined;
  createdAt: Date;
}

export interface Post {
  id: string;
  photo: string; //photo Base64
  contents: string;
  userId: string;
  user: string;
  createdAt: Date;
}
