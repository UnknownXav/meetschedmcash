import { Card } from "@/components/ui/card";
import  StatusTable  from "@/app/statusTable/page";
import  StatusDefinitions  from "@/app/statusDefinitions/page";

export const TrackReferral = () => {
  return (
    <Card className="p-6">
      <StatusTable userRole="McashDivision" />
      <StatusDefinitions />
    </Card>
  );
};

export default TrackReferral;