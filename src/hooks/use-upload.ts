import { useAtom } from "jotai";
import { type ChangeEvent, type DragEvent, useCallback } from "react";
import { imageAtom, isDraggingAtom } from "@/atoms/pixel-art";

export function useImageUpload() {
  const [image, setImage] = useAtom(imageAtom);
  const [isDragging, setIsDragging] = useAtom(isDraggingAtom);

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    },
    [setIsDragging],
  );

  const handleDragLeave = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    },
    [setIsDragging],
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [setImage, setIsDragging],
  );

  const handleFileInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [setImage],
  );

  return {
    image,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
  };
}
