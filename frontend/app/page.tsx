'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type Guest = { id: number; first_name: string; last_name: string; message: string };

export default function Home() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [form, setForm] = useState({ first_name:"", last_name:"", phone_number:"", message:"" });

  useEffect(() => { fetchGuests(); }, []);

  async function fetchGuests() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/guests`);
    setGuests(await res.json());
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/guests`, {
      method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(form)
    });
    setForm({ first_name:"", last_name:"", phone_number:"", message:"" });
    fetchGuests();
  }

  return (
    <main className="flex flex-col items-center gap-8 p-6">
      {/* background image via CSS – keeps markup clean */}
      <Card className="w-full max-w-xl relative bg-cover bg-center" style={{backgroundImage:`url('/hero.jpg')`}}>
        <CardContent className="backdrop-blur-sm bg-white/70 p-8">
          <form onSubmit={submit} className="grid gap-4">
            <Input placeholder="First name"  value={form.first_name}  onChange={e=>setForm({...form,first_name:e.target.value})}/>
            <Input placeholder="Last name"   value={form.last_name}   onChange={e=>setForm({...form,last_name:e.target.value})}/>
            <Input placeholder="Phone number (optional)" value={form.phone_number} onChange={e=>setForm({...form,phone_number:e.target.value})}/>
            <Input placeholder="Message"     value={form.message}    onChange={e=>setForm({...form,message:e.target.value})}/>
            <Button type="submit">Check In</Button>
          </form>
        </CardContent>
      </Card>

      <table className="min-w-[80%] border-collapse">
        <thead><tr><th>Name</th><th>Message</th></tr></thead>
        <tbody>
          {guests.map(g=>(
            <tr key={g.id} className="border-t">
              <td>{g.first_name} {g.last_name}</td>
              <td>{g.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
