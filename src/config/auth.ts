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
      const response = await api.post(`/user/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );        
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
export default AuthService;
