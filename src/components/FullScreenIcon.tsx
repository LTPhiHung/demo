import { useEffect, useState } from "react";
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';

const FullScreenIcon = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  return (
    <>
      {!isFullscreen ? (
        <FullscreenExitOutlined onClick={toggleFullscreen} />
      ) : (
        <FullscreenOutlined onClick={toggleFullscreen} />
      )}
    </>
  )
}

export default FullScreenIcon;