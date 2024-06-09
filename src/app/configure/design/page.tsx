import { db } from "@/app/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";

interface pageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: pageProps) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") return notFound();

  const configuration = await db.configuration.findUnique({
    where: { id: id },
  });

  if (!configuration) return notFound();

  const { imageUrl, width, height } = configuration;

  return (
    <DesignConfigurator
      configId={id}
      imageUrl={imageUrl}
      width={width}
      height={height}
    />
  );
};

export default Page;
