"use client";

import { cn } from "@/lib/utils";
import {
  Loader2,
  Image as ImageIcon,
  MousePointerSquareDashed,
} from "lucide-react";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const Page = () => {
  const { toast } = useToast();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
  });
  const onDropRejected = (fileRejections: FileRejection[]) => {
    const [file] = fileRejections;
    toast({
      title: `${file.file.type} is not supported`,
      description: "Only image files are allowed",
      variant: "destructive",
    });
    setIsDragOver(false);
  };
  const onDropAccepted = (files: File[]) => {
    startUpload(files, { configId: undefined });
    setIsDragOver(false);
  };

  return (
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
          accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
          onDropRejected={(fileRejections) => onDropRejected(fileRejections)}
          onDropAccepted={(files) => onDropAccepted(files)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="w-full h-full flex-1 flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="w-6 h-6 text-zinc-500 mb-2" />
              ) : isUploading || isPending ? (
                <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
              ) : (
                <ImageIcon className="w-6 h-6 text-zinc-500 mb-2" />
              )}
              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p className="">Uploading...</p>
                    <Progress
                      value={progress}
                      className="mt-2 w-40 h-2 bg-gray-300"
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p className="">Redirecting please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Drag and drop</span> or{" "}
                    <span className="font-semibold">click</span> to select files
                  </p>
                )}
              </div>
              {isPending ? null : (
                <p className="text-sm text-zinc-500">PNG, JPG, GIF up to 5MB</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default Page;
