
"use client";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { useState, useEffect } from "react";
import LoginModal from "@/components/LoginModal";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import React from 'react';
import {Button} from '@heroui/react';
import confetti from 'canvas-confetti';
import Image from 'next/image';

import { motion } from "framer-motion";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#000000] to-[#141821] text-white">
      {/* HERO SECTION */}
      <section className="text-center mt-7 mb-32">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          เกมไม่ใช่แค่ฝีมือ<br />แต่คือทีมเวิร์ก
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          GGmates พื้นที่ของเกมเมอร์ ที่อยากมีเพื่อนเล่นเกมเดียวกัน<br />
          เชื่อมต่อ พูดคุย รวมทีม ได้ในที่เดียว
        </p>

        {/* Chat simulation */}
        <div className="relative h-64 w-full max-w-md mx-auto flex flex-col gap-3 overflow-hidden">
          {/* A: ซ้าย */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-start gap-3"
          >
            <Image
              src="/avatars/avatar1.png"
              alt="A"
              width={40}
              height={40}
              className="rounded-full border-2 border-[#00A8E8]"
            />
            <div className="bg-[#1C2230] px-4 py-2 rounded-2xl rounded-tl-none max-w-[70%] text-left">
              <p>เล่นเกมกัน</p>
            </div>
          </motion.div>

          {/* B: ขวา */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
            className="flex items-start justify-end gap-3"
          >
            <div className="bg-[#252C3D] px-4 py-2 rounded-2xl rounded-tr-none max-w-[70%] text-right">
              <p>ไม่ว่างอะ อยู่ข้างนอก</p>
            </div>
            <Image
              src="/avatars/avatar2.png"
              alt="B"
              width={40}
              height={40}
              className="rounded-full border-2 border-[#9B5DE5]"
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
              src="/avatars/avatar1.png"
              alt="A"
              width={40}
              height={40}
              className="rounded-full border-2 border-[#00A8E8]"
            />
            <div className="bg-[#1C2230] px-4 py-2 rounded-2xl rounded-tl-none max-w-[70%] text-left">
              <p>ไรว้าา</p>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onPress={() => setShowLogin(true)}
            className="bg-[#9B5DE5] hover:bg-[#8644cc] text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-[#9B5DE5]/50 transition"
          >
            เข้าสู่ระบบ
          </Button>

          <Button
            onPress={() =>
              document
                .getElementById("feed-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#00A8E8] hover:bg-[#0090c7] text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-[#00A8E8]/50 transition"
          >
            Enter
          </Button>
        </div>
      </section>

      {/* FEED SECTION */}
      <section
        id="feed-section"
        className="w-full max-w-5xl px-6 pb-32 pt-20 text-left"
      >
        <h2 className="text-2xl font-bold mb-6">โพสต์ล่าสุด</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-[#1C2230] hover:bg-[#252C3D] p-6 rounded-xl transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold">หาทีมเล่นแรงค์ #{i + 1}</h3>
              <p className="text-gray-400 text-sm">
                ต้องการเพื่อนอีก 1 คน เล่นได้ทุก role
              </p>
            </div>
          ))}
        </div>
      </section>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </main>
  );
}