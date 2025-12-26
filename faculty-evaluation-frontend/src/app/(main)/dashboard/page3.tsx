//src/app/(main)/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import { FacultyListTable } from "@/components/admin/FacultyListTable";
import {
  MOCK_FACULTY_LIST,
  getCompletedFaculty,
  getPendingFaculty,
} from "@/data/facultyList-mock-data";

type TabType = "fulltime" | "parttime" | "completed" | "pending";

// Stat Card Component
function StatCard({
  title,
  value,
  subtitle,
  color = "primary",
  active = false,
  onClick,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: "primary" | "success" | "warning" | "error";
  active?: boolean;
  onClick?: () => void;
}) {
  const colors = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
  };

  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm p-6 border-2 transition-all hover:shadow-md ${
        active ? "border-primary scale-105" : "border-primary-light/20"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 ${colors[color]} rounded-lg flex items-center justify-center`}
        >
          <span className="text-white text-xl font-bold">
            {String(value).charAt(0)}
          </span>
        </div>
        <div className="text-left">
          <p className="text-sm text-text-muted">{title}</p>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
          {subtitle && <p className="text-xs text-text-muted">{subtitle}</p>}
        </div>
      </div>
    </button>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("fulltime");

  const completedList = getCompletedFaculty();
  const pendingList = getPendingFaculty();

  const stats = {
    fulltime: MOCK_FACULTY_LIST.fulltime.length,
    parttime: MOCK_FACULTY_LIST.parttime.length,
    completedPercent: Math.round(
      (completedList.length /
        (MOCK_FACULTY_LIST.fulltime.length +
          MOCK_FACULTY_LIST.parttime.length)) *
        100
    ),
    pending: pendingList.length,
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">ダッシュボード</h1>
        <p className="text-text-secondary mt-1">
          教員業績評価システムへようこそ
        </p>
      </div>

      {/* Stats - Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="専任教員"
          value={stats.fulltime}
          subtitle="評価対象"
          color="primary"
          active={activeTab === "fulltime"}
          onClick={() => setActiveTab("fulltime")}
        />
        <StatCard
          title="非常勤教員"
          value={stats.parttime}
          subtitle="評価対象"
          color="success"
          active={activeTab === "parttime"}
          onClick={() => setActiveTab("parttime")}
        />
        <StatCard
          title="評価完了"
          value={`${stats.completedPercent}%`}
          subtitle="進捗状況"
          color="warning"
          active={activeTab === "completed"}
          onClick={() => setActiveTab("completed")}
        />
        <StatCard
          title="未提出"
          value={stats.pending}
          subtitle="要確認"
          color="error"
          active={activeTab === "pending"}
          onClick={() => setActiveTab("pending")}
        />
      </div>

      {/* Content Area - Dynamic based on active tab */}
      <div className="mt-8">
        {activeTab === "fulltime" && (
          <FacultyListTable
            data={MOCK_FACULTY_LIST.fulltime}
            title="専任教員一覧"
          />
        )}

        {activeTab === "parttime" && (
          <FacultyListTable
            data={MOCK_FACULTY_LIST.parttime}
            title="非常勤教員一覧"
          />
        )}

        {activeTab === "completed" && (
          <FacultyListTable
            data={completedList}
            title="評価完了一覧"
            showAiScore={true}
          />
        )}

        {activeTab === "pending" && (
          <FacultyListTable data={pendingList} title="未提出者一覧" />
        )}
      </div>
    </div>
  );
}
