import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // If not authenticated on non-login pages, redirect
    // (middleware handles this, but double-check)

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{
                width: '250px',
                background: '#1a1a1a',
                color: 'white',
                padding: '2rem 1rem',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>
                    Admin Panel
                </h2>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <Link href="/admin" style={navLinkStyle}>
                        📊 Dashboard
                    </Link>
                    <Link href="/admin/projects" style={navLinkStyle}>
                        📁 Projects
                    </Link>
                    <Link href="/admin/skills" style={navLinkStyle}>
                        🛠️ Skills
                    </Link>
                    <Link href="/admin/experience" style={navLinkStyle}>
                        💼 Experience
                    </Link>
                    <Link href="/admin/about" style={navLinkStyle}>
                        👤 About
                    </Link>
                </nav>

                {session?.user && (
                    <div style={{ borderTop: '1px solid #333', paddingTop: '1rem', marginTop: 'auto' }}>
                        <p style={{ fontSize: '0.875rem', color: '#999' }}>
                            Signed in as
                        </p>
                        <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                            {session.user.email}
                        </p>
                        <form action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/" });
                        }}>
                            <button
                                type="submit"
                                style={{
                                    marginTop: '1rem',
                                    padding: '0.5rem 1rem',
                                    background: '#333',
                                    border: 'none',
                                    borderRadius: '6px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    width: '100%',
                                }}
                            >
                                Sign Out
                            </button>
                        </form>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', background: '#f5f5f5' }}>
                {children}
            </main>
        </div>
    );
}

const navLinkStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    color: 'white',
    textDecoration: 'none',
    transition: 'background 0.2s',
};
