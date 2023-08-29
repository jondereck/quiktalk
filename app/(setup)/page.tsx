import { InitialModal } from "@/components/modals/initial-modal";
import { initialPage } from "@/lib/initial-profile";
import { db } from "@/lib/prismadb";
import { redirect } from "next/navigation";

const SetupPage = async () => {

  const profile = await initialPage();
  
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`)
  }
  return (<div>
    <InitialModal/>
  </div>);
}

export default SetupPage;