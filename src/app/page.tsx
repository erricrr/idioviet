import { MobileOnlyWrapper } from "@/components/app/mobile-only-wrapper";
import { VietSpeakClient } from "@/components/app/vietspeak-client";

export default function Home() {
  return (
    <main className="h-dvh bg-background">
      <MobileOnlyWrapper>
        <VietSpeakClient />
      </MobileOnlyWrapper>
    </main>
  );
}
