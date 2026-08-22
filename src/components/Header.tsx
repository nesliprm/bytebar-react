import { SearchPanel } from "./ui/SearchPanel";

type HeaderProps = {
  onRandom: () => void;
  isLoading: boolean;
};

export const Header = ({ onRandom, isLoading }: HeaderProps) => {
  return (
    <div className="bg-teal mt-10 p-6 rounded-2xl w-full max-w-200 mb-8 mx-auto">
      <h1 className="font-header font-bold text-7xl text-yellow text-shadow-header">
        byteBAR
      </h1>
      <div className="mt-8 text-sm">
        <p className="font-main">
          <b>
            Welcome to byteBAR — a virtual mixologist that can craft cocktails!
          </b>
          Type an ingredient to search the collection, let our boozy bot whip
          something up with AI Search, or click Random for a surprise creation!
        </p>
        <SearchPanel onRandom={onRandom} isLoading={isLoading} />
      </div>
    </div>
  );
};
