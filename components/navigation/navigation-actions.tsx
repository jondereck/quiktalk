import { Plus } from "lucide-react";

const NavigationAction = () => {
  return (
    <div>
      <button className="group">
        <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-[#E45826]/90">
          <Plus 
            className="group-hover:text-white transition text-[#F0A500]" 
            size={25}
          />

        </div>
      </button>
    </div>);
}

export default NavigationAction;