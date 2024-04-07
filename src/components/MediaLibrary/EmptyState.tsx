import { PiSealQuestionFill } from "react-icons/pi";

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <PiSealQuestionFill color="teal" className="text-8xl mb-4" />
      <div className="text-center font-semibold text-xl text-slate-700 mb-2">It seems there's nothing here yet.</div>
      <div className="text-center text-md mb-4 text-slate-500">Record something to start filling up your list of recordings!</div>
    </div>
  );
};

export default EmptyState;
