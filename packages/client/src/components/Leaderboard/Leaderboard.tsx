import { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import LeaderboardTable from './components/LeaderboardTable';
import { GetLeadersByTeamName } from './slice';
import Loader from '../Loader';
import { LoaderSizeEnum } from '../../enum';
import { selectLeaderboardState } from '../../app/selectors';

function Leaderboard() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isFetching, leaders } = useAppSelector(selectLeaderboardState);

  useEffect(() => {
    dispatch(GetLeadersByTeamName());
  }, [dispatch]);

  return isFetching ? (
    <Loader color={theme!.colors.onBackground} size={LoaderSizeEnum.large} />
  ) : (
    <LeaderboardTable leaders={leaders} />
  );
}

export default Leaderboard;
