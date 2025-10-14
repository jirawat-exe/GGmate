"use client";
import { useState, useEffect, useRef } from "react";
import {Tabs, Tab} from "@heroui/tabs";
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Avatar,
  Spinner,
} from "@heroui/react";
import { Search, Filter, Plus, Minus, Users, Gamepad2, Trophy, LandPlot } from "lucide-react";
import { motion } from "framer-motion";

const mockGames = [
  { id: 1, name: "Valorant", img: "/games/valorant.webp", posts: 125 },
  { id: 2, name: "League of Legends", img: "/games/lol.webp", posts: 98 },
  { id: 3, name: "Apex Legends", img: "/games/apex.webp", posts: 74 },
  { id: 4, name: "Dota 2", img: "/games/dota2.webp", posts: 63 },
];

const genres = [
        "MOBA",
        "Shooter",
        "Role-playing (RPG)",
        "Battle Royale",
        "Sport",
        "Racing",
        "Simulator",
        "Fighting",
        "Strategy",
        "Real Time Strategy (RTS)",
        "Tactical",
        "Turn-based strategy (TBS)",
        "Puzzle",
        "Platform",
        "Indie",
        "Adventure",
        "Arcade",
        "Card & Board Game",
        "Visual Novel",
        "Point-and-click",
        "Hack and slash/Beat 'em up",
        "Pinball",
        "Quiz/Trivia"
    ];

