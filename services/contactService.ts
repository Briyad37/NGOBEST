import { apiCall, API_CONFIG } from "../config/api"
import type { ContactMessage, ApiResponse } from "../types"

export const contactService = {
  sendMessage: async (messageData: ContactMessage): Promise<ApiResponse<void>> => {
    return apiCall<void>(API_CONFIG.ENDPOINTS.CONTACT, {
      method: "POST",
      body: JSON.stringify(messageData),
    })
  },
}
