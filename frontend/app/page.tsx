
"use client";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { useState, useEffect } from "react";
import LoginModal from "@/components/LoginModal";
import ChatSimulation from "@/components/ChatSimulation";

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
    <main className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-r from-[#060008] via-[#000000] to-[#060000]">
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
        <ChatSimulation />

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