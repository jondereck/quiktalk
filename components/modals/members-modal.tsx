"use client";

import axios from "axios";
import { Check, Copy, Gavel, Loader2, MoreVertical, RefreshCw, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { useState } from "react";
import { MemberRole } from "@prisma/client";
import qs from "query-string";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { currentProfile } from "@/lib/current-profile";


const roleIconMap = {
  "GUEST": null,
  "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-blue-500"/>,
  "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500"/>
}

export const MembersModal = () => {
  const router = useRouter();
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState("");
  

  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: ServerWithMembersWithProfiles };

  const [isLoading, setIsLoading] = useState(false);

 
const onKick = async (memberId: string )   => {
  try {
    setLoadingId(memberId);
    const url = qs.stringifyUrl({
      url: `/api/members/${memberId}`,
      query: {
        serverId: server?.id
      }
    });
    const  profile = await currentProfile();
    const response = await axios.delete(url);

    toast({
      title: "Success",
      description: `${profile?.name} has been deleted`
    })
    router.refresh();
    onOpen("members", { server: response.data})

  } catch (error) {
    toast({
      variant: "destructive",
      title:"Uh oh! Something went wrong.",
      description:"There was a problem with your request.",
    })
    console.log(error)
  } finally {
    setLoadingId("")
  }
}



const  onRoleChange = async (memberId: string, role: MemberRole) => {
  try {
    setLoadingId(memberId);
    const url = qs.stringifyUrl({
      url: `/api/members/${memberId}`,
      query: {
        serverId: server?.id,
      }
    });
    const profile =  await currentProfile();
    const response  = await axios.patch(url, { role });

    toast({
      title: "Success",
      description: `Role for ${profile?.name} has changed`
    })
    router.refresh();
    onOpen("members", { server: response.data })
  } catch (error) {
    console.log(error)
  } finally {
    setLoadingId("");
  }

}


  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription
            className="text-center text-zinc-500"
          >
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id}
              className="flex item-center gap-x-2 mb-6"
            >
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flecx flex-col gap-y-1 ">
                <div className="text-sm font-semibold flex items-center gap-x-1">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
              <p className="text-sm text-zinc-500">
                {member.profile.email}
              </p>
              </div>
              {server.profileId !== member.profileId && loadingId !== member.id && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical  className="h-4 w-4 text-zinc-500"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center">
                        <ShieldQuestion className="h-4 w-4 mr-2"/>
                        <span>
                          Role
                        </span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                           <DropdownMenuItem
                            onClick={() => onRoleChange(member.id, "GUEST")}
                           >
                           <Shield className="h-4 w-4 mr-2"/>
                            Guest 
                            { member.role === "GUEST" && (
                              <Check className="h-4 w-4 ml-auto"/>
                            )}
                           </DropdownMenuItem>
                           <DropdownMenuItem 
                            onClick={() => onRoleChange(member.id, "MODERATOR")}
                           >
                           <ShieldCheck className="h-4 w-4 mr-2"/>
                            Moderator 
                            { member.role === "MODERATOR" && (
                              <Check className="h-4 w-4 ml-auto"/>
                            )}
                           </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem onClick={() => onKick(member.id)}>
                        <Gavel className="h-4 w-4 mr-2"/>
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              { loadingId === member.id && (
                <Loader2 
                  className="animate-spin text-zinc-500 ml-auto w-4 h-4"
                />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}