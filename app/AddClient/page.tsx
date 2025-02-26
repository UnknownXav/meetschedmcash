
"use client";

import { saveClient } from "@/lib/serviceclient/client.service";
import { SaveClientType } from "@/lib/types/client.type";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
// Import your custom UI Button instead of the one from react-day-picker
import { Button } from "@/components/ui/button";


export default function AddRmAccount() {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  async function handleSubmit() {
    try {
      if (!username) {
        alert("Username required");
        return;
      }

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');  // Ensures two digits (e.g., '02')
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Month (0-11), +1 for 1-12, ensures two digits
      const year = currentDate.getFullYear();  // Full year (e.g., 2025)

      const formattedDate = `${day}-${month}-${year}`;

      const payload: SaveClientType = {
        username: username,
        password: username,
        dateCreated: formattedDate,  
        active: false,
        createdBy: "sample user",
        isPasswordUpdated: false,
};

      const resp = await saveClient(payload);

      if (resp.status === 200) {
        if (confirm("Successfully added")) {
          window.location.reload();
        }
      }
    } catch (error) {
      alert("Internal server error");
    }
  }

  function setPassword(_value: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Card className="p-6 bg-white shadow-lg rounded-lg border border-gray-100">
		<div className="p-2 text-center">Add RM Account</div>
      <Button
        variant="outline"
        onClick={() => router.push("/dashboard")}
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back
      </Button>
      <div className="w-[50%] mx-auto">
        <div className="gap-4">
          <input
            className="p-3 border border-grey-500 w-full rounded-md"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        
        <br />
        <div className="flex flex-1 justify-center">
          <button
            onClick={() => handleSubmit()}
            className="p-3 bg-red-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </Card>
  );
}
