"use client";

import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button, Input } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <Modal
          isOpen={open}
          onClose={onClose}
          hideCloseButton
          classNames={{
            base: "bg-[#1C2230] text-white border border-[#2b2f3c]",
            backdrop: "bg-black/50 backdrop-blur-md",
          }}
        >
          <ModalContent>
            <ModalHeader className="flex justify-between items-center text-2xl font-bold">
              เข้าสู่ระบบ
              <Button
                isIconOnly
                variant="light"
                onClick={onClose}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </Button>
            </ModalHeader>

            <ModalBody className="space-y-4">
              <Input
                variant="bordered"
                label="Email"
                placeholder="name@example.com"
                classNames={{
                  input: "text-white",
                  label: "text-gray-400",
                  inputWrapper: "bg-[#2B2F3C]",
                }}
              />
              <Input
                variant="bordered"
                label="Password"
                placeholder="••••••••"
                type="password"
                classNames={{
                  input: "text-white",
                  label: "text-gray-400",
                  inputWrapper: "bg-[#2B2F3C]",
                }}
              />

              <Button
                fullWidth
                color="primary"
                className="bg-[#00A8E8] hover:bg-[#0090c7] font-bold text-white"
              >
                Login
              </Button>

              <Button
                fullWidth
                className="bg-[#9B5DE5] hover:bg-[#8644cc] font-bold text-white"
              >
                Register
              </Button>

              <Button
                fullWidth
                variant="bordered"
                className="border-gray-500 text-gray-300 hover:bg-gray-700"
              >
                <span className="mr-2">🔵</span> Login with Google
              </Button>
            </ModalBody>

            <ModalFooter className="text-gray-400 text-sm justify-center">
              เข้าสู่ระบบเพื่อเริ่มสร้างทีมของคุณ 💪
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
}
