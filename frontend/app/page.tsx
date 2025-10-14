
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
import {Button, Avatar} from '@heroui/react';
import confetti from 'canvas-confetti';
import Image from 'next/image';

import { motion } from "framer-motion";
import FeedSection from "@/components/FeedSection";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#000000] to-[#141821] text-white">
      {/* HERO SECTION */}
      <section className="text-center mt-7 mb-32">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          เกมไม่ใช่แค่ฝีมือ<br />แต่คือทีมเวิร์ก
        </h1>
        <p className="text-gray-400 text-lg mb-12 px-6 md:px-8">
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
              src="/avatars/A.png"
              alt="A"
              width={60}
              height={60}
              className=""
              
            />
            <div className="bg-[#1C2230] px-4 py-2 mt-4 rounded-2xl rounded-tl-none max-w-[70%] text-left">
              <p>เข้าเกมๆ</p>
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
              <p>แฟนไม่ให้เล่นว่ะ</p>
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
              <p>ไรว้าา</p>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center gap-6 relative -top-3">
        {/* เข้าสู่ระบบ */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onPress={() => setShowLogin(true)}
            color="secondary"
            variant="shadow"
            size="lg"
            className="bg-linear-to-tr from-purple-500 to-green-400 text-white shadow-lg"
            radius="full"
          >
          <span style={{ textShadow: "0 2px 2px rgba(0,0,0,1.5)" }}>
          เข้าสู่ระบบ
          </span>
          </Button>
        </motion.div>
        

        {/* Enter */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onPress={() =>
              document
                .getElementById("feed-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            color="primary"
            variant="shadow"
            size="lg"
            className="bg-linear-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            radius="full"
          >
            <span style={{ textShadow: "0 2px 2px rgba(0,0,0,1.5)" }}>
            Enter
            </span>
          </Button>
        </motion.div>
      </div>
      </section>

      {/* FEED SECTION */}
      <FeedSection />
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </main>
  );
}