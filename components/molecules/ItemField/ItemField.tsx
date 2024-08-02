import Image from "next/image";
import RequiredLabel from "@/components/atoms/RequiredLabel";
import RecommendLabel from "@/components/atoms/RecommendLabel";

interface IItemField {
  src: string;
  name: string;
  required?: boolean;
  recommend?: boolean;
  className?: string;
  height?: number;
}

const ItemField: React.FC<IItemField> = ({
  src,
  name,
  required = false,
  recommend = false,
  className = "",
  height = 30,
}) => {
  return (
    <>
      <Image
        src={src}
        className={`mr-3 w-[30px] h-[${height}px]`}
        width={30}
        height={height}
        alt={name}
      />
      <div className={`${className}`}>
        <span className="font-semibold text-sm">{name}</span>
        {required === true && <RequiredLabel className="mr-0" />}
        {recommend === true && (
          <RecommendLabel className={`${className ? "ml-0 mt-2" : "mr-0"}`} />
        )}
      </div>
    </>
  );
};

export default ItemField;
