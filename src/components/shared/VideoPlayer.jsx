import {PropTypes} from 'prop-types';
const VideoPlayer = ({ videoUrl }) => {
  const isYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/;
    return youtubeRegex.test(url);
  };
  const isVimeoUrl = (url) => {
    const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com)/;
    return vimeoRegex.test(url);
  };
  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const getVimeoVideoId = (url) => {
    const regExp = /vimeo\.com\/(?:video\/)?([0-9]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const renderVideo = () => {
    if (isYouTubeUrl(videoUrl)) {
      const videoId = getYouTubeVideoId(videoUrl);
      return (
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    } else if (isVimeoUrl(videoUrl)) {
      const videoId = getVimeoVideoId(videoUrl);
      return (
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://player.vimeo.com/video/${videoId}`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    } else {
      return (
        <video className="w-full h-full rounded-lg" controls>
          <source src={videoUrl} type="video/mp4" />
          Sorry, your browser does not support videos.
        </video>
      );
    }
  };

  return <div className="w-full aspect-video">{renderVideo()}</div>;
};

export default VideoPlayer;

VideoPlayer.propTypes = {
    videoUrl: PropTypes.string.isRequired,
}