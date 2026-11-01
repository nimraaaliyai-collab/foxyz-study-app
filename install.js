const installButton = document.getElementById("installButton");
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButton.classList.remove("hidden");
});

installButton.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;

  if (outcome === "accepted") {
    console.log("User accepted the install prompt");
  } else {
    console.log("User dismissed the install prompt");
  }

  deferredPrompt = null;
  installButton.classList.add("hidden");
});

window.addEventListener("appinstalled", () => {
  installButton.classList.add("hidden");
  deferredPrompt = null;
});
