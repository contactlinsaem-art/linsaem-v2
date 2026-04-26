import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getUnreadCount } from "@/lib/db";
import { LayoutDashboard, FileText, Wrench, LogOut, ExternalLink, Globe, MessageCircle, User } from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/abonnement", label: "Mon abonnement", icon: FileText },
  { href: "/dashboard/site", label: "Mon site", icon: Globe },
  { href: "/dashboard/modifications", label: "Modifications", icon: Wrench },
  { href: "/dashboard/profil", label: "Mon profil", icon: User },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  const unreadCount = await getUnreadCount(session.clientId).catch(() => 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-base text-gray-900">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: "var(--gradient)" }}>
              L
            </span>
            LINSAEM
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
              {session.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900 truncate max-w-[140px]">{session.name}</div>
              <div className="text-xs text-gray-400 truncate max-w-[140px]">{session.email}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all group"
            >
              <item.icon size={17} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
              {item.label}
            </Link>
          ))}

          {/* Messages avec badge */}
          <Link
            href="/dashboard/messages"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all group"
          >
            <MessageCircle size={17} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
            Messages
            {unreadCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {unreadCount}
              </span>
            )}
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-1">
          <a
            href="https://www.linsaem.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={17} />
            Voir le site
          </a>
          <form method="POST" action="/api/auth/logout">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all">
              <LogOut size={17} />
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
