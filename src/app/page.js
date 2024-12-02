"use client";
import dynamic from "next/dynamic";

export default dynamic(() => import("@/components/menu/Menu"), { ssr: false });
