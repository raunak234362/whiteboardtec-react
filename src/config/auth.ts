import api from "./api";
class AuthService {
  static async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      const userData = { username, password };
      const response = await api.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );        
      return response
    } catch (error) {}
  }
}
export default AuthService;
