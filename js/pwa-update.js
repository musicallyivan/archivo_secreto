(() => {
  "use strict";

  if (!("serviceWorker" in navigator)) return;

  const isAlina = window.location.pathname.includes("alina");
  const accentColor = isAlina ? "#7c8cff" : "#ff8fc7";
  const accentGlow = isAlina ? "rgba(124, 140, 255, 0.45)" : "rgba(255, 143, 199, 0.45)";
  const btnGradient = isAlina
    ? "linear-gradient(135deg, #ffffff, #8ea1ff)"
    : "linear-gradient(135deg, #ffffff, #ff8fc7)";
  const btnTextColor = isAlina ? "#0e1438" : "#280b1e";

  // Inject update toast styles
  const style = document.createElement("style");
  style.id = "pwa-update-styles";
  style.textContent = `
    .pwa-update-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(130px);
      z-index: 100000;
      width: min(440px, calc(100vw - 28px));
      padding: 14px 18px;
      border-radius: 22px;
      background: rgba(16, 10, 24, 0.94);
      border: 1px solid ${accentGlow};
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65), 0 0 35px ${accentGlow};
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, visibility 0.45s;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "DM Sans", "Segoe UI", Roboto, sans-serif;
    }
    .pwa-update-toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
    .pwa-update-info {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .pwa-update-icon {
      font-size: 24px;
      line-height: 1;
      flex-shrink: 0;
      animation: pwaSpin 5s linear infinite;
    }
    .pwa-update-text {
      min-width: 0;
    }
    .pwa-update-text strong {
      display: block;
      font-size: 0.93rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 2px;
      letter-spacing: -0.01em;
    }
    .pwa-update-text p {
      margin: 0;
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.75);
      line-height: 1.35;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pwa-update-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .pwa-update-btn {
      padding: 9px 18px;
      border-radius: 999px;
      border: none;
      background: ${btnGradient};
      color: ${btnTextColor};
      font-size: 0.84rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 16px ${accentGlow};
      transition: transform 0.2s, box-shadow 0.2s;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .pwa-update-btn:hover {
      transform: translateY(-2px) scale(1.03);
    }
    .pwa-update-btn:active {
      transform: scale(0.97);
    }
    .pwa-update-close {
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.55);
      font-size: 20px;
      cursor: pointer;
      padding: 6px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: color 0.2s, background 0.2s;
    }
    .pwa-update-close:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }
    @keyframes pwaSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @media (max-width: 480px) {
      .pwa-update-toast {
        bottom: 16px;
        padding: 12px 14px;
        gap: 10px;
        border-radius: 18px;
      }
      .pwa-update-text strong {
        font-size: 0.86rem;
      }
      .pwa-update-text p {
        font-size: 0.74rem;
      }
      .pwa-update-btn {
        padding: 8px 14px;
        font-size: 0.78rem;
      }
    }
  `;
  document.head.appendChild(style);

  let toast = null;
  let refreshing = false;

  function showUpdateNotification(worker) {
    if (toast) {
      toast.classList.add("show");
      return;
    }

    toast = document.createElement("div");
    toast.className = "pwa-update-toast";
    toast.setAttribute("role", "alert");
    toast.innerHTML = `
      <div class="pwa-update-info">
        <span class="pwa-update-icon">✨</span>
        <div class="pwa-update-text">
          <strong>¡Nueva versión lista!</strong>
          <p>Hay nuevos recuerdos y mejoras disponibles.</p>
        </div>
      </div>
      <div class="pwa-update-actions">
        <button type="button" class="pwa-update-btn" id="pwaReloadBtn">Actualizar ↺</button>
        <button type="button" class="pwa-update-close" id="pwaCloseBtn" aria-label="Cerrar notificación">×</button>
      </div>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    document.getElementById("pwaReloadBtn")?.addEventListener("click", () => {
      toast.classList.remove("show");
      if (worker) {
        worker.postMessage({ type: "SKIP_WAITING" });
      }
      setTimeout(() => {
        window.location.reload();
      }, 350);
    });

    document.getElementById("pwaCloseBtn")?.addEventListener("click", () => {
      toast.classList.remove("show");
    });
  }

  // Prevent multiple reloads
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("sw.js");

      // Case 1: An updated worker is already waiting in background
      if (reg.waiting) {
        showUpdateNotification(reg.waiting);
        return;
      }

      // Case 2: A new worker was discovered and installed
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            showUpdateNotification(newWorker);
          }
        });
      });

      // Case 3: Periodic background checks
      setInterval(() => {
        reg.update().catch(() => {});
      }, 10 * 60 * 1000); // Check every 10 minutes

      // Case 4: Check when user returns to app
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
          reg.update().catch(() => {});
        }
      });

      // Immediate check on load
      reg.update().catch(() => {});
    } catch (e) {
      console.warn("SW Registration:", e);
    }
  });

  // Expose helper globally for manual check/test if desired
  window.checkAppUpdate = () => {
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg) {
        if (reg.waiting) showUpdateNotification(reg.waiting);
        else reg.update().catch(() => {});
      }
    });
  };
})();
