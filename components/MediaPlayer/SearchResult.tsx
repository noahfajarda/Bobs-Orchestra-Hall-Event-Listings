/* eslint-disable react/prop-types */
import { Image } from "@chakra-ui/react";
import { useContext } from "react";
import { WidgetContext } from "./WidgetContext";

export default function SearchResult({ track, onClose }) {
  const { widgetId, setWidgetId } = useContext(WidgetContext);

  return (
    <div
      key={track.id}
      id={track.id}
      className="flex flex-col items-center mb-12"
      onClick={async () => {
        setWidgetId(track.id);
        onClose();
      }}
    >
      {/* lazy load image */}
      <Image
        borderRadius="20px"
        boxSize="200px"
        objectFit="cover"
        src={track.album.images[0].url}
        alt={track.name}
        loading="lazy"
      />
      <div>{track.name}</div>
      <div>
        <div className="flex flex-col items-center">
          {track.artists.map((artist) => (
            <div key={artist.id}>{artist.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
