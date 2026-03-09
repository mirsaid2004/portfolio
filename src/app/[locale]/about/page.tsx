import dynamic from "next/dynamic";
import { PageSuspense } from "@/components/page-suspense";

const UnderConstruction = dynamic(
  () => import("@/components/under-construction"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default function AboutPage() {
  return (
    <PageSuspense loaderVariant="full">
      <UnderConstruction />
    </PageSuspense>
  );
}