export default function FeedSection() {
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [mode, setMode] = useState("both");
  const [playerFilterEnabled, setPlayerFilterEnabled] = useState(false);
  const [playerCount, setPlayerCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [posts, setPosts] = useState<number[]>(Array.from({ length: 6 }, (_, i) => i));
  const loaderRef = useRef<HTMLDivElement>(null);

  // simulate delayed search
  useEffect(() => {
    if (!playerFilterEnabled) return;
    const timer = setTimeout(() => {
      console.log("Searching for player count:", playerCount);
    }, 1000);
    return () => clearTimeout(timer);
  }, [playerCount, playerFilterEnabled]);

  // infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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

  const filteredGames = search
    ? mockGames.filter((g) =>
        g.name.toLowerCase().includes(search.toLowerCase())
      )
    : mockGames;

  // 🧱 Filter Panel (reuse inside drawer + desktop)
  const FilterPanel = (
    <div
        className="
        flex flex-col gap-8
        pr-2
        rounded-2xl
        bg-gradient-to-b from-[#9B5DE5]/10 via-[#1C2230]/80 to-[#141821]/80
        backdrop-blur-lg
        shadow-inner shadow-[inset_0_0_25px_rgba(155,93,229,0.25)]
        border border-[#2a2f40]/50
        p-6
        transition-all duration-500
        "
    >
        {/* 🔍 SEARCH */}
        <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
            <Search size={18} className="text-[#9B5DE5]" />
            ค้นหาเกม
        </h3>
        <Input
            placeholder="พิมพ์ชื่อเกม..."
            startContent={<Search size={18} className="text-gray-400" />}
            value={search}
            onValueChange={setSearch}
            classNames={{
            inputWrapper: "bg-[#252C3D] text-white border-none shadow-inner shadow-[#9B5DE5]/20",
            input: "text-white",
            }}
        />
        <div className="mt-3 max-h-48 overflow-y-auto">
            {filteredGames.map((game) => (
            <div
                key={game.id}
                className="flex items-center gap-3 py-2 px-2 hover:bg-[#252C3D] rounded-lg cursor-pointer transition"
            >
                <Avatar src={game.img} size="sm" />
                <div className="flex flex-col">
                <span>{game.name}</span>
                <span className="text-xs text-gray-400">{game.posts} posts</span>
                </div>
            </div>
            ))}
        </div>
        </div>

        {/* 🎮 GENRE */}
        <div className="space-y-3">
        <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Gamepad2 size={18} className="text-[#9B5DE5]" />
            เลือกแนวเกม
            </h3>
            {selectedGenres.length > 0 && (
            <Button
                size="sm"
                variant="light"
                className="text-gray-300 text-xs hover:text-white"
                onPress={() => setSelectedGenres([])}
            >
                รีเซ็ต
            </Button>
            )}
        </div>

        {/* ปุ่ม tag แนวเกมที่เลือก */}
        <div className="flex flex-wrap gap-2">
            {selectedGenres.map((g) => (
            <Button
                key={g}
                size="sm"
                className="bg-[#9B5DE5]/20 text-[#d7b7ff] hover:bg-[#9B5DE5]/30"
                onPress={() =>
                setSelectedGenres(selectedGenres.filter((item) => item !== g))
                }
            >
                {g} ✕
            </Button>
            ))}
            {/* ปุ่ม + เพิ่ม genre */}
            <Dropdown>
            <DropdownTrigger>
                <Button
                size="sm"
                variant="flat"
                className="bg-[#252C3D] text-white hover:bg-[#30394f]"
                >
                + เพิ่มแนวเกม
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="เลือกแนวเกม"
                onAction={(key) => {
                const k = String(key);
                if (!selectedGenres.includes(k))
                    setSelectedGenres([...selectedGenres, k]);
                }}
            >
                {genres
                .filter((g) => !selectedGenres.includes(g))
                .map((g) => (
                    <DropdownItem key={g}>{g}</DropdownItem>
                ))}
            </DropdownMenu>
            </Dropdown>
        </div>
        </div>

        {/* ⚙️ MODE (แท็บโหมดการเล่นใหม่) */}
        <div className="space-y-4 w-full">
        {/* หัวข้อกลับมาชิดซ้าย */}
        <h3 className="flex items-center gap-2 text-lg font-semibold">
            <LandPlot size={18} className="text-[#c2a438]" />
            โหมดการเล่น
        </h3>

        {/* Tabs อยู่ตรงกลางพอดี */}
        <div className="w-full flex justify-center">
            <Tabs
            aria-label="Mode options"
            selectedKey={mode}
            onSelectionChange={(key) => setMode(String(key))}
            className="w-full max-w-md"
            classNames={{
                tabList:
                "grid grid-cols-3 bg-[#1C2230]/70 backdrop-blur-md rounded-2xl p-1 shadow-inner shadow-[#9B5DE5]/30 border border-[#2a2f40]/70 w-full",
                cursor:
                "rounded-xl bg-gradient-to-r from-[#9B5DE5]/50 via-[#00A8E8]/40 to-transparent transition-all duration-500",
                tab: "text-gray-300 data-[selected=true]:text-white font-semibold transition-colors w-full justify-center",
            }}
            >
            {/* ทั้งคู่ */}
            <Tab
                key="both"
                title={
                <div className="flex items-center justify-center gap-2 py-1">
                    <span>ทั้งคู่</span>
                </div>
                }
                className="rounded-xl data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-[#9B5DE5]/40 data-[selected=true]:to-[#00A8E8]/30"
            />

            {/* Casual */}
            <Tab
                key="casual"
                title={
                <div className="flex items-center justify-center gap-2 py-1">
                    <Gamepad2 size={16} className="text-[#4ADE80]" />
                    <span>Casual</span>
                </div>
                }
                className="rounded-xl data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-[#4ADE80]/30 data-[selected=true]:to-[#1C2230]/50"
            />

            {/* Ranked */}
            <Tab
                key="ranked"
                title={
                <div className="flex items-center justify-center gap-2 py-1">
                    <Trophy size={16} className="text-[#F87171]" />
                    <span>Ranked</span>
                </div>
                }
                className="rounded-xl data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-[#F87171]/40 data-[selected=true]:to-[#1C2230]/50"
            />
            </Tabs>
        </div>
        </div>
        {/* 👥 PLAYER FILTER */}
        <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Users size={18} className="text-[#9B5DE5]" />
            จำนวนผู้เล่นที่ต้องการ
            </h3>
        </div>

        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mt-2"
        >
            <Button
            size="sm"
            onPress={() => setPlayerCount((p) => Math.max(0, p - 1))}
            className="bg-[#252C3D] text-white rounded-full px-3 hover:bg-[#303a4f] transition"
            >
            <Minus size={16} />
            </Button>

            <span className="text-xl font-semibold w-8 text-center text-white select-none">
            {playerCount === 0 ? "All" : playerCount}
            </span>

            <Button
            size="sm"
            onPress={() => setPlayerCount((p) => p + 1)}
            className="bg-[#252C3D] text-white rounded-full px-3 hover:bg-[#303a4f] transition"
            >
            <Plus size={16} />
            </Button>
        </motion.div>
        </div>
    </div>
    );

  return (
    <section
      id="feed-section"
      className="w-full max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8"
    >
      {/* LEFT PANEL */}
      <div className="hidden md:block">{FilterPanel}</div>

      {/* MOBILE FILTER BUTTON */}
      <div className="md:hidden mb-4 flex justify-end">
        <Button
            onPress={() => setIsDrawerOpen(true)}
            className="bg-[#9B5DE5] hover:bg-[#8644cc] text-white font-bold px-5"
            startContent={<Filter size={18} className="text-white" />}>
            Filter
        </Button>
      </div>

      {/* DRAWER FOR MOBILE */}
        <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            placement="bottom"
            size="lg"
            hideCloseButton
            motionProps={{
                variants: {
                enter: { y: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
                exit: { y: 50, opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
                },
            }}
            classNames={{
                base: "backdrop-blur-xl bg-gradient-to-t from-[#0f0b14]/90 via-[#1b1022]/85 to-[#1C2230]/90 border-t border-[#9B5DE5]/20 shadow-[0_-10px_40px_rgba(155,93,229,0.25)]",
                backdrop: "backdrop-blur-2xl bg-[#9B5DE5]/10 transition-opacity duration-300",
            }}
            >
            <DrawerContent>
                <DrawerHeader className="flex justify-between items-center text-white border-b border-[#2a2f40]/60">
                <span className="text-lg font-bold">ตัวกรองโพสต์</span>
                <Button
                    size="sm"
                    onPress={() => setIsDrawerOpen(false)}
                    className="bg-[#252C3D] text-white"
                >
                    ปิด
                </Button>
                </DrawerHeader>

                <DrawerBody className="py-6">{FilterPanel}</DrawerBody>

                <DrawerFooter className="border-t border-[#2a2f40]/60">
                <Button
                    fullWidth
                    color="secondary"
                    className="bg-[#9B5DE5] hover:bg-[#8644cc] text-white font-bold"
                    onPress={() => setIsDrawerOpen(false)}
                >
                    ยืนยันตัวกรอง
                </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

      {/* RIGHT POSTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="
              relative group rounded-2xl p-[1px]
              bg-gradient-to-br from-[#9B5DE5]/40 via-[#00A8E8]/30 to-transparent
              hover:from-[#9B5DE5]/60 hover:via-[#00A8E8]/50
              transition-all duration-500
              shadow-[0_0_25px_rgba(155,93,229,0.15)]
              hover:shadow-[0_0_35px_rgba(0,168,232,0.25)]
            "
          >
            <div
              className="
                bg-[#1C2230] group-hover:bg-[#252C3D]
                rounded-2xl h-full transition-all duration-500 p-6
              "
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                หาทีมเล่นแรงค์ #{i + 1}
              </h3>
              <p className="text-gray-400 text-sm">
                ต้องการเพื่อนอีก 1 คน เล่นได้ทุก role
              </p>
            </div>
          </motion.div>
        ))}
        <div
          ref={loaderRef}
          className="col-span-full flex justify-center items-center text-gray-500 mt-8"
        >
          <Spinner size="sm" color="secondary" />
          <span className="ml-2">กำลังโหลด...</span>
        </div>
      </div>
    </section>
  );
}