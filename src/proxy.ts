import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 network boundary (formerly `middleware`). Refreshes the
 * Supabase session cookie on every request, and gates /admin here rather
 * than relying solely on layout-level `redirect()` calls — Next can render
 * a layout and its page concurrently, so a layout redirect doesn't
 * reliably stop the page's own Server Component from executing (and
 * crashing if it calls Supabase directly). Gating in the proxy runs before
 * any rendering, so it's the reliable place to do this. Customers never
 * sign in — this project only has an Admin interface and a public
 * customer-facing site, so /admin is the only gated area.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdminRoute && user) {
    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!adminRow) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
