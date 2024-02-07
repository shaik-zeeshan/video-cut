import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Slider } from "./ui/slider";
import { getVideoDuration } from "@/lib/utils";
import { Input } from "./ui/input";

export const VideoSlider = ({
  file,
  values,
  setValues,
}: {
  file: File;
  values: number[];
  setValues: Dispatch<SetStateAction<number[]>>;
}) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    getVideoDuration(file, (dur) => {
      setDuration(dur);
      setValues([0, parseFloat(dur.toFixed(2))]);
    });
  }, [file, setValues]);

  return (
    <div className="py-5">
      <div className="flex justify-between py-3">
        <div className="flex items-end gap-2">
          <Input
            value={values[0]}
            className="w-32"
            min={0}
            max={duration}
            type="number"
            onChange={(e) => {
              let value = !isNaN(parseFloat(e.target.value))
                ? parseFloat(e.target.value)
                : 0;
              setValues([value, values[1]]);
            }}
          />
          s
        </div>
        <div className="flex items-end gap-2">
          <Input
            value={values[1]}
            type="number"
            min={0}
            max={duration}
            className="w-32"
            onChange={(e) => {
              let value = !isNaN(parseFloat(e.target.value))
                ? parseFloat(e.target.value)
                : 0;
              setValues([values[0], value]);
            }}
          />
          s
        </div>
      </div>
      <div>
        <Slider
          value={values}
          min={0}
          max={duration}
          onValueChange={(value) => {
            setValues(value);
          }}
        />
      </div>
    </div>
  );
};
