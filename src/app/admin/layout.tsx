import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { Users, MessageSquare, Globe } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.email !== process.env.ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  const navItems = [
    { href: "/admin/clients", label: "Clients", icon: Users },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
    { href: "/admin/sites", label: "Sites", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col py-8 px-4 fixed h-full">
        <div className="mb-8 px-2">
          <span className="text-lg font-black bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
            LINSAEM
          </span>
          <div className="text-xs text-gray-400 mt-0.5">Administration</div>
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-gray-100">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Espace client
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1 p-8">{children}</main>
    </div>
  );
}
