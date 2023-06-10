import Avatar from '@components/Avatar';
import { Table } from './styles';
import { TLeaderData } from '../../../../interface/Leaderboard';

type TLeaderboardTableProps = {
  leaders: Array<TLeaderData>;
};

type NumberedLeader = TLeaderData & {
  number: number;
};

function LeaderboardTable({ leaders }: TLeaderboardTableProps) {
  const numberedList: Array<NumberedLeader> = leaders.map<NumberedLeader>(
    (leader, index) => ({
      ...leader,
      number: index + 1,
    }),
  );

  return (
    <Table>
      <caption>TOP-10</caption>
      <tr>
        <th>№</th>
        <th>Аватар</th>
        <th>Имя</th>
        <th>Почта</th>
        <th>Количество побед</th>
      </tr>
      {numberedList.map((leader) => (
        <tr>
          <td>{leader.number}</td>
          <td>
            <Avatar avatarUrl={leader.avatar} size={40} />
          </td>
          <td>{leader.name}</td>
          <td>{leader.email}</td>
          <td>{leader.winsNumber}</td>
        </tr>
      ))}
    </Table>
  );
}

export default LeaderboardTable;
