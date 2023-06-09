import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import LeaderboardTable from './components/LeaderboardTable/LeaderboardTable';
import { GetLeadersByTeamName } from './slice';

function Leaderboard() {
  const dispatch = useAppDispatch();
  const { leaders } = useAppSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(GetLeadersByTeamName());
  }, [dispatch]);

  return <LeaderboardTable leaders={leaders} />;
}

export default Leaderboard;
