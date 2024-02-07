"use client";
import { FileIcon } from "lucide-react";
import { useRef, useState } from "react";
import { FileCard } from "./file-card";

export const FileUpload = () => {
  // State for the file input
  const [file, setFile] = useState<File[] | null>(null);

  // Ref for the file input
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        className="hidden"
        type="file"
        id="file-upload"
        ref={inputRef}
        onChange={(e) => {
          const files = [];
          for (let i = 0; i < e.target.files!.length; i++) {
            console.log(e.target.files![i].type);
            files.push(e.target.files![i]);
          }
          setFile(files);
        }}
        accept="video/mp4,video/x-m4v,video/*,.mkv"
        multiple
      />
      {file?.length ? (
        <div className="space-y-5">
          {file.map((f, i) => (
            <FileCard
              key={i}
              file={f}
              onDelete={() => {
                const newFiles = file.slice();
                newFiles.splice(i, 1);
                setFile(newFiles);
              }}
            />
          ))}
        </div>
      ) : (
        <button
          className="min-h-96 w-full rounded border-2"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <div className="grid h-full place-items-center">
            <div className="flex flex-col items-center gap-8">
              <FileIcon size={64} />
              <div>
                <p className="text-lg">Upload a File</p>
                <p className="text-sm">video size limit is 1 GB</p>
              </div>
            </div>
          </div>
        </button>
      )}
    </>
  );
};
