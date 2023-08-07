import { notifications } from '@mantine/notifications';

const notification = {
  error: ({ message }: { message: string }) => {
    notifications.show({
      color: 'red',
      title: 'Error',
      message,
    });
  },
};

export default notification;
