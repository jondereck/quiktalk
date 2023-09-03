"use client";

import qs from "query-string";
import axios from "axios";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useParams, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

export const DeleteChannelModal = () => {
  const router = useRouter();

  const {isOpen, onClose, type, data } = useModal();


  const isModalOpen = isOpen && type === "deleteChannel";
  const { server, channel } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      })
      await axios.delete(url);

      toast({
        title: "Success",
        description: `${channel?.name} has been deleted.`
      })

      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to this? <br/> 
            <span className="font-semibold text-[#E45826]">{channel?.name}</span> will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex  item-center justify-between w-full">
          <Button 
            disabled={isLoading}
            onClick={onClose}
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant="primary"
            onClick={onClick}
          >
            Confirm
          </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}