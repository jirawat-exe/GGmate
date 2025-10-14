"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";

export default function FeedSection() {
  const [creatingPost, setCreatingPost] = useState(false);
  const [posts, setPosts] = useState<number[]>(Array.from({ length: 6 }, (_, i) => i));
  const loaderRef = useRef<HTMLDivElement>(null);

  // 🌀 Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // simulate loading new posts
          setTimeout(() => {
            setPosts((prev) => [
              ...prev,
              ...Array.from({ length: 6 }, (_, i) => prev.length + i),
            ]);
          }, 800);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  return (
    <section
      id="feed-section"
      className="w-full max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8"
    >
      {/* ---------- LEFT SIDEBAR ---------- */}
      <div className="relative">
        <div className="sticky top-24 flex flex-col gap-6">
          {/* ปุ่มสร้างโพสต์ */}
          <motion.div
            layout
            animate={{ height: creatingPost ? 200 : 50 }}
            className="overflow-hidden rounded-xl bg-[#1C2230] transition-all"
          >
            <Button
              onPress={() => setCreatingPost((v) => !v)}
              className="w-full bg-[#9B5DE5] hover:bg-[#8644cc] text-white font-bold py-3 rounded-xl"
            >
              {creatingPost ? "กำลังสร้างโพสต์..." : "สร้างโพสต์ใหม่"}
            </Button>

            {/* ช่องเขียนโพสต์เมื่อกด */}
            <AnimatePresence>
              {creatingPost && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4"
                >
                  <textarea
                    placeholder="พิมพ์สิ่งที่อยากโพสต์..."
                    className="w-full p-3 rounded-lg bg-[#252C3D] text-white resize-none"
                    rows={4}
                  />
                  <div className="flex justify-end mt-3">
                    <Button
                      size="sm"
                      className="bg-[#00A8E8] hover:bg-[#0090c7]"
                      onPress={() => setCreatingPost(false)}
                    >
                      โพสต์
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Filter */}
          <AnimatePresence>
            {!creatingPost && (
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1C2230] p-5 rounded-xl"
              >
                <h3 className="text-lg font-semibold mb-3">Filter</h3>
                <div className="flex flex-col gap-3 text-sm text-gray-300">
                  <label>
                    <input type="checkbox" className="mr-2" /> เกมที่เล่นล่าสุด
                  </label>
                  <label>
                    <input type="checkbox" className="mr-2" /> หาเพื่อนเล่นแรงค์
                  </label>
                  <label>
                    <input type="checkbox" className="mr-2" /> ชวนเข้าดิส
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ---------- RIGHT POSTS FEED ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1C2230] hover:bg-[#252C3D] p-6 rounded-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">หาทีมเล่นแรงค์ #{i + 1}</h3>
            <p className="text-gray-400 text-sm">
              ต้องการเพื่อนอีก 1 คน เล่นได้ทุก role
            </p>
          </motion.div>
        ))}

        {/* จุด trigger โหลดโพสต์เพิ่ม */}
        <div ref={loaderRef} className="h-10 w-full col-span-full flex justify-center items-center text-gray-500">
          กำลังโหลด...
        </div>
      </div>
    </section>
  );
}
