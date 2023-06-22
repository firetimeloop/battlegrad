import { useEffect, useState } from 'react';
import { AlertContainer } from './styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setAlert } from './slice';

function Alert() {
  const dispatch = useAppDispatch();
  const { message, timestamp } = useAppSelector((state) => state.alert);

  const [shake, setShake] = useState(false);

  useEffect(() => {
    let shakeTimeout: NodeJS.Timeout | null = null;
    let hideTimeout: NodeJS.Timeout | null = null;
    if (message) {
      setShake(true);
      shakeTimeout = setTimeout(() => setShake(false), 820);
      hideTimeout = setTimeout(() => dispatch(setAlert(null)), 7000);
    }
    return () => {
      if (shakeTimeout) {
        clearTimeout(shakeTimeout);
      }
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [dispatch, message, timestamp]);

  return (
    <AlertContainer
      className={shake ? 'shake-animated' : ''}
      visible={message ? !!message : undefined}
    >
      {message}
    </AlertContainer>
  );
}

export default Alert;
