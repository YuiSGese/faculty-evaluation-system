// //src/app/(main)/dashboard/page.tsx
// "use client";

// import React from "react";
// import Link from "next/link";

// // Stat Card Component
// function StatCard({
//   title,
//   value,
//   subtitle,
//   color = "primary",
// }: {
//   title: string;
//   value: string | number;
//   subtitle?: string;
//   color?: "primary" | "success" | "warning" | "error";
// }) {
//   const colors = {
//     primary: "bg-primary",
//     success: "bg-success",
//     warning: "bg-warning",
//     error: "bg-error",
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6 border border-primary-light/20">
//       <div className="flex items-center gap-4">
//         <div
//           className={`w-12 h-12 ${colors[color]} rounded-lg flex items-center justify-center`}
//         >
//           <span className="text-white text-xl font-bold">
//             {String(value).charAt(0)}
//           </span>
//         </div>
//         <div>
//           <p className="text-sm text-text-muted">{title}</p>
//           <p className="text-2xl font-bold text-text-primary">{value}</p>
//           {subtitle && <p className="text-xs text-text-muted">{subtitle}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Quick Link Card
// function QuickLinkCard({
//   title,
//   description,
//   href,
//   icon,
// }: {
//   title: string;
//   description: string;
//   href: string;
//   icon: React.ReactNode;
// }) {
//   return (
//     <Link href={href} className="block">
//       <div className="bg-white rounded-xl shadow-sm p-6 border border-primary-light/20 hover:border-primary-light hover:shadow-md transition-all">
//         <div className="flex items-start gap-4">
//           <div className="w-10 h-10 bg-primary-lightest rounded-lg flex items-center justify-center text-primary">
//             {icon}
//           </div>
//           <div>
//             <h3 className="font-semibold text-text-primary">{title}</h3>
//             <p className="text-sm text-text-secondary mt-1">{description}</p>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default function DashboardPage() {
//   return (
//     <div className="space-y-6">
//       {/* Page Title */}
//       <div>
//         <h1 className="text-2xl font-bold text-text-primary">ダッシュボード</h1>
//         <p className="text-text-secondary mt-1">
//           教員業績評価システムへようこそ
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard
//           title="専任教員"
//           value={48}
//           subtitle="評価対象"
//           color="primary"
//         />
//         <StatCard
//           title="非常勤教員"
//           value={124}
//           subtitle="評価対象"
//           color="success"
//         />
//         <StatCard
//           title="評価完了"
//           value="67%"
//           subtitle="進捗状況"
//           color="warning"
//         />
//         <StatCard title="未提出" value={12} subtitle="要確認" color="error" />
//       </div>

//       {/* Quick Links */}
//       <div>
//         <h2 className="text-lg font-semibold text-text-primary mb-4">
//           クイックアクセス
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <QuickLinkCard
//             title="専任教員 業績評価表"
//             description="専任教員の業績を入力・確認"
//             href="/fulltime/performance"
//             icon={
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//             }
//           />
//           <QuickLinkCard
//             title="専任教員 レーダーチャート"
//             description="専任教員の評価をグラフで確認"
//             href="/fulltime/radar"
//             icon={
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
//                 />
//               </svg>
//             }
//           />
//           <QuickLinkCard
//             title="非常勤教員 業績評価表"
//             description="非常勤教員の業績を入力・確認"
//             href="/parttime/performance"
//             icon={
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//             }
//           />
//           <QuickLinkCard
//             title="非常勤教員 レーダーチャート"
//             description="非常勤教員の評価をグラフで確認"
//             href="/parttime/radar"
//             icon={
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
//                 />
//               </svg>
//             }
//           />
//           <QuickLinkCard
//             title="個人業績評価シート"
//             description="個人の業績評価を入力"
//             href="/evaluation/personal"
//             icon={
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                 />
//               </svg>
//             }
//           />
//           <QuickLinkCard
//             title="教育者行動評価シート"
//             description="教育活動の行動評価を入力"
//             href="/evaluation/behavior"
//             icon={
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
//                 />
//               </svg>
//             }
//           />
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div>
//         <h2 className="text-lg font-semibold text-text-primary mb-4">
//           最近のアクティビティ
//         </h2>
//         <div className="bg-white rounded-xl shadow-sm border border-primary-light/20">
//           <div className="divide-y divide-primary-light/20">
//             {[
//               {
//                 action: "業績評価を提出しました",
//                 user: "山田 太郎",
//                 time: "5分前",
//               },
//               {
//                 action: "レーダーチャートを確認しました",
//                 user: "佐藤 花子",
//                 time: "15分前",
//               },
//               {
//                 action: "評価シートを更新しました",
//                 user: "鈴木 一郎",
//                 time: "1時間前",
//               },
//               {
//                 action: "新しい教員が登録されました",
//                 user: "システム",
//                 time: "2時間前",
//               },
//             ].map((activity, index) => (
//               <div
//                 key={index}
//                 className="p-4 flex items-center justify-between"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-background-subtle rounded-full flex items-center justify-center">
//                     <span className="text-text-secondary text-sm">
//                       {activity.user.charAt(0)}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-sm text-text-primary">
//                       {activity.action}
//                     </p>
//                     <p className="text-xs text-text-muted">{activity.user}</p>
//                   </div>
//                 </div>
//                 <span className="text-xs text-text-muted">{activity.time}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/app/(main)/dashboard/page.tsx
"use client";

import React from "react";

export default function DashboardPage() {
  // Trả về null để không render gì cả (trang trắng hoàn toàn)
  // Hoặc dùng <div className="min-h-screen bg-white" /> nếu muốn chắc chắn nền trắng
  return null;
}
