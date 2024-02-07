import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { videoOptions } from "@/lib/utils";

export const VideoFormatSelect = ({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Select value={value} onValueChange={(value) => setValue(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Video Format" className="uppercase" />
      </SelectTrigger>
      <SelectContent>
        {videoOptions.map((option, i) => (
          <SelectItem key={i} value={option.type} className="uppercase">
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
