import { ChatHeader } from "@/components/chat/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: {
    serverId: string,
    channelId: string
  }
}

const ChannelIdPage = async ({
  params
}: ChannelIdPageProps) => {
  const profile = await  currentProfile();

  if (!profile ){
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.server.findFirst({
    where: {
      id: params.serverId,
      profileId: profile.id
    }
  });

  if (!channel || !member) {
    redirect("/")
  }


  return ( 
  <div className="bg-[#FFFAE7] dark:bg-[#1B2430] flex flex-col h-full">
    <ChatHeader 
      name={channel.name}
      serverId={channel.serverId}
      type="channel"
    />
  </div> 
  );
}
 
export default ChannelIdPage;