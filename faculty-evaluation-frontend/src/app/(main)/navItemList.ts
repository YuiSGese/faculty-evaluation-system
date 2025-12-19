import {
  IconHome,
  IconUsers,
  IconUserCheck,
  IconClipboardText,
} from "@tabler/icons-react";

const navItemList = [
  {
    label: "ダッシュボード",
    icon: IconHome,
    href: "/dashboard",
  },
  {
    label: "専任教員",
    icon: IconUsers,
    children: [
      { label: "業績評価表", href: "/fulltime/performance" },
      { label: "レーダーチャート", href: "/fulltime/radar" },
      { label: "得点", href: "/fulltime/score" },
      { label: "合計", href: "/fulltime/summary" },
    ],
  },
  {
    label: "非常勤教員",
    icon: IconUserCheck,
    children: [
      { label: "業績評価表", href: "/parttime/performance" },
      { label: "レーダーチャート", href: "/parttime/radar" },
      { label: "得点", href: "/parttime/score" },
      { label: "合計", href: "/parttime/summary" },
    ],
  },
  {
    label: "評価シート",
    icon: IconClipboardText,
    children: [
      { label: "個人業績評価", href: "/evaluation/personal" },
      { label: "教育者行動評価", href: "/evaluation/behavior" },
      { label: "教育研究業績書", href: "/evaluation/research" },
    ],
  },
];

export default navItemList;
