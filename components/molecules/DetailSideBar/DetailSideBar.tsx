import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CheckIcon from "@mui/icons-material/Check";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LaptopIcon from "@mui/icons-material/Laptop";
import Button from "@mui/material/Button";
import "./DetailSideBar.css";

interface IDetailSideBarProps {
  status: string;
}

const DetailSideBar: React.FC<IDetailSideBarProps> = ({ status }) => {
  return (
    <div className="float-right pt-5 w-[280px]">
      <div className="bg-white p-5 mb-3">
        <div className="mb-4">公開設定</div>
        <div className="border-[1px] rounded border-[#eee] relative">
          <div className="absolute left-[15px] top-[-15px] bg-white">
            {status === "非公開(下書き)" ? (
              <VisibilityOffRoundedIcon className="eye_icon" />
            ) : status === "公開" ? (
              <RemoveRedEyeIcon className="eye_icon publish_icon" />
            ) : (
              <RemoveRedEyeIcon className="eye_icon" />
            )}
            <span className="ml-1">{status}</span>
          </div>
          <div className="px-5 pt-7 pb-4">
            <div>
              <CheckIcon className="publish_icon" />
              埋込先HP
            </div>
            <div>
              <CheckIcon className="publish_icon" />
              iemiru
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button href={`#`} className="preview_btn" variant="contained">
            プレビュー
          </Button>
          <Button href={`#`} className="publish_btn" variant="contained">
            公開設定
          </Button>
        </div>
      </div>
      <div className="bg-white p-2 mt-4">
        <div className="bg-[#DCEEF4] p-5 flex flex-col items-center">
          <p className="text-sm mb-3 leading-6 text-center">
            メールやSNSで配信すればもっとたくさんの人にこのイベントに来てもらうことができます！
          </p>
          <Button href={`#`} className="resume_btn" variant="contained">
            配信設定
          </Button>
        </div>
      </div>
      <div className="bg-white p-5 mt-4">
        <div className="mb-3">自社HPに埋め込む</div>
        <p className="mb-4">※下記から公開後のURL・HTMLをご確認いただけます。</p>
        <div className="flex flex-col">
          <Button href={`#`} className="confirm_btn" variant="contained">
            <LaptopIcon className="mr-1" />
            URLを確認する
          </Button>
          <Button href={`#`} className="confirm_btn" variant="contained">
            <LaptopIcon className="mr-1" />
            HTMLを確認する
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailSideBar;
