import { GoBackButton } from "@/components/go-back-button";
import { FileUpload } from "@/components/video-form";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-5">
      <div>
        <GoBackButton />
      </div>
      <div className="flex flex-1">
        <div className="min-h-96 w-full">
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
