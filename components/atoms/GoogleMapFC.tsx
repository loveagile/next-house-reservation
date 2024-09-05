const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;

interface ThisFCProps {
  width: number;
  height: number;
  address: string;
}

const GoogleMapFC: React.FC<ThisFCProps> = ({ width, height, address }) => {
  return (
    <iframe
      width={width}
      height={height}
      loading="lazy"
      allowFullScreen
      className="w-full"
      src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAP_API_KEY}&q=${address}&zoom=15`}
    ></iframe>
  )
}

export default GoogleMapFC;