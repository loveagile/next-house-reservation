interface INoInputLabel {
  className?: string;
}

const NoInputLabel: React.FC<INoInputLabel> = ({ className = "" }) => {
  return (
    <span
      className={`bg-m-red text-white text-xs px-[10px] py-[3px] font-semibold inline-block ${className}`}
    >
      未入力
    </span>
  );
};

export default NoInputLabel;
