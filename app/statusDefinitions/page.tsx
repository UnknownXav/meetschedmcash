"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const definitions = {
  onboarded: "Clients in this stage has been successfully registered in the system but have not yet started using it. Follow up is required to insure progress and facilitate the transition to active use.",
  active: "Clients in this stage have started enrolling their employees in the system, preparing for payroll disbursement. They are in the process of setting up their system for full operational use.",
  systemUser: "Clients at this stage have already pre-funded their accounts and are ready to proceed with payroll disbursement. They are fully utilizing the system for their payroll needs.",
  fullyCompliant: "These clients have met all the necessary requirements for accreditation. They are fully committed to using the system, and their account will be managed by the MCash support team for ongoing assistance and optimization."
};

export const StatusDefinitions = () => {
  const [showDefinition, setShowDefinition] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {Object.entries(definitions).map(([key, value]) => (
          <Button
            key={key}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50"
            onClick={() => setShowDefinition(key)}
          >
            <Info className="w-4 h-4 mr-2" />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Button>
        ))}
      </div>

      <Dialog open={!!showDefinition} onOpenChange={() => setShowDefinition(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {showDefinition && showDefinition.charAt(0).toUpperCase() + showDefinition.slice(1)}
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-700">
            {showDefinition && definitions[showDefinition as keyof typeof definitions]}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StatusDefinitions;