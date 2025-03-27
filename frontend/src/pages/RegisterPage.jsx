import React, { useState } from "react";
import { Register as registerUser } from "../services/authservices";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); // Thêm state cho thông báo thành công

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(""); // Reset thông báo thành công
        try {
            const response = await registerUser(phone, password, email, fullName);
            console.log("Đăng ký thành công:", response);
            setSuccess("Đăng ký thành công!"); // Cập nhật thông báo thành công
            setTimeout(() => navigate("/login"), 2000); // Chuyển hướng sau 2 giây
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1f293a]">
            <div className="relative w-64 h-64 flex justify-center items-center">
                {Array.from({ length: 50 }).map((_, i) => (
                    <span key={i} style={{ "--i": i }} className="animated-span" />
                ))}
                <div className="absolute w-[400px]">
                    <h2 className="text-2xl text-center text-[#0ef]">ĐĂNG KÝ</h2>
                    <form onSubmit={handleSubmit} className="w-full px-[50px]">
                        <div className="relative my-[25px] input-box">
                            <input
                                type="text"
                                name="full_name"
                                placeholder=" "
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="w-full h-[50px] bg-transparent border-2 border-[#2c4766] outline-none rounded-full text-white px-5 transition duration-500 focus:border-[#0ef]"
                            />
                            <label className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-base pointer-events-none transition-all duration-500">
                                Họ và tên
                            </label>
                        </div>
                        <div className="relative my-[25px] input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full h-[50px] bg-transparent border-2 border-[#2c4766] outline-none rounded-full text-white px-5 transition duration-500 focus:border-[#0ef]"
                            />
                            <label className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-base pointer-events-none transition-all duration-500">
                                Email
                            </label>
                        </div>
                        <div className="relative my-[25px] input-box">
                            <input
                                type="text"
                                name="phone"
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
                        {success && (
                            <p className="text-green-500 text-center text-sm">{success}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full h-[45px] bg-[#0ef] border-none outline-none rounded-full cursor-pointer text-base text-[#1f293a] font-semibold transition-colors duration-300 hover:bg-[#0cdfea]"
                        >
                            Đăng ký
                        </button>
                        <div className="text-center mt-4 signup-link">
                            <a
                                href="/login"
                                className="text-base text-[#0ef] font-semibold hover:underline"
                            >
                                Đã có tài khoản? Đăng nhập
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
