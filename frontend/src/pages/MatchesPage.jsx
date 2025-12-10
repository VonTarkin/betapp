import { useParams } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import MatchList from "../components/Matchlist";
import MatchDetails from "../components/MatchDetails";

export default function MatchesPage() {
  const { id } = useParams();

  return (
    <AppLayout>
      {id ? <MatchDetails /> : <MatchList />}
    </AppLayout>
  );
}
