import bridge from "@vkontakte/vk-bridge";
import { BASE_URL, VMESTE_ACCESS_TOKEN, VMESTE_USER_ID } from "../constants";
import { setStorageValue } from "./vkStorage";

export async function authorize() {
  try {
    if (window.location.href) {
      const request = await fetch(`${BASE_URL}/auth/login/vk`, {
        method: "POST",
        body: JSON.stringify({ vkLaunchParams: window.location.href }),
      });

      if (request.ok) {
        const { token, userId } = await request.json();
        setStorageValue(VMESTE_ACCESS_TOKEN, token);
        setStorageValue(VMESTE_USER_ID, String(userId));
      }
    } else {
      await bridge.send("VKWebAppClose", {
        status: "failed",
      });
    }
  } catch (error) {
    await bridge.send("VKWebAppClose", {
      status: "failed",
    });
  }
}
