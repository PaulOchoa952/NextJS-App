import { NextResponse } from "next/server";
import {supabase} from "@/lib/supabaseClient";

export async function GET() {
  try {
    // Consultar todos los usuarios desde Supabase
    const { data: users, error } = await supabase.auth.admin.listUsers();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
