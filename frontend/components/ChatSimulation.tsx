"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ChatSimulation() {
  // 🗨️ ชุดข้อความทั้งหมด
  const chats = [
    ["เข้าเกมๆ", "แฟนไม่ให้เล่นว่ะ", "ไรว้าา"],
    ["ขาด 1 กดแรงค์ไม่ได้", "หาใน GGmates ดิ", "เคๆ"],
    ["เล่นด้วยดิ", "เต็มละ", "อ่าว"],
    ["เล่นปะ ว่างละ", "ไม่ว่างอะดิ", "..."],
    ["มาๆ", "ยังไม่ได้อัพเดทเลย", "..."],
    ["แรงค์ปะ", "กากเกิน ไม่อยากเล่นด้วย", "อ่าว"],
    ["เล่นปะ", "เน็ตไม่ดีว่ะ ชวนคนอื่นดู", "เค"],
  ];

  const [messages, setMessages] = useState(chats[0]);

  useEffect(() => {
    // สุ่มชุดข้อความตอนโหลดหน้า
    const randomSet = chats[Math.floor(Math.random() * chats.length)];
    setMessages(randomSet);
  }, []);

  // ✅ return JSX เท่านั้น
  return (
    <div className="relative h-67 w-full max-w-md mx-auto flex flex-col gap-3 overflow-hidden">
      {/* A: ซ้าย */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-start gap-3"
      >
        <Image
          src="/avatars/A.png"
          alt="A"
          width={60}
          height={60}
          className=""
        />
        <div className="bg-[#1C2230] px-4 py-2 mt-4 rounded-2xl rounded-tl-none max-w-[70%] text-left">
          <p>{messages[0]}</p>
        </div>
      </motion.div>

      {/* B: ขวา */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3 }}
        className="flex items-start justify-end gap-3"
      >
        <div className="bg-[#252C3D] px-4 py-2 mt-4 rounded-2xl rounded-tr-none max-w-[70%] text-right">
          <p>{messages[1]}</p>
        </div>
        <Image
          src="/avatars/B.png"
          alt="B"
          width={60}
          height={60}
          className=""
        />
      </motion.div>

      {/* A: ซ้าย */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.1 }}
        className="flex items-start gap-3"
      >
        <Image
          src="/avatars/A.png"
          alt="A"
          width={60}
          height={60}
          className=""
        />
        <div className="bg-[#1C2230] px-4 py-2 mt-4 rounded-2xl rounded-tl-none max-w-[70%] text-left">
          <p>{messages[2]}</p>
        </div>
      </motion.div>
    </div>
  );
}
