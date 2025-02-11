import {ImagePickerResponse} from 'react-native-image-picker';
import {Post} from '../interface/db-entity.interface';

export type StackParamList = {
  Upload: {res: ImagePickerResponse};
  Post: {post: Post};
  Modify: {description: string; id: string};
  Profile: {};
  MainTab: {};
  Feed: {};
  HomeStack: {};
};
