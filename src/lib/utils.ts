import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const videoOptions = [
  {
    name: "mp4",
    type: "mp4",
  },
  {
    name: "avi",
    type: "avi",
  },
  {
    name: "mkv",
    type: "mkv",
  },
  {
    name: "mov",
    type: "mov",
  },
  {
    name: "wmv",
    type: "wmv",
  },
  {
    name: "flv",
    type: "flv",
  },
  {
    name: "webm",
    type: "webm",
  },
  {
    name: "m4v",
    type: "m4v",
  },
  {
    name: "3gp",
    type: "3gp",
  },
  {
    name: "mpeg",
    type: "mpeg",
  },
  {
    name: "ogg",
    type: "ogg",
  },
  {
    name: "rmvb",
    type: "rmvb",
  },

  {
    name: "f4v",
    type: "f4v",
  },
];

export function getVideoDuration(
  videoPath: File,
  callback: (durationInSeconds: number) => void,
): void {
  const video = document.createElement("video");

  // Wait for metadata to be loaded before accessing the duration
  video.addEventListener("loadedmetadata", function () {
    // Get the duration in seconds
    const durationInSeconds = video.duration;

    // Cleanup: remove the video element
    document.body.removeChild(video);

    // Invoke the callback with the duration
    callback(durationInSeconds);
  });

  // Set the video source
  video.src = URL.createObjectURL(videoPath);

  // Set the display style to 'none' to prevent rendering
  video.style.display = "none";

  // Append the video element to the document body to load metadata
  document.body.appendChild(video);
}
