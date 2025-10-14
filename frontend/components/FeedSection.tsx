"use client";
import { useState, useEffect, useRef } from "react";
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
  Card,
  CardBody,
  Avatar,
  Spinner,
} from "@heroui/react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const mockGames = [
  { id: 1, name: "Valorant", img: "/games/valorant.webp", posts: 125 },
  { id: 2, name: "League of Legends", img: "/games/lol.webp", posts: 98 },
  { id: 3, name: "Apex Legends", img: "/games/apex.webp", posts: 74 },
  { id: 4, name: "Dota 2", img: "/games/dota2.webp", posts: 63 },
];

const genres = [
    "Pinball",
    "Adventure",
    "Indie",
    "Arcade",
    "Visual Novel",
    "Card & Board Game",
    "MOBA",
    "Point-and-click",
    "Fighting",
    "Shooter",
    "Music",
    "Platform",
    "Puzzle",
    "Racing",
    "Real Time Strategy (RTS)",
    "Role-playing (RPG)",
    "Simulator",
    "Sport",
    "Strategy",
    "Turn-based strategy (TBS)",
    "Tactical",
    "Hack and slash/Beat 'em up",
    "Quiz/Trivia"
];

export default function FeedSection() {
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [mode, setMode] = useState("both");
  const [playerFilterEnabled, setPlayerFilterEnabled] = useState(false);
  const [playerCount, setPlayerCount] = useState(0);
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

  return (
    <section
      id="feed-section"
      className="w-full max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8"
    >
      {/* LEFT FILTER PANEL */}
      <div className="relative">
        <div className="sticky top-24 flex flex-col gap-6">
          {/* 🔍 SEARCH */}
          <div className="bg-[#1C2230] p-5 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">ค้นหาเกม</h3>
            <Input
              placeholder="พิมพ์ชื่อเกม..."
              startContent={<Search size={16} />}
              value={search}
              onValueChange={setSearch}
              classNames={{
                inputWrapper: "bg-[#252C3D] text-white border-none",
                input: "text-white",
              }}
            />
            {/* suggestions */}
            <div className="mt-3 max-h-48 overflow-y-auto">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="flex items-center gap-3 py-2 px-2 hover:bg-[#252C3D] rounded-lg cursor-pointer transition"
                >
                  <Avatar src={game.img} size="sm" />
                  <div className="flex flex-col">
                    <span>{game.name}</span>
                    <span className="text-xs text-gray-400">
                      {game.posts} posts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🎮 GENRE MULTI-DROPDOWN */}
          <div className="bg-[#1C2230] p-5 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">เลือกแนวเกม</h3>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" className="bg-[#252C3D] text-white">
                  {selectedGenres.length > 0
                    ? selectedGenres.join(", ")
                    : "เลือกแนวเกม"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                selectionMode="multiple"
                selectedKeys={new Set(selectedGenres)}
                onSelectionChange={(keys) =>
                  setSelectedGenres(Array.from(keys) as string[])
                }
              >
                {genres.map((g) => (
                  <DropdownItem key={g}>{g}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* ⚙️ MODE */}
          <div className="bg-[#1C2230] p-5 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">โหมดการเล่น</h3>
            <RadioGroup
              color="secondary"
              value={mode}
              onValueChange={setMode}
              orientation="horizontal"
            >
              <Radio value="both">ทั้งคู่</Radio>
              <Radio value="casual">Casual</Radio>
              <Radio value="ranked">Ranked</Radio>
            </RadioGroup>
          </div>

          {/* 👥 PLAYER FILTER */}
          <div className="bg-[#1C2230] p-5 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">จำนวนผู้เล่นที่ต้องการ</h3>
              <Checkbox
                isSelected={playerFilterEnabled}
                onValueChange={setPlayerFilterEnabled}
              >
                เปิดใช้
              </Checkbox>
            </div>

            {playerFilterEnabled && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-4 mt-2"
              >
                <Button
                  size="sm"
                  onPress={() => setPlayerCount((p) => Math.max(0, p - 1))}
                  className="bg-[#252C3D] text-white rounded-full px-3"
                >
                  -
                </Button>
                <span className="text-xl font-semibold w-8 text-center">
                  {playerCount === 0 ? "All" : playerCount}
                </span>
                <Button
                  size="sm"
                  onPress={() => setPlayerCount((p) => p + 1)}
                  className="bg-[#252C3D] text-white rounded-full px-3"
                >
                  +
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT POSTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((i) => (
          <Card key={i} className="bg-[#1C2230] hover:bg-[#252C3D] transition">
            <CardBody>
              <h3 className="text-xl font-semibold mb-2 text-white">
                หาทีมเล่นแรงค์ #{i + 1}
              </h3>
              <p className="text-gray-400 text-sm">
                ต้องการเพื่อนอีก 1 คน เล่นได้ทุก role
              </p>
            </CardBody>
          </Card>
        ))}
        <div
          ref={loaderRef}
          className="col-span-full flex justify-center items-center text-gray-500 mt-4"
        >
          <Spinner size="sm" color="secondary" />
          <span className="ml-2">กำลังโหลด...</span>
        </div>
      </div>
    </section>
  );
}
