"use client";

import { useEffect, useState } from "react";

// TypeScript type for the Chrome install event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [platform, setPlatform] = useState<"ios" | "android" | "other">("other");
  const [isStandalone, setIsStandalone] = useState(false);
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Detect platform
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);

    if (isIOS) setPlatform("ios");
    else if (isAndroid) setPlatform("android");

    // Check if already installed (running in standalone mode)
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    // Listen for Chrome's install prompt event (Android + desktop Chrome)
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // If already installed, show nothing
  if (isStandalone) return null;

  // Trigger Chrome's native install dialog (Android)
  const handleAndroidInstall = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const result = await installEvent.userChoice;
    if (result.outcome === "accepted") {
      setInstallEvent(null);
    }
  };

  // iOS Safari — show instructions
  if (platform === "ios") {
    return (
      <div
        style={{
          marginTop: "24px",
          padding: "16px",
          background: "#f5f1e8",
          borderRadius: "12px",
          fontSize: "14px",
          color: "#555",
          lineHeight: "1.5",
        }}
      >
        💡 <strong>Want quick access on a hard day?</strong>
        <br />
        Tap the <strong>Share</strong> icon, then{" "}
        <strong>Add to Home Screen</strong>.
      </div>
    );
  }

  // Android Chrome — show real install button (only if Chrome allows it)
  if (platform === "android" && installEvent) {
    return (
      <div style={{ marginTop: "24px" }}>
        <button
          onClick={handleAndroidInstall}
          style={{
            padding: "12px 20px",
            background: "#3d6b5f",
            color: "white",
            border: "none",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          📲 Install Untangle for quick access
        </button>
      </div>
    );
  }

  // Desktop or unsupported — show nothing
  return null;
}