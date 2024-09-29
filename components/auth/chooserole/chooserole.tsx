"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import CardWrapper from "../card-wrapper"; // Adjust the path as needed
import { Button } from "@/components/ui/button";

const RoleSelectionForm = () => {
//   const router = useRouter();
  const [role, setRole] = useState("");

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    window.location.href = `/auth/login?role=${selectedRole}`;
    // router.push(`/auth/login?role=${selectedRole}`);
  };

  return (
    <CardWrapper
      label="Select Your Role"
      title="You are exploring as"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Button onClick={() => handleRoleSelect('developer')} className="w-full">
            Developer
          </Button>
          <Button onClick={() => handleRoleSelect('organization')} className="w-full">
            Organization
          </Button>
        </div>
      </div>
    </CardWrapper>
  );
};

export default RoleSelectionForm;