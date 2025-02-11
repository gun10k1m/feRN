import {Post, User} from '../interface/db-entity.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class DB {
  userList: User[];
  postList: Post[];

  constructor() {
    this.userList = [];
    this.postList = [];

    this.loadData();
  }

  async loadData() {
    const users = await AsyncStorage.getItem('users');
    const posts = await AsyncStorage.getItem('posts');

    this.userList = users ? JSON.parse(users) : [];
    if (this.userList.length === 0) {
      this.userList.push({
        id: '10km',
        password: '10km111',
        name: '10km-user',
        createdAt: new Date(),
      });
    }
    this.postList = posts ? JSON.parse(posts) : [];
  }

  async saveData() {
    await AsyncStorage.setItem('users', JSON.stringify(this.userList));
    await AsyncStorage.setItem('posts', JSON.stringify(this.postList));
  }

  login({id, password}: {id: string; password: string}) {
    const loggedUser = this.userList.find(
      user => user.id === id && user.password === password,
    );
    return loggedUser;
  }

  async register({
    name,
    id,
    password,
    profileThumbnail,
  }: {
    name: string;
    id: string;
    password: string;
    profileThumbnail: string;
  }) {
    try {
      const newUser: User = {
        name,
        id,
        password,
        profileThumbnail,
        createdAt: new Date(),
      };
      this.userList.push(newUser);
      await this.saveData();
      return true;
    } catch (error) {
      return false;
    }
  }

  getPosts(size: number, page: number) {
    return [...this.postList]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, Math.min(size * page, this.postList.length));
  }

  async addPost(post: {
    id: string;
    photo: string;
    contents: string;
    userId: string;
  }) {
    try {
      const u_user = this.userList.find(user => (user.id = post.userId));
      const newPost: Post = {
        ...post,
        user: u_user?.name ?? 'unknown user',
        createdAt: new Date(),
      };
      this.postList.push(newPost);
      await this.saveData();

      return true;
    } catch (error) {
      return false;
    }
  }

  async editPost(id: string, updatedPost: Partial<Post>) {
    const postIndex = this.postList.findIndex(post => post.id === id);
    if (postIndex !== -1) {
      this.postList[postIndex] = {...this.postList[postIndex], ...updatedPost};
      await this.saveData();
      return true;
    }
    return false;
  }

  async deleteAllPost() {
    this.postList = [];
    await this.saveData();
    return true;
  }

  async deletePost(id: string) {
    const prePostListLength = this.postList.length;
    this.postList = this.postList.filter(post => post.id !== id);
    await this.saveData();
    return prePostListLength !== this.postList.length;
  }
}
