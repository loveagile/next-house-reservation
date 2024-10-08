interface IRecommendLabelProps {
  className?: string;
}

const RecommendLabel: React.FC<IRecommendLabelProps> = ({ className = "" }) => {
  return (
    <span
      className={`bg-[#1976d2] text-white text-[10px] px-2 pt-[2px] pb-1 font-semibold ml-2 mr-auto ${className}`}
    >
      おすすめ
    </span>
  );
};

export default RecommendLabel;
