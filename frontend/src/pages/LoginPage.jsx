import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as authServiceLogin } from "../services/authservices";
import { useAuth } from "../contexts/AuthContext";
// import { getProfile } from "../services/authservices";
import { getUsersById } from "../services/authservices";

export default function AnimatedLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await authServiceLogin(phone, password);
      console.log("User data:", user.role, user.id);
      const userProfile = await getUsersById(user.id);
      // const userProfile = await getProfile();
      // console.log("User profile:", userProfile);
      console.log("User profile:", userProfile);
      login(userProfile);
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1f293a]">
      <div className="relative w-64 h-64 flex justify-center items-center">
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={i} style={{ "--i": i }} className="animated-span" />
        ))}
        <div className="absolute w-[400px]">
          <h2 className="text-2xl text-center text-[#0ef]">ĐĂNG NHẬP</h2>
          <form onSubmit={handleSubmit} className="w-full px-[50px]">
            <div className="relative my-[25px] input-box">
              <input
                type="text"
                name="phone"
                autoComplete="tel"
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full h-[50px] bg-transparent border-2 border-[#2c4766] outline-none rounded-full text-white px-5 transition duration-500 focus:border-[#0ef]"
              />
              <label className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-base pointer-events-none transition-all duration-500">
                Số điện thoại
              </label>
            </div>
            <div className="relative my-[25px] input-box">
              <input
                type="password"
                name="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-[50px] bg-transparent border-2 border-[#2c4766] outline-none rounded-full text-white px-5 transition duration-500 focus:border-[#0ef]"
              />
              <label className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-base pointer-events-none transition-all duration-500">
                Mật khẩu
              </label>
            </div>
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
            <div className="text-center mb-4 forgot-pass">
              <a href="#" className="text-sm text-white hover:underline">
                Bạn quên mật khẩu?
              </a>
            </div>
            <button
              type="submit"
              className="w-full h-[45px] bg-[#0ef] border-none outline-none rounded-full cursor-pointer text-base text-[#1f293a] font-semibold transition-colors duration-300 hover:bg-[#0cdfea]"
            >
              Đăng nhập
            </button>
            <div className="text-center mt-4 signup-link">
              <a
                href="/register"
                className="text-base text-[#0ef] font-semibold hover:underline"
              >
                Đăng ký tài khoản mới
              </a>
            </div>
          </form>
        </div>
      </div>
      <style>{`
        .animated-span {
          position: absolute;
          left: 0;
          width: 32px;
          height: 6px;
          background: #2c4766;
          border-radius: 8px;
          transform-origin: 128px;
          transform: scale(2.2) rotate(calc(var(--i) * (360deg / 50)));
          animation: blink 3s linear infinite;
          animation-delay: calc(var(--i) * (3s / 50));
        }

        @keyframes blink {
          0% {
            background: #0ef;
          }
          25% {
            background: #2c4766;
          }
        }

        /* Khi input được focus hoặc có dữ liệu (không hiển thị placeholder), label sẽ nhảy lên trên */
        .input-box input:focus ~ label,
        .input-box input:not(:placeholder-shown) ~ label {
          top: 1px;
          font-size: 0.8em;
          background: #1f293a;
          padding: 0 6px;
          color: #0ef;
        }
      `}</style>
    </div>
  );
}
