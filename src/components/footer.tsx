"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer
      id="contact"
      className="w-full py-16 bg-gradient-to-t from-black via-secondary/30 to-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          className="font-headline text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(255,255,255,0.5)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Let's Work Together
        </motion.h2>
        <motion.p
          className="mt-2 max-w-xl mx-auto text-lg text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        >
          Ready to create something amazing? Whether you have an idea, a
          project, or just want to connect, I'm always open to new
          collaborations and opportunities.
        </motion.p>
        <motion.a
          href="mailto:contact@example.com"
          className="inline-block px-12 py-6 rounded-2xl border-2 border-white text-white font-bold text-2xl shadow-lg bg-transparent hover:bg-white hover:text-black hover:shadow-[0_0_32px_8px_rgba(255,255,255,0.7)] transition-all duration-300 mb-8"
          whileHover={{
            scale: 1.08,
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: "0 0 32px 8px #fff",
          }}
          whileTap={{ scale: 0.97 }}
        >
          Reach Me Out
        </motion.a>
        <motion.div
          className="mt-8 flex justify-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: "#fff" }}
            className="transition-colors"
          >
            <Github className="h-7 w-7 text-muted-foreground hover:text-white" />
          </motion.a>
          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: "#fff" }}
            className="transition-colors"
          >
            <Linkedin className="h-7 w-7 text-muted-foreground hover:text-white" />
          </motion.a>
          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: "#fff" }}
            className="transition-colors"
          >
            <Twitter className="h-7 w-7 text-muted-foreground hover:text-white" />
          </motion.a>
        </motion.div>
        <div className="mt-12 border-t border-border/50 pt-8 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} VisioFolio 3D. All Rights
            Reserved.
          </p>
        </div>
      </div>
      {/* Background Glow Effect */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[200px] rounded-full blur-3xl bg-white/20 z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </footer>
  );
}
