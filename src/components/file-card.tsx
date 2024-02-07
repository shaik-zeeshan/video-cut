import { FC, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { toast } from "./ui/use-toast";
import { VideoSlider } from "./video-slider";
import { VideoFormatSelect } from "./video-format-select";

interface FileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  file: File;
  onDelete: () => void;
}

export const FileCard: FC<FileCardProps> = ({ file, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const [values, setValues] = useState([0, 0]);
  const [format, setFormat] = useState(file.type.split("/")[1] || "mp4");

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm",
      ),
    });
    toast({
      title: "FFmpeg",
      description: "FFmpeg is ready to use",
    });
  };

  const transcode = async () => {
    await load();
    const ffmpeg = ffmpegRef.current;
    let inputFile =
      file.name.split(" ")[0] + "input" + "." + file.name.split(".")[1];
    await ffmpeg.writeFile(inputFile, await fetchFile(file));

    let outputFile = file.name.split(".")[0] + "." + format;

    let inputs = [
      "-ss",
      values[0].toString(),
      "-i",
      inputFile,
      "-t",
      (values[1] - values[0]).toString(),
      "-c",
      "copy",
      "-avoid_negative_ts",
      "1",
      outputFile,
    ];

    console.log(inputs.join(" "));

    await ffmpeg.exec(inputs);
    const data = (await ffmpeg.readFile(outputFile)) as any;

    const ur = URL.createObjectURL(
      new Blob([data.buffer], { type: `video/${format}` }),
    );
    toast({
      title: "Download",
      description: "Your video is ready to download",
      action: (
        <Button
          onClick={() => {
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = ur;
            a.download = file.name.split(".")[0] + `.${format}`;
            a.click();
          }}
        >
          Download
        </Button>
      ),
    });
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div>{file.name}</div>
            <div className="text-muted-foreground">
              {file.type.length
                ? file.type
                : `video/${file.name.split(".")[1]}`}
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <Button variant="ghost">
                {open ? (
                  <EyeIcon size={24} onClick={() => setOpen(!open)} />
                ) : (
                  <EyeOffIcon size={24} onClick={() => setOpen(!open)} />
                )}
              </Button>
            </div>
            <Button onClick={onDelete} variant="destructive">
              Delete
            </Button>
          </div>
        </div>
        {open ? (
          <div className="pt-4">
            <VideoSlider file={file} values={values} setValues={setValues} />
            <div className="flex items-center justify-between">
              <VideoFormatSelect value={format} setValue={setFormat} />
              <Button onClick={transcode}>Transcode</Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
