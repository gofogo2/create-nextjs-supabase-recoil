"use client";
import { RecoilRoot } from "recoil";

export default function RecoilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
