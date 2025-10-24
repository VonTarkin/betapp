import CreateMatch from "../components/CreateMatch";
import FAQ from "../components/FAQ";
import MatchList from "../components/Matchlist";
import AppLayout from "../layout/AppLayout";

export default function FAQPage() {
  return (
    <AppLayout>
      <FAQ />
      <MatchList />
      <CreateMatch />
    </AppLayout>
  );
}
