import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Flag } from "@/components/ui/flag";
import {
  type FlagCode,
  FlagPicker,
  flagsData,
} from "@/components/ui/flag-picker";
import { Label } from "@/components/ui/label";

export default function FlagPickerDemo() {
  const [selectedCountry, setSelectedCountry] = useState<FlagCode | undefined>(
    "US"
  );

  const clearSelection = () => {
    setSelectedCountry(undefined);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <Label className="text-lg font-semibold">Country Selection</Label>
        <div className="flex items-center gap-4">
          <FlagPicker
            value={selectedCountry}
            onValueChange={setSelectedCountry}
            triggerPlaceholder="Select a country"
            searchPlaceholder="Search countries..."
          />

          {selectedCountry && (
            <Button variant="outline" size="sm" onClick={clearSelection}>
              Clear
            </Button>
          )}
        </div>
      </div>

      {selectedCountry && (
        <div className="space-y-4 rounded-lg border p-4">
          <Label className="text-md font-medium">Selected Country:</Label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Small Flag</Label>
              <Flag code={selectedCountry} size="sm" showName />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Medium Flag</Label>
              <Flag code={selectedCountry} size="md" showName />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Large Flag</Label>
              <Flag code={selectedCountry} size="lg" showName />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">
              Flag Only (Extra Large)
            </Label>
            <div className="flex items-center gap-4">
              <Flag code={selectedCountry} size="xl" />
              <Flag code={selectedCountry} size="2xl" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Country Information</Label>
            <div className="flex items-center gap-4 rounded bg-gray-50 p-3 text-sm">
              <Flag code={selectedCountry} size="lg" />
              <div>
                <div>
                  <strong>Code:</strong> {selectedCountry}
                </div>
                <div>
                  <strong>Name:</strong>{" "}
                  {flagsData.find((f) => f.code === selectedCountry)?.name}
                </div>
                <div>
                  <strong>Continent:</strong>{" "}
                  {flagsData.find((f) => f.code === selectedCountry)?.continent}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-md font-medium">Popular Countries:</Label>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {[
            "US",
            "GB",
            "DE",
            "FR",
            "JP",
            "CA",
            "AU",
            "BR",
            "IN",
            "CN",
            "IT",
            "ES",
          ].map((code) => (
            <div
              key={code}
              className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-gray-50"
              onClick={() => setSelectedCountry(code as FlagCode)}>
              <Flag code={code as FlagCode} size="xl" />
              <span className="text-center text-xs font-medium">
                {flagsData.find((f) => f.code === code)?.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-md font-medium">
          All Available Flags by Continent:
        </Label>
        {Object.entries(
          flagsData.reduce((acc, flag) => {
            const continent = flag.continent;
            if (!acc[continent]) acc[continent] = [];
            acc[continent].push(flag);
            return acc;
          }, {} as Record<string, typeof flagsData>)
        ).map(([continent, flags]) => (
          <div key={continent} className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              {continent}
            </Label>
            <div className="flex flex-wrap gap-2">
              {flags.map((flag) => (
                <div
                  key={flag.code}
                  className="flex cursor-pointer items-center gap-1 rounded border px-2 py-1 transition-colors hover:bg-gray-50"
                  onClick={() => setSelectedCountry(flag.code as FlagCode)}
                  title={flag.name}>
                  <Flag code={flag.code as FlagCode} size="sm" />
                  <span className="text-xs">{flag.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label className="text-md font-medium">Usage Examples:</Label>
        <div className="space-y-2 text-sm">
          <div className="rounded bg-gray-100 p-2 font-mono">
            {"<FlagPicker value={country} onValueChange={setCountry} />"}
          </div>
          <div className="rounded bg-gray-100 p-2 font-mono">
            {'<Flag code="US" showName size="lg" />'}
          </div>
          <div className="rounded bg-gray-100 p-2 font-mono">
            {'<Flag code="GB" size="sm" />'}
          </div>
          <div className="rounded bg-gray-100 p-3 text-xs">
            <div className="mb-1 font-semibold">Note:</div>
            <div>
              This component uses the flag-icons library for crisp SVG flags
              that work on all systems.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
