import { computed } from "vue";
import { useAuthStore } from "@/store/authStore";

const useUser = () => {
  const authStore = useAuthStore();

  const user = computed(() => {
    return authStore.getAuth;
  });

  return {
    user,
  };
}
export default useUser;