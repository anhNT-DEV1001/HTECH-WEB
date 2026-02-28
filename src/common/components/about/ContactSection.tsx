"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="w-full min-h-screen py-24 px-4 flex flex-col items-center bg-gradient-to-b from-white via-[#fde2e2] to-[#f4f6f9]">
      {/* Tiêu đề Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#222222] mb-4">
          Liên hệ với chúng tôi
        </h2>
        <p className="text-[#666666] text-sm md:text-base max-w-lg mx-auto">
          Thông tin bạn cung cấp sẽ được cam kết bảo mật và chỉ sử dụng cho mục đích liên hệ.
        </p>
      </motion.div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white w-full max-w-2xl rounded-[40px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <form className="flex flex-col space-y-6">
          {/* Họ tên */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-800 mb-2 ml-2">Họ tên*</label>
            <input
              type="text"
              placeholder="Họ và tên đầy đủ"
              className="w-full bg-[#f4f4f5] text-gray-700 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all placeholder:text-gray-400"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-800 mb-2 ml-2">Email*</label>
            <input
              type="email"
              placeholder="Địa chỉ Email liên hệ"
              className="w-full bg-[#f4f4f5] text-gray-700 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all placeholder:text-gray-400"
              required
            />
          </div>

          {/* Số điện thoại và Công ty (Layout 2 cột trên Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800 mb-2 ml-2">Số điện thoại*</label>
              <input
                type="tel"
                placeholder="Số điện thoại liên hệ"
                className="w-full bg-[#f4f4f5] text-gray-700 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all placeholder:text-gray-400"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800 mb-2 ml-2">Công ty</label>
              <input
                type="text"
                placeholder="Tên công ty (nếu có)"
                className="w-full bg-[#f4f4f5] text-gray-700 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Lời nhắn */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-800 mb-2 ml-2">Lời nhắn*</label>
            <textarea
              placeholder="Vui lòng để lại lời nhắn của bạn, chúng tôi sẽ phản hồi sớm nhất có thể..."
              rows={4}
              className="w-full bg-[#f4f4f5] text-gray-700 rounded-[24px] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all resize-none placeholder:text-gray-400"
              required
            ></textarea>
          </div>

          {/* Nút Submit */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#ff5a5a] to-[#ff3b3b] text-white font-semibold py-4 px-10 rounded-full shadow-[0_8px_20px_rgba(255,90,90,0.4)] hover:shadow-[0_10px_25px_rgba(255,90,90,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              Gửi thông tin
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}