import bridge from "@vkontakte/vk-bridge";
import { APP_ID } from "../constants";

export async function authorize() {
  try {
    const token = await bridge.send("VKWebAppGetAuthToken", {
      app_id: APP_ID,
      scope: "friends,status,groups",
    });

    if (token && token.access_token) {
      localStorage.setItem("vkAccessToken", token.access_token);
    } else {
      await bridge.send("VKWebAppClose", {
        status: "failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
