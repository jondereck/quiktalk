"use client";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldCheck } from "lucide-react";


interface ServerMemberProps {
  member: Member & { profile: Profile};
  server: Server
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 ml-2 text-blue-500" />,
  [MemberRole.ADMIN]: <ShieldCheck className="h-4 w-4 ml-2 text-rose-500" />
}

export const ServerMember = ({
  member,
  server
}: ServerMemberProps) => {
  return (  
    <div>
      member
    </div>
  );
}
 


