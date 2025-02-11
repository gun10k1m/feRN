import {useState} from 'react';
import {ActionSheetIOS, Platform} from 'react-native';
import {useDB} from '../context/db-context';
import {events} from '../lib/event';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../type/Stack';

export default function usePostActions({
  id,
  description,
}: {
  id: string;
  description: string;
}) {
  const {db} = useDB();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, 'Modify'>>();

  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const edit = () => {
    navigation.navigate('Modify', {id, description});
  };
  const remove = async () => {
    await db.deletePost(id);
    events.emit('refresh');
  };

  const onPressMore = () => {
    if (Platform.OS === 'android') {
      setIsSelecting(true);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['설명 수정', '게시물 삭제', '취소'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            edit();
          } else if (buttonIndex === 1) {
            remove();
          }
        },
      );
    }
  };

  const actions = [
    {
      icon: 'edit',
      text: '설명 수정',
      onPress: edit,
    },
    {
      icon: 'delete',
      text: '게시물 삭제',
      onPress: remove,
    },
  ];

  const onClose = () => {
    setIsSelecting(false);
  };

  return {
    isSelecting,
    onPressMore,
    onClose,
    actions,
  };
}
