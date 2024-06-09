import { db } from "@/app/db";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";

interface pageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const Page = async ({ searchParams }: pageProps) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") return notFound();
  const configuration = await db.configuration.findUnique({
    where: { id },
  });
  if (!configuration) return notFound();
  if (
    !configuration.model ||
    !configuration.color ||
    !configuration.croppedImageUrl
  )
    return notFound();

  // configId={id} imageUrl={imageUrl} width={width} height={height} croppedImageUrl={croppedImageUrl} model={model} color={color} finish={finish} material={material}
  return <DesignPreview configuration={configuration} />;
};

export default Page;
