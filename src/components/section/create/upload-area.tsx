import { Icon } from "@iconify/react";

type Props = {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function UploadArea({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileInput,
}: Readonly<Props>) {
  return (
    <label
      htmlFor="file-upload"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`flex min-h-[400px] cursor-pointer flex-col items-center justify-center border-2 border-dashed bg-muted/20 p-12 transition-colors ${
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25"
      }`}
    >
      <div className="space-y-6 text-center">
        <div className="mx-auto flex size-20 items-center justify-center bg-primary/10">
          <Icon
            icon="pixelarticons:upload"
            width={40}
            height={40}
            className="text-primary"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-xl">Drop your image here</h3>
          <p className="text-muted-foreground text-sm">
            or click to browse from your device
          </p>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onFileInput}
          className="hidden"
          id="file-upload"
          aria-label="Upload image"
        />
        <div className="inline-flex h-9 items-center justify-center border bg-primary px-4 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90">
          <Icon
            icon="pixelarticons:image"
            width={16}
            height={16}
            className="mr-2"
          />
          Choose Image
        </div>
        <p className="text-muted-foreground text-xs">
          Supports JPG, PNG, GIF, WebP
        </p>
      </div>
    </label>
  );
}
