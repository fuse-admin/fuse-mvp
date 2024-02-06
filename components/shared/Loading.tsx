// components/ui/Loader.tsx
const Loading: React.FC = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
    );
};

export default Loading;
