import { useContext } from "react";
import { Container } from "react-bootstrap";
import { WidgetContext } from "./WidgetContext";
import PropTypes from "prop-types";

SpotifyEmbed.propTypes = {
  // 'setData' is a function
  type: PropTypes.string,
};

export default function SpotifyEmbed() {
  const { widgetId } = useContext(WidgetContext);

  return (
    <Container>
      <div className="ratio ratio-16x9">
        {widgetId && (
          <iframe
            src={`https://embed.spotify.com/?uri=spotify:track:${widgetId}`}
            title="Spotify embed"
            height="200px"
            width="400px"
            style={{
              borderRadius: 20,
            }}
            allowFullScreen
          ></iframe>
        )}
      </div>
    </Container>
  );
}
