export default function toggleFullScreen() {
  const elem = document.getElementById('game');

  if (!document.fullscreenElement && elem) {
    elem.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
