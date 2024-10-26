import bridge from "@vkontakte/vk-bridge";
import {
  APP_ID,
  BASE_URL,
  VK_ACCESS_TOKEN,
  VMESTE_ACCESS_TOKEN,
  VMESTE_USER_ID,
} from "../constants";
import { setStorageValue } from "./vkStorage";

export async function authorize() {
  try {
    const vkToken = await bridge.send("VKWebAppGetAuthToken", {
      app_id: APP_ID,
      scope: "",
    });

    if (vkToken && vkToken.access_token) {
      setStorageValue(VK_ACCESS_TOKEN, vkToken.access_token);

      const request = await fetch(`${BASE_URL}/auth/login/vk`, {
        method: "POST",
        body: JSON.stringify({ vkAccessToken: vkToken.access_token }),
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
